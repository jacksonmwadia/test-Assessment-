import { Router } from "express";
import { createUser, deleteUser, getOneUser, getUsers, updateUser } from "../contollers/user.contoller";
import { verifyToken } from "../Middleware/verifyToken";

const userRoute = Router()
userRoute.post('/',createUser)
userRoute.get('/',getUsers)
userRoute.put('/update/:id', updateUser)
userRoute.delete('/delete/:id', deleteUser)
userRoute.get('/:id', getOneUser)

export default userRoute