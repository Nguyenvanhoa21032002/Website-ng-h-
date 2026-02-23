import constant from "./constant.js";
import { getAll, getByID, create, update, deleteByID,deleteByUserID,deleteByProductID, signUpEmail,forgotEmail, updatePassword } from "./core.js";

// User
export const getAllUser = (req,res) => {
  const queryCondition = "SELECT * FROM users";
  let querySearch = "";
  if (Object.keys(req.query).length !== 0) {
    querySearch += " WHERE ";
    if (req.query.code) {
      querySearch += `users.role_id LIKE '${req.query.role_id}'`;
    }
  }
  return getAll(res, constant.tableNameBD.USERS, queryCondition, querySearch);
};
export const getUserByEmail = (req,res) => {
  const queryCondition = `SELECT * FROM users where users.email = '${req.query.email}'`;
  let querySearch = "";
  return getAll(res, constant.tableNameBD.USERS, queryCondition, querySearch);
};
export const getUserByID = (req, res) => {
  const queryCondition = 
   "SELECT * FROM users" +
    ` WHERE users.id = ${req.query.id}`;;
  return getByID(req, res, constant.tableNameBD.USERS, queryCondition);
};
export const createUser= (req, res) => {
  const newUser = {
    avatar: req.body.avatar,
    full_name: req.body.full_name,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    address: req.body.address,
    role_id: req.body.role_id,
    date_created: new Date(),
    // role_id: req.body.roleID.join(",")
  };

  // console.log(newRole);

  return create(req, res, constant.tableNameBD.USERS, newUser);
};

export const updateUserByID = (req, res) => {
  const updateUser = {
    id : req.body.id,
    avatar: req.body.avatar,
    full_name: req.body.full_name,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    address: req.body.address,
    role_id: req.body.role_id,
    // full_name: req.body.ten,
    // email: req.body.email,
    // phone: req.body.sdt,
    // password: req.body.password,
    // role_id: req.body.roleID.join(",")
  };

  return update(req, res, constant.tableNameBD.USERS, updateUser);
};

export const deleteUserByID = (req, res) => {
  return deleteByID(req, res, constant.tableNameBD.USERS);
};
// Role
export const getAllRole = (req, res) => {
  const queryCondition = "select * from roles";
  let querySearch = "";
  return getAll(res, constant.tableNameBD.ROLES, queryCondition, querySearch );
};

export const getByRoleID = (req, res) => {
  let queryCondition = "";
  return getByID(req, res, constant.tableNameBD.ROLES, queryCondition);
};

export const createRole= (req, res) => {
  const newRole = {
    code: req.body.code 
  };

  return create(req, res, constant.tableNameBD.ROLES, newRole);
};

export const updateRoleByID = (req, res) => {
  const updateRole = {
    id : req.body.id,
    code: req.body.code,
  };
  
  return update(req, res, constant.tableNameBD.ROLES, updateRole);
};
export const deleteRoleByID = (req, res) => {
  return deleteByID(req, res, constant.tableNameBD.ROLES);
};

// LOGIN
export const Login = (req, res) => {
  const queryCondition = `SELECT * FROM ${constant.tableNameBD.USERS} as us where us.email = '${req.body.email}' and us.password = '${req.body.password}'`;
  let querySearch = "";
  return getAll(
    res,
    constant.tableNameBD.USERS,
    queryCondition,
    querySearch
  );
};

export const getAllLogin = (req, res) => {
  const queryCondition =
    "SELECT us.id, us.hoten, us.email, us.sdt, us.matKhau, us.roleID, us.ngayTao, us.ngaySua, " +
    " rl.code as tenQuyen" +
    " FROM users as us" +
    " INNER JOIN roles as rl ON rl.id = us.roleID";
  let querySearch = "";

  if (req.query.email) {
    querySearch += "us.email like" + `'${req.query.email}'`;
  }
  return getAll(
    res,
    constant.tableNameBD.USERS,
    queryCondition,
    querySearch
  );
};
export const createLogin = (req, res) => {
  const newUser = {
    hoten: req.body.username,
    email: req.body.email,
    sdt: "",
    matKhau: req.body.password,
    roleID: 1
  };
  return signUpEmail(req, res, newUser);
};
export const checkEmail = (req, res)=>{
  const checkEmail= {
    id: req.body.id,
    email: req.body.email,
    hoten:"",
    matKhau: "",
    roleID:1
  };

  return forgotEmail(req,res,checkEmail);
}

