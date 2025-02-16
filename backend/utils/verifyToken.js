import jwt from "jsonwebtoken";

// Middleware to verify token
export const verifyToken = (req, res, next) => {
  const token = req.cookies?.accessToken; // Ensure req.cookies exists

  if (!token) {
    return res.status(401).json({ success: false, message: "You're not authorized" });
  }

  // If token exists, verify it
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(401).json({ success: false, message: "Token is invalid" });
    }
    req.user = user;
    next();
  });
};

// Middleware to verify user (User can access only their own data or admin)
export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.role === "admin") {
      next();
    } else {
      return res.status(403).json({ success: false, message: "You are not authenticated" });
    }
  });
};

// Middleware to verify admin access
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === "admin") {
      next();
    } else {
      return res.status(403).json({ success: false, message: "You are not authorized" });
    }
  });
};
