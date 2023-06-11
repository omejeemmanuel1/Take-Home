import Joi from 'joi'

export const loginUserSchema = Joi.object().keys({
    email: Joi.string().email().trim().lowercase().required(),
    password: Joi.string().trim().regex(/^[a-zA-Z0-9]{3,30}$/).required()
})


export const createPostSchema = Joi.object().keys({
    postContent: Joi.string().allow('').optional(),
    image: Joi.array().items(Joi.string()).optional(),
    video: Joi.array().items(Joi.string()).allow('').optional(),
    file: Joi.array().items(Joi.string()).allow('').optional(),
    groupId: Joi.string().allow('').optional(),
  });
  

export const updatePostSchema = Joi.object().keys({
    postContent: Joi.string().required()
})

export const options = {
    abortEarly:false,
    errors:{
        wrap:{
            label:''
        }
    }
}
