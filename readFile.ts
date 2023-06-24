import fs from "fs";

async function readFileAsync(filePath: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

export default readFileAsync;

