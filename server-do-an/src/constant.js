const constant = {
  msg: {
    CREATE_SUCCESS: "Created data successfully",
    UPDATE_SUCCESS: "Updated data successfully",
    DELETE_SUCCESS: "Deleted data successfully",
    GET_SUCCESS: "Get data successfully",

    SERVER_ERROR: "Internal Server Error",
  },
  code: {
    OK: 200,
    NOT_FOUND: 404,
    SERVER_ERROR: 500
  },
  tableNameBD: {
    ROLES: "roles",
    COMMENTS: "comments",
    BRANDS: "brands",
    PRODUCTS: "products",
    PROMOTIONS: "promotions",
    INVOICES: "invoices",
    INVOICEDETAILS:"invoicedetails",
    USERS: "users",
    CARTS: "carts"
  },
  commentStatus: {
    PENDING: "pending",
    APPROVED: "approved",
  },
};

export default constant;
