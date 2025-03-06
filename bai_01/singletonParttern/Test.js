import DBconnect from "./DBconnect.js";

const db1 = new DBconnect();
console.log("status :" + db1.getConnection());

const db2 = new DBconnect();
console.log("status : " + db2.getConnection());

console.log("status connented : "+ db1 === db2)