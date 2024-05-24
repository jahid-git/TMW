const connection = require('../db/config.js');

exports.register = async (req, res) => {
    try {
        const { deviceId, fullName, email, phone, password } = req.body;
        const query = "INSERT INTO users (deviceId, fullName, email, phone, password, status) VALUES (?, ?, ?, ?, ?, ?)";
        const values = [deviceId, fullName, email, phone, password, 'subscription'];

        const user = await new Promise((resolve, reject) => {
            connection.query(query, values, (error, results) => {
                if (error) return reject(error);
                resolve();
            });
        });

        res.status(201).json({ deviceId, fullName, email, phone, password, status: 'subscription' });

    } catch (error) {
        console.log("Error in register controller: ", error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(501).json({
                message: "This user already exists!",
            });
        }
        res.status(501).json({
            message: "Internal server error"
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { phone, password } = req.body;
        const query = "SELECT * FROM users WHERE phone = ? AND password = ?";
        const values = [phone, password];

        const user = await new Promise((resolve, reject) => {
            connection.query(query, values, (error, results) => {
                if (error) return reject(error);
                resolve(results[0]);
            });
        });

        if (!user) {
            return res.status(401).json({ message: "Invalid phone number or password" });
        }

        res.status(200).json(user);

    } catch (error) {
        console.log("Error in login controller: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.subscription = async (req, res) => {
    try {
        const { phone, password, status, packageName, paymentMethod, transactionId, expiration } = req.body;
        const query = "UPDATE users SET status = ?, package = ?, paymentMethod = ?, transactionId = ?, expiration = ? WHERE phone = ?";
        const values = [status, packageName, paymentMethod, transactionId, expiration, phone];

        await new Promise((resolve, reject) => {
            connection.query(query, values, (error, results) => {
                if (error) return reject(error);
                resolve();
            });
        });

        await exports.login(req, res);
    } catch (error) {
        console.log("Error in register controller: ", error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(501).json({
                message: "This user already exists!",
            });
        }
        res.status(501).json({
            message: "Internal server error"
        });
    }
};
