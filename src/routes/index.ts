import express, {Request, Response, NextFunction} from 'express';
import userModel from '../model/registerModel';

const router = express.Router();

/* GET home page. */
// router.post("/testrun", async function (req: Request, res: Response, next) {
//   const { email } = req.body
  
//   const user = await userModel.create({
//     email
//   })
//   res.status(200).json({ user });
// });

export default router
