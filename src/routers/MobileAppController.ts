import express, { Request, Response } from "express";
import { Rollbar } from "../helpers/Rollbar";
import MobileVersionDb from "../schema/MobileVersionSchema";

const router = express.Router();

router.get("/versions", async (req: Request, res: Response) => {
  try {
    await MobileVersionDb.findOne({
      appId: req.query["appId"],
    })
      .then((mobileVersion) => {
        return res.status(200).json({ data: mobileVersion });
      })
      .catch((error) => {
        return res.status(500).json({ message: error });
      });
  } catch (error) {
    Rollbar.error(error as unknown as Error, req);
    return res
      .status(500)
      .json({ message: (error as unknown as Error).message });
  }
});

export { router as mobileRouter };
