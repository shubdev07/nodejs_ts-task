import path from "path";
import readFileAsync from "../../../libs/readFile";

// Specify the file path
const stockFilePath = path.join(__dirname, "..", "..", "..", "stock.json");
const transactionFilePath = path.join(
  __dirname,
  "..",
  "..",
  "..",
  "transactions.json"
);

interface Stock {
  sku: string;
  stock: number;
}

interface Transaction {
  sku: string;
  type: string;
  qty: number;
}

const getSkuDetails = async (
  sku: string
): Promise<{ sku: String; qty: number } | Error> => {
  let stockData: Stock[] = [];
  let transactionsData: Transaction[] = [];
  try {
    // Read the file
    stockData = JSON.parse(await readFileAsync(stockFilePath));
    transactionsData = JSON.parse(await readFileAsync(transactionFilePath));
    const result = {
      sku,
      qty: 0,
    };
    stockData.some((data) => {
      if (data.sku === sku) {
        result.qty = data.stock;
        return true;
      }
    });
    let isFound = false;
    transactionsData.forEach((data) => {
      if (data.sku === sku) {
        isFound = true;
        if (data.type === "refund") {
          result.qty += data.qty;
        } else if (data.type === "order") {
          result.qty -= data.qty;
        }
      }
    });
    if (isFound === false) {
      throw new Error("Not found");
    }
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default getSkuDetails;

