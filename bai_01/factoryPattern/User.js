class User {
    constructor(name, roleUser) {
        this.name = name;
        this.roleUser = roleUser
    }
    getInformation() {
        return "name : " + this.name + "| role :" + this.roleUser;
    }
}

class CreateUserFactory {
    static createUser(name, roleUser){
        switch (roleUser) {
            case "member":
                return new User(name, "MEMBER");
            case "admin":
                return new User(name, "ADMIN");
            default:
                throw console.error("role khong hop le");
                
        }
    }
}

export default CreateUserFactory