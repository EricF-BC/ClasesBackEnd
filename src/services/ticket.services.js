import Services from "./class.services.js";
import * as cartService from "./cart.services.js";
import * as prodService from "./product.services.js";
import TicketDaoMongo from "../daos/mongodb/ticket.dao.js";

const ticketDao = new TicketDaoMongo();

export default class TicketService extends Services {
  constructor() {
    super(ticketDao);
  }

  async generateTicket(user) {
    try {
      const cart = await cartService.getByID(user.cartId._id);
      if (!cart) return null;
      let amountAcc = 0;
      if (cart.products.length > 0) {
        for (const prodInCart of cart.products) {
          const idProd = prodInCart.product;
          const prodDB = await prodService.getByID(idProd);
          
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

      await cartService.clearProductsFromCart(user.cartId._id);

      return ticket;
    } catch (error) {
      throw new Error(error);
    }
  }
}
