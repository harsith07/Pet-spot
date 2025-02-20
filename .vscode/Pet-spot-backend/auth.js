const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// ✅ Register Route
router.post("/register", [
    body("name").notEmpty(),
    body("email").isEmail(),
    body("password").isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ name, email, password: hashedPassword });
        await user.save();

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });
        res.json({ token });
    } catch (err) {
        res.status(500).send("Server error");
    }
});

// ✅ Login Route
router.post("/login", [
    body("email").isEmail(),
    body("password").exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Invalid Credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });
        res.json({ token });
    } catch (err) {
        res.status(500).send("Server error");
    }
});

module.exports = router;
