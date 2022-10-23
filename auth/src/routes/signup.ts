import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";

import { validateRequest } from "../middlewares/validate-request";
import { User } from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 8, max: 28 })
      .withMessage("Password must be between 8 and 28 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email in use");
    }

    const user = User.build({ email, password });
    await user.save();

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_KEY!
    );

    // Store it on session object
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