export const fogotPassword = (req, res) => {

  const updateLogin = {
    email: req.body.email,
    matKhau: req.body.matKhau,
    roleID:1
  };
  return updatePassword(req, res, updateLogin);
};

export const getProfile = (req, res) => {
  const queryCondition = `SELECT us.id, us.hoten, us.email, us.matKhau, us.sdt, us.roleID FROM ${constant.tableNameBD.USERS} as us`;
  return getByID(req, res, constant.tableNameBD.USERS, queryCondition);
};
export const getProfileByID = (req, res) => {
  const queryCondition = "SELECT *" +
  " FROM users as us " +
  // " INNER JOIN roles as rl ON rl.id = us.roleID" +
   ` WHERE us.id = ${req.query.id}`;
  return getByID(req, res, constant.tableNameBD.USERS, queryCondition); 
};

export const updateProfileByID = (req, res) => {
  const updateProfile = {
    id : req.body.id,
    avatar: req.body.avatar,
    full_name: req.body.full_name,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    address: req.body.address,
    role_id: req.body.role_id,
  };
  
  return update(req, res, constant.tableNameBD.USERS, updateProfile);
};

// CommentReview
export const getAllComment = (req, res) => {
  const queryCondition =
    "SELECT cm.*, pd.name as product_name, us.avatar, us.full_name as user_name" +
    " FROM comments as cm" +
    " INNER JOIN users as us ON us.id = cm.user_id" +
    " INNER JOIN products as pd ON pd.id = cm.product_id";

  let querySearch = "";

    if (Object.keys(req.query).length !== 0) {
      querySearch += " WHERE ";

    if (req.query.tenSanPham) {
      querySearch += "pd.ten like " + `'${req.query.tenSanPham}'`;
    }

    if (req.query.price) {
      querySearch += "us.hoten like " + `'${req.query.hoten}'`;
    }
  }

  return getAll(
    res,
    constant.tableNameBD.COMMENTS,
    queryCondition,
    querySearch
  );
};

export const getCommentByProductID = (req, res) => {
  const queryCondition = "SELECT cm.*, pd.name as product_name, us.avatar, us.full_name as user_name" +
    " FROM comments as cm" +
    " INNER JOIN users as us ON us.id = cm.user_id" +
    " INNER JOIN products as pd ON pd.id = cm.product_id"+
    ` WHERE cm.product_id = ${req.query.id}`;

  return getByID(req, res, constant.tableNameBD.COMMENTS, queryCondition);
};
export const getCommentByUserID = (req, res) => {
  const queryCondition = "SELECT cm.*, pd.name as product_name, us.avatar, us.full_name as user_name" +
    " FROM comments as cm" +
    " INNER JOIN users as us ON us.id = cm.user_id" +
    " INNER JOIN products as pd ON pd.id = cm.product_id"+
    ` WHERE cm.user_id = ${req.query.id}`;

  return getByID(req, res, constant.tableNameBD.COMMENTS, queryCondition);
};
export const deleteCommentByID = (req, res) => {
  return deleteByID(req, res, constant.tableNameBD.COMMENTS);
};
export const deleteCommentByProductID = (req, res) => {
  return deleteByProductID(req, res, constant.tableNameBD.COMMENTS);
};
export const createComment = (req, res) => {
  const newComment = {
    user_id: req.body.user_id,
    product_id: req.body.product_id,
    content: req.body.content,
    rate: req.body.rate,
    date_created: new Date(),
    // trangThai: constant.commentStatus.PENDING,
  };

  return create(req, res, constant.tableNameBD.COMMENTS, newComment);
};

export const updateCommentByID = (req, res) => {
  const updateComment = {
    id: req.body.id,
    user_id: req.body.user_id,
    product_id: req.body.product_id,
    content: req.body.content,
    rate: req.body.rate,
  };
  return update(req, res, constant.tableNameBD.COMMENTS, updateComment);
};

// Brand
export const getAllBrand = (req, res) => {
  const queryCondition = "select * from brands";
  let querySearch = "";

  return getAll(
    res,
    constant.tableNameBD.BRANDS,
    queryCondition,
    querySearch
  );
};

export const getBrandByID = (req, res) => {
  const queryCondition = "";
  return getByID(req, res, constant.tableNameBD.BRANDS, queryCondition);
};

