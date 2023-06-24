import getSkuDetails from "./helper-functions";

describe("getSkuDetails", () => {
  beforeAll(() => {
    const stockMockData = JSON.stringify([
      { sku: "abc", stock: 100 },
      { sku: "xyz", stock: 100 },
    ]);
    const transactionsMockData = JSON.stringify([
      { sku: "abc", type: "order", qty: 10 },
      { sku: "xyz", type: "refund", qty: 10 },
    ]);
    const actual = jest.requireActual("./readFile.ts");
    const spy = jest.spyOn(actual, "default");

    spy.mockImplementation((filepath) => {
      return new Promise((resolve, reject) => {
        if (filepath === "./stock.json") {
          resolve(stockMockData);
        } else {
          resolve(transactionsMockData);
        }
      });
    });
  });
  test("should return the subtraction of stock and order", async () => {
    const result = await getSkuDetails("abc");
    expect(result).toStrictEqual({ sku: "abc", qty: 90 });
  });

  test("should return the addition of stock and refund", async () => {
    const result = await getSkuDetails("xyz");
    expect(result).toStrictEqual({ sku: "xyz", qty: 110 });
  });

  test("should throw an error when passed not found values", () => {
    expect(async () => await getSkuDetails("zzz")).rejects.toThrow();
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
});

