// server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { ethers } = require('ethers');

const app = express();
const port = 3000;

app.use(cors()); // To handle CORS
app.use(bodyParser.json()); // To parse JSON requests

const nonces = {};

app.get('/nonce', (req, res) => {
    const { address } = req.query;
    if (!address) {
        return res.status(400).send("Address is required.");
    }

    const nonce = Math.floor(Math.random() * 1000000).toString(); // Generate a random nonce.
    nonces[address] = nonce;
    res.send(nonce);
});

app.post('/verify', (req, res) => {
    const { address, signature, message } = req.body;
    if (!address || !signature || !message) {
        return res.status(400).send("Address, signature, and message are required.");
    }

    // Verify the signature
    try {
        const recoveredAddress = ethers.utils.verifyMessage(message, signature);
        if (recoveredAddress.toLowerCase() === address.toLowerCase() && nonces[address] === JSON.parse(message).nonce) {
            delete nonces[address];
            return res.send("Signature verified");
        } else {
            return res.status(401).send("Signature verification failed.");
        }
    } catch (error) {
        return res.status(500).send("Error verifying signature.");
    }
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
