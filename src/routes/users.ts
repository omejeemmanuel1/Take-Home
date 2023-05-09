import express,{Response, Request } from'express';
const router = express.Router();

/* GET users listing. */
router.get('/test', function(req:Request, res:Response, next) {
  res.status(200).json({ msg: "Users Working well" });
});

export default router;
