import CreateUserFactory from "./User.js";

const user1 = CreateUserFactory.createUser("Nguyễn Văn A", "admin");
console.log(user1.getInformation());

const user2 = CreateUserFactory.createUser("Trần Thị B", "member");
console.log(user2.getInformation());