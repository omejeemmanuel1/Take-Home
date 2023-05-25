import { Request, Response } from 'express';
import Group, { GroupAttributes} from '../model/groupModel';


export const getAllGroups = async (req: Request, res: Response) => {
try {
const group = await Group.findAll()
return res.status(200).json({
message: ' All group have been successfully fetch',
result: group
});
}catch(err){
console.error(err)
return res.status(500).json({
    error: err
    
})
}
}