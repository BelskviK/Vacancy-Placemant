import express from "express";
import VacancyController from "./vacancy.controller.js";
import { validate } from "../../middlewares/validation.middleware.js";
import { checkAuth } from "../../middlewares/auth.middleware.js";

// dtos
import { createVacancyDto } from "./dto/createVacancy.dto.js";

export const VacancyRouter = express.Router();

//recruiter creates vacancy
VacancyRouter.post(
  "/",
  checkAuth(["recruiter"]),
  createVacancyDto,
  validate,
  VacancyController.createVacancy
);

//recruiter deletes vacancie
VacancyRouter.delete(
  "/:vacancyId",
  checkAuth(["recruiter"]),
  VacancyController.deleteVacancy
);

//everyone search for vacancies
VacancyRouter.get("/", validate, VacancyController.getVacancies);

// user applies
VacancyRouter.put(
  "/",
  checkAuth(["user"]),
  validate,
  VacancyController.applyVacancy
);
