import joi from "joi";

export const registerUserSchema = joi.object({
    fname: joi.string().max(50).required(),
    lname: joi.string().max(50).required(),
    CohortNo: joi.number().integer().required(),
    email: joi.string().max(100).email().required(),
    phoneNumber: joi.string().max(20),
    gender: joi.string().max(10),
    password: joi.string().max(100).required()
});
