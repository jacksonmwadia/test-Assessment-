import { Router } from "express";
import { checkUserDetails, loginUser } from "../contollers/auth.contriller";
import { verifyToken } from "../Middleware/verifyToken";

const auth_router = Router()


auth_router.post('/login', loginUser)
auth_router.post('/checkdetails',verifyToken, checkUserDetails)


export default auth_router