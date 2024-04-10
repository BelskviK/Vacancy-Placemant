import {
  createVacancy,
  deleteVacancy,
  applyVacancy,
  getVacancies,
} from "./vacancy.service.js";

class VacancyController {
  //recruiter creates vacancy
  async createVacancy(req, res) {
    try {
      const vacancy = await createVacancy(req.body, req.user.userId);
      res.status(201).json(vacancy);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  //recruiter deletes vacancy
  async deleteVacancy(req, res) {
    try {
      const vacancyId = req.params.vacancyId;
      const deletedVacancy = await deleteVacancy(vacancyId, req.user.userId);
      res.status(203).json(deletedVacancy);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  //user applies vacancy to
  async applyVacancy(req, res) {
    try {
      const vacancy = await applyVacancy(req.body, req.user.userId);
      res.status(202).json(vacancy);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getVacancies(req, res) {
    try {
      const vacancy = await getVacancies(req.query);
      res.status(200).json(vacancy);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default new VacancyController();
