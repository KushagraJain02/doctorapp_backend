import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js"; // your isadmins model

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // check if this user is admin
    const isAdmin = await Admin.findOne({ email: decoded.email });

    req.user = {
      id: decoded.id,
      email: decoded.email,
      isAdmin: !!isAdmin, // true if found in Admins collection
    };

    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token is not valid" });
  }
};
