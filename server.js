// Responsible for starting the HTTP server
import morgan from "morgan";
import app from "./app.js";

const PORT = process.env.PORT;

app.use(morgan(dev));

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`App listening on port ${PORT}.`);
});
