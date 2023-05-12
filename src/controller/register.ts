import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { UserAttributes } from '../model/registerModel';
import { v4 as uuidv4 } from 'uuid';

const register = async (req: Request, res: Response) => {
  const { firstName, lastName, email, mentalCondition, country, state, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(404).send('Password does not match');
  }

  try {
    const userExist = await User.findOne({ where: { email } });

    if (userExist) {
      return res.status(404).send('This User already exist');
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser: UserAttributes = await User.create({
      id: uuidv4(),
      firstName,
      lastName,
      email,
      mentalCondition,
      country,
      state,
      password: encryptedPassword,
    });

    const token = jwt.sign({ id: newUser.id, email }, process.env.JWT_TOKEN || 'SECRET-KEY', {
      expiresIn: '7d',
    });

    return res.status(201).json({
      userDetails: {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        mentalCondition: newUser.mentalCondition,
        country: newUser.country,
        state: newUser.state,
        token,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send('Error occurred please try again');
  }
};

export default register;
