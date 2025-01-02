import { error500 } from "@/constants";
import { Request, Response } from "express";

const checkHealth = async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      message: "Server is running",
      data: null,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("~> Error :", error.message);
    } else {
      console.error("An unknown error occurred");
    }
    res.status(500).json(error500);
  }
};

export default checkHealth;
