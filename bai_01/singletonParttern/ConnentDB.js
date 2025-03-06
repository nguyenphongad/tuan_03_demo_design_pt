class DBconnect {
    constructor() {
        if (DBconnect.instance) {
            this.connection = "ket noi db thanh cong";
        }
        return DBconnect.instance;
    }
    getConnection() {
        return DBconnect.instance;
    }
}