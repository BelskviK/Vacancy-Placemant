import User from "../modules/User/user.model.js";

// assigne vacancy._id to user.vacancies[] when recruiter creates vacancy
export const saveVacancyIduser = async function (doc, next) {
  const user = await User.findById(doc.owner);
  if (!user) {
    throw new Error("User not found");
  }
  user.vacancies.push(doc._id);
  await user.save();
  next();
};

// remove vacancy._id to user.vacancies[] when recruiter deletes vacancy
export const deleteOneVacancyIdUser = async function (doc, next) {
  const user = await User.findById(doc.owner);
  if (!user) {
    throw new Error("User not found");
  }
  user.vacancies = user.vacancies.filter(
    (vacancie) => vacancie.toString() !== doc._id.toString()
  );
  await user.save();
  next();
};

// remove vacancy._id from user.favorites[] when recruiter deletes vacancy
export const deleteOneVacancyIdUserFav = async function (doc, next) {
  try {
    await User.updateMany(
      { favorites: doc._id },
      { $pull: { favorites: doc._id } }
    );
  } catch (error) {
    console.error("Error removing vacancy from users' favorites:", error);
    throw error;
  }

  next();
};
