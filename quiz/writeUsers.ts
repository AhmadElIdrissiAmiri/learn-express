import express, { Response } from "express";
import path from "path";
import { promises as fsPromises } from "fs";
import { UserRequest } from "./types";

const router = express.Router();
const writeFile = "../data/users.json";

/**
 * POST route that adds a new user to the list and saves it to a file
 * @param {UserRequest} req - Express request object containing user data
 * @param {Response} res - Express response object
 */
router.post("/adduser", async (req: UserRequest, res: Response) => {
  try {
    let newuser = req.body;
    req.users?.push(newuser);

    await fsPromises.writeFile(
      path.resolve(__dirname, writeFile),
      JSON.stringify(req.users)
    );

    console.log("User Saved");
    res.send("done");
  } catch (err) {
    console.log("Failed to write:", err);
    res.status(500).send("Error saving user");
  }
});

export default router;
