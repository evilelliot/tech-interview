import express from "express";
import cors from "cors";
import records from "./routes/record.js";
import users from "./routes/user.js";
import categories from "./routes/category.js";
import topics from "./routes/topics.js";
import content from "./routes/content.js"

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/record", records);
app.use("/user/", users);
app.use("/category/", categories);
app.use("/topic/", topics);
app.use("/content/", content);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
