import express from "express";

export default function (app: express.Application) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
}