export const deleteBrandByID = (req, res) => {
  return deleteByID(req, res, constant.tableNameBD.BRANDS);
};

export const createBrand = (req, res) => {
  const newBrand = {
    name: req.body.name,
    image: req.body.image,
    descript: req.body.descript,
    date_created: new Date(),
    };

  return create(req, res, constant.tableNameBD.BRANDS, newBrand);
};

export const updateBrandByID = (req, res) => {
  const updateBrand = {
    id: req.body.id,
    name: req.body.name,
    image: req.body.image,
    descript: req.body.descript,
  };
  return update(req, res, constant.tableNameBD.BRANDS, updateBrand);
};

// Product
export const getAllProduct = (req, res) => {
  const queryCondition =
    "SELECT pd.*, br.name as brand_name,pt.id as promotion_id, pt.discount, pt.start_day, pt.end_day" +
    " FROM products as pd" +
    " INNER JOIN brands as br ON br.id = pd.brand_id"
     + " LEFT JOIN (SELECT * from promotions where promotions.start_day <= CURDATE() and CURDATE() <= promotions.end_day) as pt ON pt.product_id = pd.id ";
  let querySearch = "";
  // if (req.body && req.body.producer && req.body.producer.length > 0) {
  //   querySearch += ` AND sp.ten IN (${req.body.producer
  //     .map((producer) => `'${producer}'`)
  //     .join(", ")})`;
  // }

  // if (req.body && req.body.price && req.body.price.length > 0) {
  //   let priceConditions = req.body.price
  //     .map((key) => {
  //       switch (key) {
  //         case "<2":
  //           return `(CAST(REPLACE(pd.donGia, ',', '') AS DECIMAL(10, 2)) < 2000000)`;
  //         case "2-4":
  //           return `(CAST(REPLACE(pd.donGia, ',', '') AS DECIMAL(10, 2)) BETWEEN 2000000 AND 4000000)`;
  //         case "4-7":
  //           return `(CAST(REPLACE(pd.donGia, ',', '') AS DECIMAL(10, 2)) BETWEEN 4000000 AND 7000000)`;
  //         case ">7":
  //           return `(CAST(REPLACE(pd.donGia, ',', '') AS DECIMAL(10, 2)) > 7000000)`;
  //         default:
  //           return "";
  //       }
  //     })
  //     .join(" OR ");

  //   if (priceConditions) {
  //     querySearch += ` AND ${priceConditions}`;
  //   }
  // }

  return getAll(
    res,
    constant.tableNameBD.PRODUCTS,
    queryCondition,
    querySearch
  );
};

export const createProduct = (req, res) => {

  console.log(req.body);
  
  const newProduct = {
    name: req.body.name,
    image: req.body.image,
    brand_id: req.body.brand_id,
    gender: req.body.gender,
    warranty: req.body.warranty,
    albert: req.body.albert,
    glass: req.body.glass,
    color: req.body.color,
    price: req.body.price,
    quantity: req.body.quantity,
    descript: req.body.descript,
    status: req.body.status,
    date_created: new Date(),
  };

  return create(req, res, constant.tableNameBD.PRODUCTS, newProduct);
};

