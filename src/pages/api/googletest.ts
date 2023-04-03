import { type NextApiRequest, type NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await Promise.resolve();
  res.status(200).json({ name: "John Doe" });
}
