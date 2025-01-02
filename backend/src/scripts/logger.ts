import { Express } from "express";
import { configMatcher } from "@/utils";
import expressListEndpoints from "express-list-endpoints";
import chalk from "chalk";

const logger = (app: Express, PORT: number) => {
  const endpoints = expressListEndpoints(app);

  const newMatcher = Array.from(
    new Set(
      endpoints.map((obj) => {
        const feature = obj.path.split("/")[3];
        return feature;
      })
    )
  );

  console.log("\n========= Welcome To ALLWA =========\n");
  console.log(chalk.yellow(`- Total endpoints: ${endpoints.length}`));
  console.log(chalk.blue(`- Server is running on port:`), PORT);
  console.log(chalk.red(`~> http://localhost:${PORT}/ <~`));
  console.log(chalk.blackBright(`~> http://localhost:${PORT}/docs <~`));
  console.log("\n====================================");

  newMatcher.forEach((matcher) => {
    console.log(chalk.cyan(`\nMatcher: ${matcher}`));

    const filteredEndpoints = endpoints.filter((endpoint) =>
      endpoint.path.includes(matcher)
    );

    if (filteredEndpoints.length > 0) {
      filteredEndpoints.forEach((endpoint) => {
        const method = endpoint
          .methods[0] as keyof typeof configMatcher.methods;
        const colorFunction = configMatcher.methods[method] || chalk.white;
        console.log(
          colorFunction(
            `~~> ${endpoint.methods.join(", ")}`,
            chalk.hex("#d35400")(`${endpoint.path}`)
          )
        );
      });
    } else {
      console.log(chalk.hex("#FF0000")(`No endpoints for matcher: ${matcher}`));
    }
  });

  console.log("\n====================================\n");
};
export default logger;
