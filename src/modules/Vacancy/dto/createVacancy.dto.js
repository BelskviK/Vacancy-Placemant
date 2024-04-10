import { body } from "express-validator";

export const createVacancyDto = [
  body("title").notEmpty().isString(),
  body("description").notEmpty().isString(),
  body("category").notEmpty().isString(),
];
