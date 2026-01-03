const service = require("./auth.service");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        error: "Name, email and password are required",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: "Invalid email format",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        error: "Password must be at least 6 characters long",
      });
    }

    const user = await service.register(req.body);

    res.status(201).json({
      message: "User registered successfully",
      user: user,
    });
  } catch (error) {
    if (error.message.includes("already exists")) {
      return res.status(409).json({ error: error.message });
    }

    res.status(500).json({
      error: "Registration failed",
      details: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required",
      });
    }

    const user = await service.login(req.body);

    res.status(200).json({
      message: "Login successful",
      user: user,
    });
  } catch (error) {
    if (error.message.includes("Invalid")) {
      return res.status(401).json({ error: error.message });
    }

    res.status(500).json({
      error: "Login failed",
      details: error.message,
    });
  }
};

exports.checkToken = async (req, res) => {
  try {
    let token;
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    } else if (req.body.token) {
      token = req.body.token;
    } else if (req.query.token) {
      token = req.query.token;
    }

    if (!token) {
      return res.status(400).json({
        error: "Token is required",
      });
    }

    const user = await service.checkToken(token);

    res.status(200).json({
      message: "Token is valid",
      user: user,
    });
  } catch (error) {
    if (error.message.includes("Invalid")) {
      return res.status(401).json({
        error: error.message,
      });
    }

    res.status(500).json({
      error: "Token verification failed",
      details: error.message,
    });
  }
};
