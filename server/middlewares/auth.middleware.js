import jwt from "jsonwebtoken";

// Verify JWT
export function authenticateJWT(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized, token not found" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
}

// Allow only User
export function isUser(req, res, next) {
  if (req.user.role !== "user") {
    return res.status(403).json({ message: "User access only" });
  }
  next();
}

// Allow only Authority
export function isAuthority(req, res, next) {
  if (req.user.role !== "authority") {
    return res.status(403).json({ message: "Authority access only" });
  }
  next();
}

// Allow only Admin
export function isAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
}
