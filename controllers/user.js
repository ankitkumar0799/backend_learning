import { User } from "../models/user.js";
import { sendCookie } from "../utils/features.js";

import bcrypt from "bcrypt";

//START FOR AUTHENTICATION HERE
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user)
      return next(new ErrorHandler("IUnvalid Email And Password", 400));

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return next(new ErrorHandler("invalid email and password", 404));

    sendCookie(res, user, `welcome back ,${user.name}`, 201);
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return next(new ErrorHandler("User Already exist", 400));

    const hashedpassword = await bcrypt.hash(password, 10);

    user = await User.create({ name, email, password: hashedpassword });
    sendCookie(res, user, "register successfull", 201);
  } catch (error) {
    next(error);
  }
};

export const getMyDetails = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};

export const logOut = (req, res) => {
  res
    .status(200)
    .cookie("token", "", { maxAge: new Date(Date.now()),
      sameSite:process.env.NODE_ENV === "Development"?'lax' : 'none',
      secure: process.env.NODE_ENV === "Development"?false : true, })
    .json({
      success: true,
      user: req.user,
    });
};

// export const getAllUsers = async (req, res) => {
//     const users = await User.find({});
//     const keyword = req.query.keyword;
//     console.log(keyword);
//     res.json({
//       success: true,
//       users,
//     });
//   }

// export const register = async (req, res) => {
//   const { name, email, password } = req.body;
//   const users = await User.create({
//     name,
//     email,
//     password,
//   });
//   res.status(201).cookie("token", "ankit").json({
//     success: true,
//     message: "true",
//   });
// }

// export const specialFunc = (req, res) => {
//   res.json({
//     success: true,
//     users: "ankit",
//   });
// }

// export const userDetils = async (req, res) => {
//   const { id } = req.params;
//   // console.log(req.params);
//   const user = await User.findById(id);

//   res.json({
//     success: "true",
//     user,
//   });

// }

// export const updateUser = async (req, res) => {
//   const { id } = req.params;
//   // console.log(req.params);
//   const user = await User.findById(id);

//   res.json({
//     success: "true",
//     message:"update",
//   });

// }

// export const deleteUser = async (req, res) => {
//   const { id } = req.params;
//   // console.log(req.params);
//   const user = await User.findById(id);

//   res.json({
//     success: "true",
//     message:"delete",
//   });

// }
