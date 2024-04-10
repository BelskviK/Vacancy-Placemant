import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["recruiter", "user"],
      default: "user",
    },
    vacancies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vacancie",
      },
    ],
  },
  {
    versionKey: false,
  }
);
const User = mongoose.model("User", userSchema);
export default User;
