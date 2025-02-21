import express, { Response, NextFunction } from "express";
import { User, UserRequest } from "./types";
import readUsers from "./readUsers";
import writeUsers from "./writeUsers";
import cors from "cors";

// Initialize express application
const app = express();
const port = 8000;

// Enable CORS for frontend communication
app.use(cors({ origin: "http://localhost:3000" }));

// In-memory storage for users
let users: User[] = [];

/**
 * Middleware function to add users data to the request object
 * @param {UserRequest} req - Express request object with User type
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 */
const addMsgToRequest = (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  if (users) {
    console.log("Adding users to request");
    req.users = users;
    next();
  } else {
    return res.json({
      error: { message: "Users not found", status: 404 },
    });
  }
};

// Apply middleware
app.use(addMsgToRequest);
app.use("/read", readUsers);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/write", writeUsers);

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
