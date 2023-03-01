import User from "../models/user";
import Message from "../models/message";
import { hashPassword, comparePassword } from "../helpers/auth";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";

// const nanoid = require("nanoid");

export const register = async (req, res) => {
  //  console.log("REGISTER ENDPOINT => ", req.body);
  const { name, email, password, secret } = req.body;
  // validation
  if (!name)
    return res.json({
      error: "Name is required",
    });
  if (!password || password.length < 6)
    return res.json({
      error: "Password is required and should be 6 characters long",
    });
  if (!secret)
    return res.json({
      error: "Answer is required",
    });
  const exist = await User.findOne({ email });
  if (exist)
    return res.json({
      error: "Email is taken",
    });
  // hash password
  const hashedPassword = await hashPassword(password);

  const user = new User({
    name,
    email,
    password: hashedPassword,
    secret,
    username: nanoid(6),
  });
  try {
    await user.save();
    // console.log("REGISTERED USE => ", user);
    return res.json({
      ok: true,
    });
  } catch (err) {
    console.log("REGISTER FAILED => ", err);
    return res.status(400).send("Error. Try again.");
  }
};

export const login = async (req, res) => {
  // console.log(req.body);
  try {
    const { email, password } = req.body;
    // check if our db has user with that email
    const user = await User.findOne({ email });
    if (user === null)
      return res.json({
        error: "No user found!",
      });
    // check password
    const match = await comparePassword(password, user.password);
    if (!match)
      return res.json({
        error: "Wrong Password!",
      });
    // create signed token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    user.password = undefined;
    user.secret = undefined;
    res.json({
      token,
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send(err.message);
  }
};

export const currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    // res.json(user);
    res.json({
      ok: true,
    });
  } catch (err) {
    console.log(err);
    register.sendStatus(400);
  }
};

export const forgotPassword = async (req, res, next) => {
  const { email, newPassword, secret } = req.body;
  // validation
  if (!newPassword || newPassword.length < 6) {
    return res.json({
      error: "New password is required and should be min 6 characters long",
    });
  }
  if (!secret) {
    return res.json({
      error: "Secret is required",
    });
  }
  let user = await User.findOne({ email, secret });

  if (!user) {
    return res.json({
      error: "We cant verify you with those details",
    });
  }
  // return res.status(400).send("We cant verify you with those details");

  try {
    const hashed = await hashPassword(newPassword);
    await User.findByIdAndUpdate(user._id, { password: hashed });
    return res.json({
      success: "Congrats. Now you can login with your new password",
    });
  } catch (err) {
    console.log(err);
    return res.json({
      error: "Something wrong. Try again.",
    });
  }
};

export const profileUpdate = async (req, res) => {
  try {
    // console.log(req.body);

    const data = {};

    if (req.body.username) {
      data.username = req.body.username;
    }
    if (req.body.about) {
      data.about = req.body.about;
    }
    if (req.body.name) {
      data.name = req.body.name;
    }
    if (req.body.password) {
      if (req.body.password < 6) {
        return res.json({
          error: "password is required and should be min 6 characters long!",
        });
      } else {
        data.password = await hashPassword(req.body.password);
      }
    }
    if (req.body.secret) {
      data.secret = req.body.secret;
    }

    if (req.body.image) {
      data.image = req.body.image;
    }

    let user = await User.findByIdAndUpdate(req.user._id, data, { new: true });

    user.password = undefined;
    user.secret = undefined;
    res.json(user);
  } catch (err) {
    if (err.code == 11000) {
      return res.json({ error: "Duplicate username" });
    }
    console.log(err);
  }
};

export const findPeople = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    // console.log(user);

    let following = user.following;
    following.push(user._id);
    // console.log(following);
    const people = await User.find({ _id: { $nin: following } })
      .select(`-password -secret`)
      .limit(10);
    // console.log(people);
    res.json(people);
  } catch (err) {
    console.log(err);
  }
};

// middleware
export const addFollower = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.body._id, {
      $addToSet: { followers: req.user._id },
    });
    next();
  } catch (err) {
    console.log(err);
  }
};

export const userFollow = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $addToSet: { following: req.body._id },
      },
      { new: true }
    ).select("-password -secret");

    // console.log(user);
    res.json(user);
  } catch (err) {
    console.log(err);
  }
};

export const userFollowing = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const following = await User.find({ _id: user.following }).limit(100);
    res.json(following);
  } catch (err) {
    console.log(err);
  }
};

/// middleware
export const removeFollower = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.body._id, {
      $pull: { followers: req.user._id },
    });

    // console.log(req.body._id, req.user._id);
    next();
  } catch (err) {
    console.log(err);
  }
};

export const userUnfollow = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $pull: { following: req.body._id },
      },
      { new: true }
    );
    // console.log(req.body._id, req.user._id);
    res.json(user);
  } catch (err) {
    console.log(err);
  }
};

export const searchUser = async (req, res) => {
  const { query } = req.params;
  if (!query) return;
  try {
    // $regex is special method from mongodb
    // The i modifier is used to perform case-insensitive matching
    const user = await User.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { username: { $regex: query, $options: "i" } },
      ],
    }).select("-password -secret");
    res.json(user);
  } catch (err) {
    console.log(err);
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params._username }).select(
      "-password -secret"
    );
    res.json(user);
  } catch (err) {
    console.log(err);
  }
};

export const contact = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name)
    return res.json({
      error: "Name is required",
    });

  if (!email)
    return res.json({
      error: "Email is required",
    });

  if (!message)
    return res.json({
      error: "Message is required",
    });

  const msg = new Message({
    name,
    email,
    message,
  });

  try {
    await msg.save();
    // console.log("REGISTERED USE => ", user);
    return res.json({
      ok: true,
    });
    // console.log(name, email, message);
  } catch (err) {
    console.log(err);
  }
};