export const getProductByID = (req, res) => {
  const queryCondition = 
   
   "SELECT pd.*, br.name as brand_name,pt.id as promotion_id, pt.discount, pt.start_day, pt.end_day" +
   " FROM products as pd" +
   " INNER JOIN brands as br ON br.id = pd.brand_id"
   + " LEFT JOIN (SELECT * from promotions where promotions.start_day <= CURDATE() and CURDATE() <= promotions.end_day) as pt ON pt.product_id = pd.id "+
    ` WHERE pd.id = ${req.query.id}`;;
  return getByID(req, res, constant.tableNameBD.PRODUCTS, queryCondition);
};
export const getProductByName = (req, res) => {
  const queryCondition = 
   "SELECT pd.*, br.name as brand_name,pt.id as promotion_id, pt.discount, pt.start_day, pt.end_day" +
   " FROM products as pd" +
   " INNER JOIN brands as br ON br.id = pd.brand_id"
   + " LEFT JOIN (SELECT * from promotions where promotions.start_day <= CURDATE() and CURDATE() <= promotions.end_day) as pt ON pt.product_id = pd.id "+
    ` WHERE pd.name LIKE '%${req.query.id}%'`;;
  return getByID(req, res, constant.tableNameBD.PRODUCTS, queryCondition);
};
export const getProductByBrandID = (req, res) => {
  const queryCondition = 
   "SELECT pd.*, br.name as brand_name,pt.id as promotion_id, pt.discount, pt.start_day, pt.end_day" +
   " FROM products as pd" +
   " INNER JOIN brands as br ON br.id = pd.brand_id"
   + " LEFT JOIN (SELECT * from promotions where promotions.start_day <= CURDATE() and CURDATE() <= promotions.end_day) as pt ON pt.product_id = pd.id "+
    ` WHERE pd.brand_id = ${req.query.id}`;;
  return getByID(req, res, constant.tableNameBD.PRODUCTS, queryCondition);
};
export const updateProductByID = (req, res) => {
  const updateProduct = {
    id: req.body.id,
    name: req.body.name,
    image: req.body.image,
    brand_id: req.body.brand_id,
    gender: req.body.gender,
    warranty: req.body.warranty,
    albert: req.body.albert,
    glass: req.body.glass,
    color: req.body.color,
    price: req.body.price,
    quantity: req.body.quantity,
    descript: req.body.descript,
    status: req.body.status,
  };
  return update(req, res, constant.tableNameBD.PRODUCTS, updateProduct);
};

export const deleteProductByID = (req, res) => {
  return deleteByID(req, res, constant.tableNameBD.PRODUCTS);
};

// //Promotions
// export const getAllPromotions = (req, res) => {
//   const queryCondition = "";
//   let querySearch = "";

//   return getAll(
//     res,
//     constant.tableNameBD.PROMOTIONS,
//     queryCondition,
//     querySearch
//   );
// };
// Promotion
export const getAllPromotion = (req, res) => {
  const queryCondition =
    "SELECT pm.*, pd.name as product_name FROM promotions as pm"
    +
    " INNER JOIN products as pd ON pd.id = pm.product_id";

  let querySearch = "";

  // if (Object.keys(req.query).length !== 0) {
  //   querySearch += " WHERE ";

  //   // if (req.query.tenSanPham) {
  //   //   querySearch += "pd.ten like " + `'${req.query.tenSanPham}'`;
  //   // }
  // }

  return getAll(
    res,
    constant.tableNameBD.PROMOTIONS,
    queryCondition,
    querySearch
  );
};

export const getPromotionByID = (req, res) => {
  const queryCondition = "";
  return getByID(req, res, constant.tableNameBD.PROMOTIONS, queryCondition);
};

export const deletePromotionByID = (req, res) => {
  // const deleteColumns = {
  //   id: req.query.id,
  // };
  return deleteByID(req, res, constant.tableNameBD.PROMOTIONS);
};
export const deletePromotionByProductID = (req, res) => {
  // const deleteColumns = {
  //   id: req.query.id,
  // };
  return deleteByProductID(req, res, constant.tableNameBD.PROMOTIONS);
};
export const createPromotion = (req, res) => {
  const newPromotion = {
    product_id: req.body.product_id,
    discount: req.body.discount,
    note: req.body.note,
    start_day: req.body.start_day,
    end_day: req.body.end_day,
    date_created: new Date(),
  };

  return create(req, res, constant.tableNameBD.PROMOTIONS, newPromotion);
};

export const updatePromotionByID = (req, res) => {
  const updatePromotion = {
    id: req.body.id,
    product_id: req.body.product_id,
    discount: req.body.discount,
    note: req.body.note,
    start_day: req.body.start_day,
    end_day: req.body.end_day,
  };
  // const updateColumns = {
  //   id: req.body.id,
  // };

  return update(req, res, constant.tableNameBD.PROMOTIONS, updatePromotion);
};



// Carts
export const getAllCart = (req, res) => {
  const queryCondition =
    "SELECT carts.*, pd.name as product_name, pd.image, pd.price, pt.id as promotion_id, pt.discount, pt.start_day, pt.end_day FROM carts"
    +
    " INNER JOIN products as pd ON pd.id = carts.product_id"
    + " LEFT JOIN (SELECT * from promotions where promotions.start_day <= CURDATE() and CURDATE() <= promotions.end_day) as pt ON pt.product_id = pd.id "

    +  ` WHERE carts.user_id = ${req.query.user_id}`;

  let querySearch = "";

  return getAll(
    res,
    constant.tableNameBD.CARTS,
    queryCondition,
    querySearch
  );
};
// export const getCartByUserProduct = (req, res) => {
//   const queryCondition =
//     "SELECT carts.*, pd.name as product_name, pd.image FROM carts"
//     +
//     " INNER JOIN products as pd ON pd.id = carts.product_id"
//     +  ` WHERE carts.user_id = ${req.query.user_id} and carts.product_id = ${req.query.product_id}`;

