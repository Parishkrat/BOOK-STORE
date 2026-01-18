import Authenticator from "../Model/authmodel.js";
import bcrypt, { compareSync } from "bcrypt";
import jwt from "jsonwebtoken";

//register user
const allowedRoles = ["admin", "editor", "user"];

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    //validate the email
    // const ExistingUser = await Authenticator.findOne({ email }).select(
    //   "+authentication.password"
    // );

    const ExistingUser = await Authenticator.findOne({ email });

    if (ExistingUser) {
      return res.status(500).json({ message: "User already exist" });
    }
    //encrypt password
    const hashedPassword = bcrypt.hashSync(password, 10);

    //Save user in mongodb
    const newAuth = new Authenticator({
      name,
      email,
      role: allowedRoles.includes(role) ? role : "user",
      authentication: {
        password: hashedPassword,
      },
    });
    //save

    await newAuth.save();

    res.status(200).json({ message: "User is saved" });
  } catch (error) {
    console.error("LOGIN/REGISTER ERROR 👉", error);
    return res.status(500).json({ message: error.message });
  }
};

//login

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //user email exit or not
    const ExistingUser = await Authenticator.findOne({ email }).select(
      "+authentication.password"
    );
    if (!ExistingUser) {
      return res
        .status(500)
        .json({ message: "Please register user it doesn't exit" });
    }

    //password match

    const Matchpassword = await bcrypt.compare(
      String(password),
      ExistingUser.authentication.password
    );

    //password doesn't match
    if (!Matchpassword) {
      return res.status(401).json({ message: "invalid password" });
    }

    //genrate jwt
    const token = jwt.sign({ id: ExistingUser._id }, process.env.APP_SECRET, {
      expiresIn: "1d",
    });

    //set cookie
    res.cookie("AUTH_COOKIE", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    //response

    res.status(200).json({ message: "User is logged in" });
  } catch (error) {
    console.error("LOGIN/REGISTER ERROR", error);
    return res.status(500).json({ message: error.message });
  }
};

//logout

export const logout = async (req, res) => {
  try {
    res.clearCookie("AUTH_COOKIE", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "Production",
      sameSite: "strict",
    });

    res.status(200).json({ message: "User is  Logged out successfully" });
  } catch (error) {
    res.status(404).json({ message: "Error occurred " });
  }
};
