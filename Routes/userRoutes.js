import express from "express";
import {
  fetchbooks,
  createbooks,
  update,
  deleted,
} from "../controller/bookcontroller.js";
import { isAuthenticated } from "../middleware/Authmiddleware.js";
import { authorizeroles } from "../middleware/rolemiddleware.js";

const route = express.Router();

route.get("/fetch", fetchbooks);
route.post(
  "/create",
  isAuthenticated,
  authorizeroles("admin", "editor"),
  createbooks
);
route.put(
  "/update/:id",
  isAuthenticated,
  authorizeroles("admin", "editor"),
  update
);
route.delete("/:id", isAuthenticated, authorizeroles("admin"), deleted);
export default route;
