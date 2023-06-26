import express from "express";
import CONFIGURATION from "./configs/app";
import expressConfigs from "./configs/express";
import routeConfigs from "./configs/routes";

const app = express();

expressConfigs(app);
routeConfigs(app);

// Start the server
app.listen(CONFIGURATION.PORT, () => {
  console.log(`Server running on port ${CONFIGURATION.PORT}`);
});

