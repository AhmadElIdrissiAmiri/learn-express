import express, { Response } from "express";
import { UserRequest } from "./types";

const router = express.Router();

/**
 * GET route that sends the usernames of the users to the client
 * @param {UserRequest} req - Express request object with User type
 * @param {Response} res - Express response object
 */
router.get("/usernames", (req: UserRequest, res: Response) => {
  let usernames = req.users?.map((user) => {
    return { id: user.id, username: user.username };
  });
  res.send(usernames);
});

/**
 * GET route that returns a specific user's email based on the username
 * @param {UserRequest} req - Express request object with User type
 * @param {Response} res - Express response object
 */
router.get("/username/:name", (req: UserRequest, res: Response) => {
  let name = req.params.name;
  let user_with_name = req.users?.filter(function (user) {
    return user.username === name;
  });
  if (user_with_name?.length === 0) {
    res.send({
      error: { message: `${name} not found`, status: 404 },
    });
  } else {
    res.send(user_with_name);
  }
});

export default router;
