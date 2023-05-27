import Post, { PostAttributes } from '../model/postModel';
import User from '../model/registerModel';
import { Request, Response } from 'express';


const blockAccountFromPost = async (req: Request | any, res: Response) => {
    try {
        const blockerid = req.user.id
        const { id } = req.params

        const { userId } = await Post.findOne({ where: { id: id } }) as unknown as PostAttributes
     
        const blocker = await User.findOne({ where: { id: blockerid } })

        const array = blocker?.blocked
        array?.push(userId)
            	
        const updatedblocker = blocker?.update({
            blocked: array
        })
        return res.status(200).json({ message: "User blocked successfully",updatedblocker })
    
    }
	catch(error){
       console.log (error)  
      res.status(500).json({message:"Internal Server Error"})
	}
}

export default blockAccountFromPost