const jwt = require('jsonwebtoken');
import { Request, Response } from 'express';

const authenticatedUser = (req: Request, res: Response, next: any) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decodedToken = jwt.verify(token, 'SECRET-KEY');
    req.user = decodedToken.id;
    next();
  } catch (err) {
    console.log(err);
  }
};

module.exports = { authenticatedUser };
