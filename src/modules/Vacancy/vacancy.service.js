import Vacancy from "./vacancy.model.js";
//recruiter creates vacancy
export async function createVacancy(body, userId) {
  const vacancy = new Vacancy({ ...body, owner: userId });
  await vacancy.save();
  return vacancy;
}
//recruiter deletes vacancy
export async function deleteVacancy(vacancyId, currentUserId) {
  const vacancy = await Vacancy.findOne({
    _id: { $eq: vacancyId },
    owner: { $eq: currentUserId },
  });
  if (!vacancy) {
    throw new Error("Vacancy not found");
  }
  await vacancy.deleteOne();

  return vacancy;
}
//user applies vacancy to
export async function applyVacancy(body, userId) {
  const vacancy = await Vacancy.findById(body.vacancy);
  vacancy.applies.push(userId);
  vacancy.save();
  return vacancy;
}
//get vacancies with filters
export async function getVacancies(query) {
  const { category, searchWord } = { ...query };

  const filter = {};
  const statments = [];
  if (category) statments.push({ category: { $eq: category } });
  if (searchWord) statments.push({ title: { $in: searchWord } });
  if (statments.length > 0) filter.$and = statments;

  const vacancies = await Vacancy.find(filter);
  return vacancies;
}
