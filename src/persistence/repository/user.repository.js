import factory from '../daos/factory.js'
const { userDao } = factory;
import UserResDTO from '../dtos/user.res.dto.js'

export default class UserRepository {
    constructor(){
        this.dao = userDao;
    }

    async getUsers() {
        try {
            const userList = await this.dao.getAll(); 
            return userList.map(user => new UserResDTO(user)); 
        } catch (error) {
            throw new Error(error);
        }
    }
}