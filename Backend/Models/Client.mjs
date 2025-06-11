import express from "express";
import mongoose from "mongoose";
import AutoIncrement from "mongoose-sequence"; // Import mongoose-sequence

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
); //time of creation
// userSchema.plugin(AutoIncrement(mongoose.connection), { inc_field: "userid" });

const User = mongoose.model("User", userSchema);
export default User;