//   let querySearch = "";

//   return getAll(
//     res,
//     constant.tableNameBD.CARTS,
//     queryCondition,
//     querySearch
//   );
// };
// export const getCartByID = (req, res) => {
//   const queryCondition = "SELECT carts.*, pd.name as product_name, pd.image FROM carts" +
//     " INNER JOIN products as pd ON pd.id = carts.product_id"
//     +  ` WHERE carts.user_id = ${req.query.id}`;
//   return getByID(req, res, constant.tableNameBD.CARTS, queryCondition);
// };

export const deleteCartByID = (req, res) => {
  
  return deleteByID(req, res, constant.tableNameBD.CARTS);
};
export const deleteCartByUserID = (req, res) => {
  
  return deleteByUserID(req, res, constant.tableNameBD.CARTS);
};
export const deleteCartByProductID = (req, res) => {
  
  return deleteByProductID(req, res, constant.tableNameBD.CARTS);
};
export const createCart = (req, res) => {
  const newCart = {
    product_id: req.body.product_id,
    user_id: req.body.user_id,
    quantity: req.body.quantity,
    
  };
  return create(req, res, constant.tableNameBD.CARTS, newCart);
};

export const updateCartByID = (req, res) => {
  const updateCart = {
    id: req.body.id,
    product_id: req.body.product_id,
    user_id: req.body.user_id,
    quantity: req.body.quantity,
  };
  // const updateColumns = {
  //   id: req.body.id,
  // };

  return update(req, res, constant.tableNameBD.CARTS, updateCart);
};

// Invoice
export const getAllInvoice = (req, res) => {
  const queryCondition = "SELECT invoices.*, users.full_name as user_name FROM invoices INNER JOIN users ON users.id = invoices.user_id";
  let querySearch = "";

  return getAll(
    res,
    constant.tableNameBD.INVOICES,
    queryCondition,
    querySearch
  );
};

export const getInvoiceByID = (req, res) => {
  const queryCondition = "";
  return getByID(
    req,
    res,
    constant.tableNameBD.INVOICES,
    queryCondition
  );
};

export const getInvoiceByUserID = (req, res) => {
  const queryCondition = "SELECT invoices.*, users.full_name as user_name FROM invoices INNER JOIN users ON users.id = invoices.user_id"
  +` WHERE invoices.user_id = ${req.query.id}`;

  return getByID(
    req,
    res,
    constant.tableNameBD.INVOICES,
    queryCondition
  );
};

export const deleteInvoiceByID = (req, res) => {
  // const deleteColumns = {
  //   id: req.query.id,
  // };
  return deleteByID(
    req,
    res,
    constant.tableNameBD.INVOICES,
    // deleteColumns
  );
};

export const createInvoice = (req, res) => {
  const newInvoice = {
    user_id: req.body.user_id,
    phone: req.body.phone,
    address: req.body.address,
    payment: req.body.payment,
    order_date: new Date(),
    status: req.body.status,
  };
  console.log(newInvoice);
  

  return create(
    req,
    res,
    constant.tableNameBD.INVOICES,
    newInvoice
  );
};

export const updateInvoiceByID = (req, res) => {
  const updateInvoice = {
    id: req.body.id,
    user_id: req.body.user_id,
    phone: req.body.phone,
    address: req.body.address,
    payment: req.body.payment,
    order_date: req.body.order_date,

    status: req.body.status,
  };

  // const updateColumns = {
  //   id: req.body.id,
  // };

  return update(
    req,
    res,
    constant.tableNameBD.INVOICES,
    updateInvoice,
    // updateColumns
  );
};

