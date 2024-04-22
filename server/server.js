import express from "express";
import cors from "cors";
import records from "./routes/record.js";
import users from "./routes/user.js";
import categories from "./routes/category.js";
import topics from "./routes/topics.js";
import content from "./routes/content.js"
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/record", records);
app.use("/user/", users);
app.use("/category/", categories);
app.use("/topic/", topics);
app.use("/content/", content);
// Swagger config
const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Documentación de API",
      version: "0.1.0",
      description:
        "Esta API fue desarrollada como parte de una prueba técnica para Disruptive.",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Alberto Ocaranza",
        url: "",
        email: "fevilcorp@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:5050",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);
// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
