import MongoDao from "./mongo.dao.js";
import { UserModel } from './models/user.model.js';
import { subDays } from 'date-fns';

export default class UserDao extends MongoDao {
    constructor(){
        super(UserModel);
    }

    async register(user){
        try {
            const { email } = user;
            const existUser = await this.model.findOne({ email });
            if(!existUser) return await this.model.create(user);
            else return null;
        } catch (error) {
            
        }
    };

    async getById(id) {
        try {
          return await this.model.findById(id).populate("cartId");
        } catch (error) {
          throw new Error(error);
        }
      }

    async getByEmail(email){
        try {
            return await this.model.findOne({ email });
        } catch (error) {
            throw new Error(error);
        }
    };

    async updateLastConnection (id){
        try {
            const user = await this.model.findById(id).lean(false);
            if (!user) return null;
            await this.model.findByIdAndUpdate(
                id, 
                { last_connection: new Date() }, 
                { new: true } // Esto devuelve el documento actualizado
            );
        } catch (error) {
            throw new Error(error);
        }
      };


    async deleteInactiveUsers() {
        try {
            const twoDaysAgo = subDays(new Date(), 2);
            const result = await this.model.deleteMany({
                $or: [
                    { last_connection: { $lt: twoDaysAgo } }, // Usuarios con last_connection hace más de 2 días
                    { last_connection: { $exists: false } },  // Usuarios sin last_connection
                    { last_connection: null }                 // Usuarios con last_connection nulo
                ]
            });
            return result;
        } catch (error) {
            throw new Error(error);
        }
    }
}