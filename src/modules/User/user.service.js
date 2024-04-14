import User from "./user.model.js";

export async function currentUser(currentUserId) {
  const user = await User.findById(currentUserId);
  console.log(user.role);
  if (user.role === "recruiter") {
    user.favorites = undefined;
  }
  if (user.role === "user") {
    user.vacancies = undefined;
  }
  // remove unnecessary fields
  user.password = undefined;
  return user;
}
