import { Request, Response } from "express";
import getSkuDetails from "../SKU/SKU.service";

interface RequestParams {}
interface ResponseBody {}
interface RequestBody {}
interface RequestQuery {
  sku: string;
}

export async function getSKUQty(
  req: Request<RequestParams, ResponseBody, RequestBody, RequestQuery>,
  res: Response
) {
  const { sku } = req.query;
  try {
    const data = await getSkuDetails(sku);
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Some error occurred" });
  }
}

