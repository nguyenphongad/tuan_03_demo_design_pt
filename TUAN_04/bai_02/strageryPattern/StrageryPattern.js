class PaymentStrategy {
    pay(amount) {
        throw new Error("Phương thức này cần được triển khai");
    }
}

class CashPayment extends PaymentStrategy {
    pay(amount) {
        console.log(`Thanh toán ${amount} bằng Tiền mặt`);
    }
}

class BankTransferPayment extends PaymentStrategy {
    pay(amount) {
        console.log(`Thanh toán ${amount} bằng Chuyển khoản`);
    }
}

class MomoPayment extends PaymentStrategy {
    pay(amount) {
        console.log(`Thanh toán ${amount} bằng MoMo`);
    }
}

class VNPayPayment extends PaymentStrategy {
    pay(amount) {
        console.log(`Thanh toán ${amount} bằng VNPay`);
    }
}