import mongoose from "mongoose";
import {
  saveVacancyIduser,
  deleteOneVacancyIdUser,
  deleteOneVacancyIdUserFav,
} from "../../middlewares/vacancySchema.middleware.js";

export const VacancySchema = new mongoose.Schema(
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
//reqruiter relation

VacancySchema.post("save", { document: true }, saveVacancyIduser);
VacancySchema.post("deleteOne", { document: true }, deleteOneVacancyIdUser);
VacancySchema.post("deleteOne", { document: true }, deleteOneVacancyIdUserFav);

export default mongoose.model("Vacancy", VacancySchema);
