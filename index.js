const express = require('express');
const fs = require('fs');
const https = require('https');
const path = require('path');

const app = express();

// Middleware to set headers for CORS
function setHeaders(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
}


app.use(setHeaders);

// Route for the main handler
app.get('/', (req, res) => {
    res.send('emby validation server successfully start');
});

app.post('/', (req, res) => {
    res.send('emby validation server successfully start');
});

// Route for validateDevice
app.get('/admin/service/registration/validateDevice', (req, res) => {
    const data = {
        cacheExpirationDays: 365,
        message: "Device Valid",
        resultCode: "GOOD"
    };
    res.json(data);
});

app.post('/admin/service/registration/validateDevice', (req, res) => {
    const data = {
        cacheExpirationDays: 365,
        message: "Device Valid",
        resultCode: "GOOD"
    };
    res.json(data);
});

// Route for validate
app.get('/admin/service/registration/validate', (req, res) => {
    const data = {
        featId: "",
        registered: true,
        expDate: "2099-01-01",
        key: ""
    };
    res.json(data);
});

app.post('/admin/service/registration/validate', (req, res) => {
    const data = {
        featId: "",
        registered: true,
        expDate: "2099-01-01",
        key: ""
    };
    res.json(data);
});

// Route for getStatus
app.get('/admin/service/registration/getStatus', (req, res) => {
    const data = {
        deviceStatus: "0",
        planType: "Lifetime",
        subscriptions: {}
    };
    res.json(data);
});

app.post('/admin/service/registration/getStatus', (req, res) => {
    const data = {
        deviceStatus: "0",
        planType: "Lifetime",
        subscriptions: {}
    };
    res.json(data);
});
//
// // Define paths to certificate and key files
// const basePath = process.env.PWD || path.resolve('.');
// const crtFile = path.join(basePath, 'cert', 'server.crt');
// const keyFile = path.join(basePath, 'cert', 'server.key');
//
// // Read SSL certificate and key
// const options = {
//     cert: fs.readFileSync(crtFile),
//     key: fs.readFileSync(keyFile)
// };
//
//
// // Create HTTPS server
// const httpsServer = https.createServer( app);
const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0'; // Replace with actual IP
//
// httpsServer.listen(PORT, HOST, () => {
//     console.log(`HTTPS Server running on ${HOST}:${PORT}`);
// });



app.listen(PORT, HOST, () => {
    console.log(`Listening on port ${PORT}`);
})