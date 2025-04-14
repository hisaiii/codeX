import jwt from "jsonwebtoken";

export const authenticateJWT = (req, res, next) => {
  const token = req.cookies.token;
  // console.log("token is ",token);
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
};