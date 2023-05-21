import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { UserAttributes } from '../model/registerModel';
import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';
import { sendEmail } from '../utils/notifications';
import { FROM_ADMIN_MAIL } from '../config/mail';

const register = async (req: Request, res: Response) => {
  const {
    firstName,
    lastName,
    email,
    mentalCondition,
    country,
    state,
    gender,
    password,
    confirmPassword,
    otp,
    otp_expiry
  } = req.body;

  if (password !== confirmPassword) {
    return res.status(404).send('Password does not match');
  }

  try {
    const userExist = await User.findOne({ where: { email } });

    if (userExist) {
      return res.status(404).send('This User already exist');
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiry = new Date();
    otpExpiry.setMinutes(otpExpiry.getMinutes() + 10);

    const newUser: UserAttributes = await User.create({
      id: uuidv4(),
      firstName,
      lastName,
      email,
      mentalCondition,
      country,
      state,
      gender,
      password: encryptedPassword,
      otp,
      otp_expiry: otpExpiry,
      verify: false
    });

   console.log(newUser)

    const token = jwt.sign({ id: newUser.id, email }, process.env.JWT_TOKEN || 'SECRET-KEY', {
      expiresIn: '7d',
    });

    const sendMailToUser = sendEmail(FROM_ADMIN_MAIL, newUser.email, 'OTP VERIFICATION', `YOUR OTP IS ${newUser.otp}`);
    console.log(sendMailToUser);
    newUser.verify = true

    return res.status(201).json({
      userDetails: {
         firstName: newUser.firstName,
         lastName: newUser.lastName,
        email: newUser.email,
        mentalCondition: newUser.mentalCondition,
        country: newUser.country,
        state: newUser.state,
        gender: newUser.gender,
        token,
       },
     });
  } catch (err) {
    console.log(err);
    return res.status(500).send('Error occurred please try again');
  }
};

export default register;

