import express from "express";
import {
  loginUser,
  logout,
  registerUser,
} from "../controller/auth_controller.js";

const authenticator_route = express.Router();

authenticator_route.post("/register", registerUser);
authenticator_route.post("/login", loginUser);
authenticator_route.post("/logout", logout);
export default authenticator_route;
