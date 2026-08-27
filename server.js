// Responsible for starting the HTTP server

import app from "./app.js";

const PORT = process.env.PORT;

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`App listening on port ${PORT}.`);
});
