import express, { Request, Response } from "express";
import getSkuDetails from "./helper-functions";

interface RequestParams {}
interface ResponseBody {}
interface RequestBody {}
interface RequestQuery {
  sku: string;
}

// Create Express app
const app = express();

// Define a route handler for the default route
app.get(
  "/",
  async (
    req: Request<RequestParams, ResponseBody, RequestBody, RequestQuery>,
    res: Response
  ) => {
    const { sku } = req.query;
    try {
      const data = await getSkuDetails(sku);
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: "Not found" });
    }
  }
);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

