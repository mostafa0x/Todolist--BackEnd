const UserDb = require("../Model/Models").DbUsers;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  Login: async (req, res) => {
    const { email, password } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return res.status(400).json({ message: "Please enter a valid email" });
    }

    if (!password || password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }
    const user = await UserDb.findOne({ email: email });

    try {
      if (!user) {
        return res.status(401).json({ message: "Wrong email or password!" });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(401).json({ message: "Wrong email or password!" });
      }

      const token = jwt.sign({ userId: user._id }, process.env.key, {
        expiresIn: "1h",
      });

      return res.status(200).json({
        message: "Login - Success",
        token: token,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: " server error" });
    }
  },
  signin: async (req, res) => {
    const { email, password, repassword } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return res.status(400).json({ message: "Please enter a valid email" });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters",
      });
    }
    if (!repassword || password !== repassword) {
      return res.status(400).json({ message: "The repassword does not match" });
    }

    try {
      const user = await UserDb.findOne({ email: email });

      if (user) {
        return res.status(409).json({ message: "Account already taken" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new UserDb({ email: email, password: hashedPassword });
      await newUser.save();
      const token = jwt.sign({ userId: newUser._id }, process.env.key, {
        expiresIn: "1h",
      });

      return res.status(201).json({
        message: "Sign In - Success",
        token: token,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: " Server Error" });
    }
  },
};
