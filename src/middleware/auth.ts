import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../model/registerModel';

const jwtSecret = process.env.JWT_SECRET_KEY as string;

export async function auth(req: Request | any, res: Response, next: NextFunction): Promise<unknown> {
  try {
    const authorization = req.cookies.token;

    if (!authorization) {
        return res.status(401).json({Error: 'Kindly login as a user'})
    }

    let verified: { id: string } | null = null;
    try {
      verified = jwt.verify(authorization, jwtSecret) as { id: string } | null;
    } catch (error) {
        res.status(401).json({Error:"Token not valid"})
    }

    if (!verified) {
        return res.status(401).json({Error: "Invalid token, you are not authorized to access this route"})
    }

    const { id } = verified;

    // Find user by id
    const user = await User.findOne({ where: { id } });

    if (!user) {
        return res.status(401).json({Error:"Kindly login correct details as a user "})
    }

    req.user = verified;
    next();
  } catch (error) {
    res.status(401).json({Error:"User not authenticated, please login first."})
  }
}
