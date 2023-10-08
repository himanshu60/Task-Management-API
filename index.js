const express = require("express");
require("dotenv").config();
const { connection } = require("./config/db");
const { userRouter } = require("./routes/userRoutes");
const { taskRouter } = require("./routes/taskRoutes");
const { Limiter } = require("./controllers/rateLimiter");
const { auth } = require("./middleware/auth");

const app = express();
app.use(express.json());

app.use(Limiter);
app.use("/user", userRouter);
app.use(auth);
app.use("/task", taskRouter);

app.listen(process.env.PORT, async (req, res) => {
  try {
    await connection;
    console.log(`connected to mongoDB`);
  } catch (error) {
    console.log(`error:${error.message}`);
  }
  console.log(`server starting at port ${process.env.PORT}`);
});
