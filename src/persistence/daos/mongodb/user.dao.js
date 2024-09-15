import MongoDao from "./mongo.dao.js";
import { UserModel } from './models/user.model.js';

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
}