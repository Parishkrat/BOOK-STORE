import jwt from "jsonwebtoken";
import Authenticator from "../Model/authmodel.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies?.AUTH_COOKIE;

    if (!token) {
      return res.status(401).json({ message: "Login required" });
    }

    const decoded = jwt.verify(token, process.env.APP_SECRET);

    const user = await Authenticator.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // attach user to request
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
