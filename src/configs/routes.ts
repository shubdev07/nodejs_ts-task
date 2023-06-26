import v1Router from "../api/v1";
import express from "express";

export default function (app: express.Application) {
  app.use("/api/v1", v1Router);
}

