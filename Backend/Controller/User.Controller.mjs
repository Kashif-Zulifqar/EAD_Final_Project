import User from "../Models/Client.mjs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import express from "express";
export const Signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("Inside signup controller - received:", name, email);

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide name, email, and password" });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      console.log("User already exists with this email");
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPass });
    await newUser.save();
    console.log("User saved successfully:", newUser.email);

    const token = jwt.sign({ userid: newUser._id }, "JWTSecret", {
      expiresIn: "2d",
    });

    return res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Server error during signup" });
  }
};

//2. Verify
export const Signin = async (req, res) => {
  try {
    var { email, password } = req.body;
    console.log(email);

    if (!email || !password) {
      res.send("Invalid credentials");
    }
    let user = await User.findOne({ email });
    if (!user) {
      res.send("User does not exist");
    }
    console.log(user);

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      res.send("Invalid Password");
    }
    const token = jwt.sign(
      { userId: user._id }, // Store user ID in token
      "JWTSecret", // Use a secret key (should be in .env)
      { expiresIn: "7d" } // Token expires in 7 days
    );
    res.json({ token, user: { id: user._id, email: user.email } });
  } catch (error) {
    console.log(error.massage);
  }
};
//  3.Get
export const getUser = async (req, res) => {
  // const { userId } = req.userId;
  // const user = await User.findById(userId);
  // if (!user) {
  //   throw new Error("user does not exist");
  // }
  // return res.status(200).json(user, "User fetched successfully");
};

//   const email = req.params.email;
//   if (!email) {
//     return res.status(400).send("Invalid email");
//   }

//   console.log("Received email:", email);

//   let user = await User.findOne({ email: email.toLowerCase() }).exec();

//   if (!user) {
//     console.log("User not found");
//     return res.status(404).json({ message: "User not found" });
//   }

//   console.log("User found:", user);
//   res.json({ user });
// } catch (error) {
//   console.error("Error fetching user:", error);
//   res.status(500).json({ message: "Internal server error" });
// }

//  4.GetALL

export const GetAllUsers = async (req, res) => {
  try {
    console.log("Before get All users");

    let users = await User.find();
    console.log("After " + users);
    if (!users) {
      res.json({ massage: "Users not foud" });
    }
    res.json(users);
  } catch (error) {
    res.status(201).send("Error occured while fetching users");
  }
};
//  5.Delete

export const deleteUser = async (req, res) => {
  try {
    let { name: delname } = req.query;
    console.log("Name " + delname);

    if (!delname) {
      res.send("User to be deleted does not exist");
    }
    let deleted = await User.findOneAndDelete({ name: delname });
    console.log("deleted " + deleted);

    if (!deleted) {
      res.send("Deletion unscuccessful");
    }
    res.json(deleted);
  } catch (error) {
    // res.send("Error occured while deleting users");
  }
};
//  6.Update

export const updateUser = async (req, res) => {
  try {
    let { name, newName } = req.body;

    // Check if name exists
    if (!name) {
      return res
        .status(400)
        .json({ message: "Please provide a name to update" });
    }

    // Define update fields dynamically
    let updateFields = {};
    if (newName) {
      // updateFields.email = newEmail;
      updateFields.name = newName;
    }
    console.log("Before Update");

    // Find and update user
    const updatedUser = await User.findOneAndUpdate(
      { name: name }, // Search by current name
      { $set: updateFields }, // Update fields dynamically
      { new: true } // Return updated user & validate fields
    );
    console.log(" Updated" + updatedUser);

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
