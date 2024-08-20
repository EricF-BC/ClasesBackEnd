import UserDao from "./mongodb/user.dao.js";
import ProductDaoMongo from "./mongodb/product.dao.js";
import CartDaoMongoDB from "./mongodb/cart.dao.js";

let userDao = new UserDao();
let prodDao = new ProductDaoMongo();
let cartDao = new CartDaoMongoDB();

export default { userDao, prodDao, cartDao };