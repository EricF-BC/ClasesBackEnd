import UserDao from "./mongodb/user.dao.js";
import ProductDaoMongoDB from "./mongodb/product.dao.js";
import CartDaoMongoDB from "./mongodb/cart.dao.js";
import { UserModel } from "./mongodb/models/user.model.js";

let userDao = new UserDao(UserModel);
let prodDao = new ProductDaoMongoDB();
let cartDao = new CartDaoMongoDB();

export default { userDao, prodDao, cartDao };