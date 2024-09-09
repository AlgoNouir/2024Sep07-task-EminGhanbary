import express from "express";
import taskRoute from "./controllers/tasksController";
import helmet from "helmet";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";

// constants
const app = express();
const port = process.env.SERVER_PORT || 8000;
// -------------------------------------------------- MIDDLEWARES
// show request log
app.use(express.json());
app.use(morgan("tiny"));
// set security options
app.use(helmet());
// disable body for unsafe method types
app.use((req, res, next) => {
  if (["GET", "DELETE"].includes(req.method) && Object.keys(req.body).length)
    return res.status(422).json({ error: "method not allowed to have body" });
  next();
});

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);
// -------------------------------------------------- ROUTING
app.use("/tasks", taskRoute);
app.get("/online", (_, res) => res.status(200).json({ online: true }));
// start proejct
app.listen(port, () =>
  console.log(`server is running on http://127.0.0.1:${port}`)
);