// Invoice Detail
export const getAllInvoiceDetail = (req, res) => {
  const queryCondition = `SELECT invdt.* , pd.name as product_name, pm.discount, inv.phone, inv.address, inv.payment,inv.order_date, inv.status, inv.user_id FROM ${constant.tableNameBD.INVOICEDETAILS} as invdt ` +
  `INNER JOIN ${constant.tableNameBD.PRODUCTS} as pd ON pd.id = invdt.product_id`+
  ` INNER JOIN ${constant.tableNameBD.INVOICES} as inv ON inv.id = invdt.invoice_id`+

  ` LEFT JOIN ${constant.tableNameBD.PROMOTIONS} as pm ON pm.id = invdt.promotion_id`;
      // +  "INNER JOIN users  ON users.id = inv.user_id";

  let querySearch = "";
  // // if (req.body.invoiceID && req.body.invoiceID !== "") {
  //   querySearch += ` WHERE invdt.invoice_id = ${req.body.invoice_id}`;
  // // }

  return getAll(
    res,
    constant.tableNameBD.INVOICEDETAILS,
    queryCondition,
    querySearch
  );
};

export const getInvoiceDetailByID = (req, res) => {
  const queryCondition = `SELECT invdt.* , pd.name as product_name, pm.discount FROM ${constant.tableNameBD.INVOICEDETAILS} as invdt ` +
  `INNER JOIN ${constant.tableNameBD.PRODUCTS} as pd ON pd.id = invdt.product_id`+
  ` LEFT JOIN ${constant.tableNameBD.PROMOTIONS} as pm ON pm.id = invdt.promotion_id`
      +  ` WHERE invdt.invoice_id = ${req.query.id}`;
  return getByID(
    req,
    res,
    constant.tableNameBD.INVOICEDETAILS,
    queryCondition
  );
};
export const getInvoiceDetailByProductID = (req, res) => {
  const queryCondition = `SELECT invdt.* , pd.name as product_name, pm.discount FROM ${constant.tableNameBD.INVOICEDETAILS} as invdt ` +
  `INNER JOIN ${constant.tableNameBD.PRODUCTS} as pd ON pd.id = invdt.product_id`+
  ` LEFT JOIN ${constant.tableNameBD.PROMOTIONS} as pm ON pm.id = invdt.promotion_id`
      +  ` WHERE invdt.product_id = ${req.query.id}`;
  return getByID(
    req,
    res,
    constant.tableNameBD.INVOICEDETAILS,
    queryCondition
  );
};
export const getInvoiceDetailByUserID = (req, res) => {
  const queryCondition = `SELECT invdt.* , pd.name as product_name,pd.image, inv.status, inv.phone, inv.address, inv.payment,inv.order_date  FROM ${constant.tableNameBD.INVOICEDETAILS} as invdt ` +
  `INNER JOIN ${constant.tableNameBD.PRODUCTS} as pd ON pd.id = invdt.product_id`+
  ` INNER JOIN ${constant.tableNameBD.INVOICES} as inv ON inv.id = invdt.invoice_id`

  // ` LEFT JOIN ${constant.tableNameBD.PROMOTIONS} as pm ON pm.id = invdt.promotion_id`;
      +  ` WHERE inv.user_id = ${req.query.id}`;
  return getByID(
    req,
    res,
    constant.tableNameBD.INVOICEDETAILS,
    queryCondition
  );
};

export const deleteInvoiceDetailByID = (req, res) => {
  // const deleteColumns = {
  //   id: req.query.id,
  // };
  return deleteByID(
    req,
    res,
    constant.tableNameBD.INVOICEDETAILS,
    // deleteColumns
  );
};

export const createInvoiceDetail = (req, res) => {
    const newInvoiceDetail = {
      invoice_id: req.body.invoice_id,
      product_id: req.body.product_id,
      price: req.body.price,
      price_sale: req.body.price_sale,
      promotion_id: req.body.promotion_id,
      quantity: req.body.quantity,
      money: req.body.money,
    };
   
  
  return create(
    req,
    res,
    constant.tableNameBD.INVOICEDETAILS,
    newInvoiceDetail
  );
};

export const updateInvoiceDetailByID = (req, res) => {
  const updateInvoiceDetail = {
    id: req.body.id,
    invoice_id: req.body.invoice_id,
    product_id: req.body.product_id,
    price: req.body.price,
    price_sale: req.body.price_sale,
    promotion_id: req.body.promotion_id,
    quantity: req.body.quantity,
    money: req.body.money,

  };

  // const updateColumns = {
  //   id: req.body.id,
  // };

  return update(
    req,
    res,
    constant.tableNameBD.INVOICEDETAILS,
    updateInvoiceDetail,
    // updateColumns
  );
};

