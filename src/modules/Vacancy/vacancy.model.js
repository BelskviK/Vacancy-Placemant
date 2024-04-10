import mongoose from "mongoose";
import User from "../User/user.model.js";

const VacancySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    applies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    versionKey: false,
  }
);

// assigne vacancy._id to user.vacancies[] when recruiter creates vacancy
VacancySchema.post("save", { document: true }, async function (doc, next) {
  const user = await User.findById(doc.owner);
  if (!user) {
    throw new Error("User not found");
  }
  user.vacancies.push(doc._id);
  await user.save();
  next();
});

// remove vacancy._id to user.vacancies[] when recruiter deletes vacancy
VacancySchema.post("deleteOne", { document: true }, async function (doc, next) {
  const user = await User.findById(doc.owner);
  if (!user) {
    throw new Error("User not found");
  }
  user.vacancies = user.vacancies.filter(
    (vacancie) => vacancie.toString() !== doc._id.toString()
  );
  await user.save();
  next();
});

export default mongoose.model("Vacancy", VacancySchema);
