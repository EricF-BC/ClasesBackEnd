export default class UserResDTO {
    constructor(user){
        this.first_name = user.first_name;
        this.email = user.email;
        this.role = user.role;
    }
}