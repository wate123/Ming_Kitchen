// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from "fs";
import path from "path";
export default function handler(req, res) {
  const items = fs.readFileSync(
    path.join(process.cwd(), "pages/api/data.json")
  );
  res.status(200).json(items);
}
