import Controllers from "./class.controller.js";
import TicketService from "../services/ticket.services.js";
import { createResponse } from "../path.js";
import { HttpResponse } from "../utils/http.response.js";
const httpResponse = new HttpResponse();
const ticketService = new TicketService();

export default class TicketController extends Controllers {
  constructor() {
    super(ticketService);
  }

  async generateTicket(req, res, next) {
    try {
      const user = req.session.user;
      const ticket = await ticketService.generateTicket(user);
      if(!ticket) createResponse(res, 404, 'Error generate ticket');
      else httpResponse.Ok(res, ticket);
    } catch (error) {
      next(error);
    }
  }
}