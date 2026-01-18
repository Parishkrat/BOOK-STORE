import mongoose from "mongoose";

const AuthenticationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user", "editor"],
    default: "user",
  },
  authentication: {
    password: { type: String, select: false },
    access_token: { type: String, select: false },
  },
});

export default mongoose.model("Authenticator", AuthenticationSchema);
