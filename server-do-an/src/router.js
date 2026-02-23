import express from "express";
import {
  getAllUser,
  createUser,
  updateUserByID,
  deleteUserByID,
  getUserByEmail,
  getUserByID,

  getAllRole,
  createRole,
  updateRoleByID,
  deleteRoleByID,

  getAllComment,
  createComment,
  getByRoleID,
  getCommentByProductID,
  getCommentByUserID,
  updateCommentByID,
  deleteCommentByID,
  deleteCommentByProductID,

  
  Login,
  createLogin,
  getAllLogin,
  checkEmail,

  createProduct,
  getAllProduct,
  getProductByID,
  getProductByName,
  getProductByBrandID,
  updateProductByID,
  deleteProductByID,

  deleteBrandByID,
  createBrand,
  updateBrandByID,
  getBrandByID,
  getAllBrand,

  fogotPassword,
  getProfileByID,
  updateProfileByID,

  getAllPromotion,
  createPromotion,
  getPromotionByID,
  updatePromotionByID,
  deletePromotionByID,
  deletePromotionByProductID,

  getAllCart,
  createCart,
  // getCartByID,
  // getCartByUserProduct,
  updateCartByID,
  deleteCartByID,
  deleteCartByUserID,
  deleteCartByProductID,


  getAllInvoice,
  createInvoice,
  getInvoiceByID,
  updateInvoiceByID,
  deleteInvoiceByID,
  getInvoiceByUserID,

  getAllInvoiceDetail,
  createInvoiceDetail,
  getInvoiceDetailByID,
  getInvoiceDetailByProductID,
  getInvoiceDetailByUserID,

  updateInvoiceDetailByID,
  deleteInvoiceDetailByID,
} from "./controller.js";
import {
  payment,
  callback
} from "./zalopay.js";

const router = express.Router();
//LOGIN
router.post("/forgot/checkemail",checkEmail);
router.post("/login", Login);
router.post("/login/create", createLogin);
router.post("/forgot/update", fogotPassword);
router.get("/login/all", getAllLogin);
router.post("/profile",getProfileByID);
router.post("/profile/update",updateProfileByID)

// User
router.post("/user/all", getAllUser);
router.post("/user", getUserByEmail);
router.post("/user/create", createUser);
router.post("/user/update", updateUserByID);
router.post("/user/delete", deleteUserByID);
router.post("/user/id", getUserByID);

// Role
router.post("/role/all", getAllRole);
router.post("/role", getByRoleID);
router.post("/role/create", createRole);
router.post("/role/update", updateRoleByID);
router.post("/role/delete", deleteRoleByID);

// CommentReview
router.post("/comment/all", getAllComment);
router.post("/comment", getCommentByProductID);
router.post("/comment/user", getCommentByUserID);

router.post("/comment/update", updateCommentByID);
router.post("/comment/create", createComment);
router.post("/comment/delete", deleteCommentByID);
router.post("/comment/delete/product", deleteCommentByProductID);

// Brand
router.post("/brand/all", getAllBrand);
router.post("/brand", getBrandByID);
router.post("/brand/update", updateBrandByID);
router.post("/brand/create", createBrand);
router.post("/brand/delete", deleteBrandByID);

// Product
router.post("/product/create", createProduct);
router.post("/product/all", getAllProduct);
router.post("/product", getProductByID);
router.post("/product/update", updateProductByID);
router.post("/product/delete", deleteProductByID);
router.post("/product/name", getProductByName);
router.post("/product/brand", getProductByBrandID);


//ProductDetails
router.post("/productDetails/",getProductByID);

// Promptions

// Promotion
router.post("/promotion/all", getAllPromotion);
router.post("/promotion", getPromotionByID);
router.post("/promotion/update", updatePromotionByID);
router.post("/promotion/create", createPromotion);
router.post("/promotion/delete", deletePromotionByID);
router.post("/promotion/delete/product", deletePromotionByProductID);


// Cart
router.post("/cart/all", getAllCart);
// router.post("/cart", getCartByUserProduct);
router.post("/cart/update", updateCartByID);
router.post("/cart/create", createCart);
router.post("/cart/delete", deleteCartByID);
router.post("/cart/delete/user", deleteCartByUserID);
router.post("/cart/delete/product", deleteCartByProductID);

// Invoice
router.post("/invoice/all", getAllInvoice);
router.post("/invoice", getInvoiceByID);
router.post("/invoice/user", getInvoiceByUserID);

router.post("/invoice/update", updateInvoiceByID);
router.post("/invoice/create", createInvoice);
router.post("/invoice/delete", deleteInvoiceByID);

// InvoiceDetail
router.post("/invoice-detail/all", getAllInvoiceDetail);
router.post("/invoice-detail", getInvoiceDetailByID);
router.post("/invoice-detail/product", getInvoiceDetailByProductID);
router.post("/invoice-detail/user", getInvoiceDetailByUserID);

router.post("/invoice-detail/update", updateInvoiceDetailByID);
router.post("/invoice-detail/create", createInvoiceDetail);
router.post("/invoice-detail/delete", deleteInvoiceDetailByID);

router.post("/payment-zalopay", payment);
router.post("/callback", callback);

export default router;
