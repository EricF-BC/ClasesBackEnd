import Services from "./class.services.js";
import CartService from "./cart.services.js";
import ProdService from "./product.services.js";
import TicketDaoMongo from "../persistence/daos/mongodb/ticket.dao.js";

const ticketDao = new TicketDaoMongo();
const prodService = new ProdService();
const cartService = new CartService();

export default class TicketService extends Services {
  constructor() {
    super(ticketDao);
  }

  async generateTicket(user) {
    try {
      const cart = await cartService.getById(user.cartId);
      if (!cart) return null;
      let amountAcc = 0;
      if (cart.products.length > 0) {
        for (const prodInCart of cart.products) {
          const idProd = prodInCart.product;
          const prodDB = await prodService.getById(idProd);
          
          if (prodInCart.quantity <= prodDB.stock) {
            const amount = prodInCart.quantity * prodDB.price;
            amountAcc += amount;
          } else return null;
        }
      }
      const ticket = await this.dao.create({
        code: `${Math.floor(Math.random() * 1000)}`,
        purchase_datetime: new Date().toLocaleString(),
        amount: amountAcc,
        purchaser: user.email,
      });
      await cartService.clearProductsFromCart(user.cartId);
      return ticket;
    } catch (error) {
      throw new Error(error);
    }
  }
}
