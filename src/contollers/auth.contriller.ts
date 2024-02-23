 import { Request, Response } from "express";
import mssql from "mssql";
import { sqlConfig } from "../config/sql.config";

import bcrypt from "bcrypt"
import  Jwt  from "jsonwebtoken";
import dotenv from "dotenv"
import { ExtendedUserRequest } from "../Middleware/verifyToken";


export const loginUser = async(req:Request, res:Response)=>{
    try {
        const{email, password} = req.body
        const pool = await mssql.connect(sqlConfig)
        let user = (await pool.request()
        .input("email" , email)
        .input("password", password)
        .execute("loginUser")).recordset

        // return res.json({user})
        console.log(user);  // console.log          
        

        if(user[0]?.email == email){
            const correct_pwd = await bcrypt.compare(password, user[0].password)

            if(!correct_pwd){
                return res.status(401).json({
                    error: "Incorrect password"
                })
            }

            const loginCredentials = user.map(response =>{
                const {password, ...rest} = response

                return rest
            })

            const token = Jwt.sign(loginCredentials[0], process.env.SECRET as string, {
                expiresIn: '3600s'
            })

            return res.status(200).json({
                message: "Logged in successfully",
                token
            })
        }
        } catch (error) {
            return res.sendStatus(501).json({
                error: "Internal server error"
            })
        }
    }

    export const checkUserDetails = async(req: ExtendedUserRequest, res: Response)=>{
        if(req.info){
            return res.json({
                info: req.info
            })
        }
    }

