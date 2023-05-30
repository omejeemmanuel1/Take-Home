import jwt, { Secret } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const authenticatedUser = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const jwtSecret = process.env.JWT_SECRET_KEY as Secret;
    const decodedToken = jwt.verify(token, jwtSecret) as { id: string };
    req.user = { id: decodedToken.id }; // Set the 'id' property on req.user
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: 'Invalid token' });
  }
};

export { authenticatedUser };
