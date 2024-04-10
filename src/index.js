import express from "express";
import bodyParser from "body-parser";
import { connectToMongoDB } from "./shared/database.js";

// routers
import { UserRouter } from "./modules/User/user.router.js";
import { AuthRouter } from "./modules/Auth/auth.router.js";
import { VacancyRouter } from "./modules/Vacancy/vacancy.router.js";

const app = express();
app.use(bodyParser.json());

async function main() {
  await connectToMongoDB();

  app.use("/api/users", UserRouter);
  app.use("/api/auth", AuthRouter);
  app.use("/api/vacancies", VacancyRouter);

  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
}

main();
