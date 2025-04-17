const express = require('express');
const axios = require('axios');
const CircuitBreaker = require('opossum');

const app = express();
const PORT = 3000;
const SERVICE_B_URL = 'http://localhost:4000/data';

// Cấu hình Circuit Breaker
const breaker = new CircuitBreaker(
    async () => {
        const response = await axios.get(SERVICE_B_URL);
        return response.data;
    },
    {
        timeout: 5000,           // Timeout 5s
        errorThresholdPercentage: 50, // 50% lỗi sẽ mở circuit
        resetTimeout: 30000       // Tự động đóng sau 30s
    }
);

// Bắt sự kiện từ breaker
breaker.on('success', () => console.log('✅ Thành công'));
breaker.on('failure', () => console.log('❌ Lỗi'));
breaker.on('open', () => console.log('⚠️ Circuit mở - Dừng gọi Service B'));
breaker.on('close', () => console.log('🔌 Circuit đóng - Thử lại Service B'));

app.get('/fetch-from-b', async (req, res) => {
    try {
        const result = await breaker.fire();
        res.json(result);
    } catch (error) {
        if (error.code === 'ETIMEDOUT') {
            return res.status(504).json({ error: 'Service B timeout' });
        }
        if (breaker.opened) {
            return res.status(503).json({
                error: 'Service B tạm ngừng (Circuit Breaker đã mở)',
                tip: 'Thử lại sau 30 giây'
            });
        }
        res.status(500).json({
            error: error.response?.data || error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Service A chạy tại http://localhost:${PORT}`);
});