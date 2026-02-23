// Node v10.15.3
// import express from "express";
// const app = express();
import axios from "axios";
import CryptoJS from "crypto-js";
import moment from "moment";
import qs from "qs";
import constant from "./constant.js";

// app.use(express.json());
// app.use(express.urlencoded({extended: true}));
// APP INFO

export const payment = async (req, res) => {
    // const updatePromotion = {
    //     id: req.body.id,
    //     product_id: req.body.product_id,
    //     discount: req.body.discount,
    //     note: req.body.note,
    //     start_day: req.body.start_day,
    //     end_day: req.body.end_day,
    //   };
    console.log(req.body);
    
    const config = {
        app_id: "2553",
        key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
        key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
        endpoint: "https://sb-openapi.zalopay.vn/v2/create"
    };
    const invoice = req.body.invoice;//đơn hàng

        const embed_data = {
            redirecturl: "http://localhost:5173/cart",
            invoice: JSON.stringify(invoice),
        };
    
        const items = req.body.invDetail;//đơn hàng

        const transID = Math.floor(Math.random() * 1000000);
        const order = {
            app_id: config.app_id,
            app_trans_id: `${moment().format('YYMMDD')}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
            app_user: req.body.invoice.user_id,
            app_time: Date.now(), // miliseconds
            item: JSON.stringify(items),
            embed_data: JSON.stringify(embed_data),
            amount: req.body.invoice.total_money,
            description: `Payment for the order #${transID}`,
            bank_code: "",
            callback_url:"https://10bf-103-23-156-30.ngrok-free.app/api/callback",
            // invoice: JSON.stringify(invoice),
            phone: req.body.invoice.phone,
            address: req.body.invoice.address,
        };
        
        // appid|app_trans_id|appuser|amount|apptime|embeddata|item
        const data = config.app_id + "|" + order.app_trans_id + "|" + order.app_user + "|" + order.amount + "|" + order.app_time + "|" + order.embed_data + "|" + order.item;
        order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();
        try {
            const result = await axios.post(config.endpoint, null, { params: order });
            // .then(res => {
            //     console.log(res.data);
            // })
            // .catch(err => console.log(err));
            console.log(result.data)
            return res.status(200).json(result.data);
        } catch (error) {
            console.log(error.message)
            return;
        }
  
    // return update(
    //   req,
    //   res,
    //   constant.tableNameBD.INVOICEDETAILS,
    //   updateInvoiceDetail,
    //   // updateColumns
    // );
}
export const callback = async(req, res) => {
    let result = {};
    console.log(req.body);
    const config = {
        app_id: "2553",
        key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
        key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
        endpoint: "https://sb-openapi.zalopay.vn/v2/create"
    };
    try {
      let dataStr = req.body.data;
      let reqMac = req.body.mac;
  
      let mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();
      console.log("mac =", mac);
  
  
      // kiểm tra callback hợp lệ (đến từ ZaloPay server)
      if (reqMac !== mac) {
        // callback không hợp lệ
        result.return_code = -1;
        result.return_message = "mac not equal";
      }
      else {
        // thanh toán thành công
        // merchant cập nhật trạng thái cho đơn hàng
        let dataJson = JSON.parse(dataStr, config.key2);
        console.log("update order's status = success where app_trans_id =", dataJson["app_trans_id"]);
        
        result.return_code = 1;
        result.return_message = "success";
        let item = dataJson["item"];
        let invoices = dataJson["embed_data"];
        item= JSON.parse(item);
        let invoice = JSON.parse(invoices);
        invoice = JSON.parse(invoice.invoice);

        await axios.post('http://localhost:8080/api/invoice/create',invoice).then(async res => {
            if (res.status === constant.code.OK) {
                console.log("aaaa");
                let invoices_id=res.data.newDataId;
                for (let i = 0; i < item.length; i++) {
                  console.log(item[i]);
                  await axios.post(`http://localhost:8080/api/product?id=${item[i].product_id}`).then(
                    async res => {
                      if (res.status === constant.code.OK) {
                        let data = res.data.data[0];
                        data.quantity = parseInt(data.quantity);
                        item[i].quantity = parseInt(item[i].quantity);
                        
                        data.quantity =data.quantity - item[i].quantity;
                        data.quantity = parseInt(data.quantity);
                        await axios.post('http://localhost:8080/api/product/update',data).then(res => {
                          
                        });
                        let invoiceDetail={
                          id: "",
                          invoice_id: invoices_id,
                          product_id: item[i].product_id,
                          price:data.price,
                          price_sale: 0,
                          promotion_id: 0,
                          discount: 0,
                          quantity: item[i].quantity,
                          money: 0,
                        }
                        if (!data.promotion_id){invoiceDetail.promotion_id = 0}else
                        { invoiceDetail.promotion_id = data.promotion_id;
                          invoiceDetail.discount = data.discount;
                        }
                        invoiceDetail.price_sale=(data.price- (data.price * data.discount) / 100);
                        invoiceDetail.money = invoiceDetail.price_sale*invoiceDetail.quantity

                        await axios.post('http://localhost:8080/api/invoice-detail/create',invoiceDetail).then(
                          async res => {
                            
                          }
                        );
                        await axios.post(`http://localhost:8080/api/cart/delete?id=${item[i].id}`).then(res => {
                        //   setLoading(false);
                        //   if (res.status === setting.STATUS_CODE.OK) {
                        //     success("Đặt hàng thành công");
                        //     // const user = JSON.parse(localStorage.getItem("user"));
                        //     getALLCart(user.id);
                        //   } else {
                        //     error(res.data.msg);
                        //   }
                        });
                      }
                      }
                  );
                }
            } else {
                console.log("bbb");

            }
          });
        // console.log(item);
        // console.log(JSON.parse(invoices).invoice);



      }
    } catch (ex) {
      result.return_code = 0; // ZaloPay server sẽ callback lại (tối đa 3 lần)
      result.return_message = ex.message;
    }
    console.log(result);
    
    return res.json(result);

    // thông báo kết quả cho ZaloPay server
    // res.json(result);
};

// app.post("/order-status/:app_trans_id", async(req, res)=>{
//     const app_trans_id = req.params.app_trans_id;
//     let postData = {
//         app_id: config.app_id,
//         app_trans_id: app_trans_id, // Input your app_trans_id
//     }
    
//     let data = postData.app_id + "|" + postData.app_trans_id + "|" + config.key1; // appid|app_trans_id|key1
//     postData.mac = CryptoJS.HmacSHA256(data, config.key1).toString();
    
    
//     let postConfig = {
//         method: 'post',
//         url: "https://sb-openapi.zalopay.vn/v2/query",
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded'
//         },
//         data: qs.stringify(postData)
//     };
//     try {
//         const result = await axios(postConfig);
//         console.log(result.data)
//         return res.status(200).json(result.data);
//     } catch (error) {
//         console.log(error.message);
        
//     }
       
// })

// app.listen(5000, ()=>{
//     console.log("server run 5000");
    
// })

