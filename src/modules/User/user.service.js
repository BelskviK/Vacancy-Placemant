import User from "./user.model.js";

export async function currentUser(currentUserId) {
  const user = await User.findById(currentUserId);
  // remove unnecessary fields
  user.password = undefined;
  return user;
}
