
import { Request, Response } from "express";
import { v4 } from 'uuid'
import { User } from "../interface/user";
import { sqlConfig } from "../config/sql.config";
import mssql from "mssql"
import bcrypt from "bcrypt"
import { registerUserSchema } from "../validators/user.validators";

const users: User[] = []

export const createUser = async (req: Request, res: Response) => {
    try {
        const id = v4()
        const {
            fname, lname, CohortNo, email, phoneNumber, gender, password
        }: User = req.body;

        const hashed_pwd = await bcrypt.hash(password, 4)

        let { error } = registerUserSchema.validate(req.body)

        if (error) {
            return res.status(404).json({
                error: error.details[0].message
            })
        }

        const pool = await mssql.connect(sqlConfig)
        let results = (await pool.request()
            .input("user_id", mssql.VarChar, id)
            .input("fname", mssql.VarChar, fname)
            .input("lname", mssql.VarChar, lname)
            .input("CohortNo", mssql.Int, CohortNo)
            .input("email", mssql.VarChar, email)
            .input("phoneNumber", mssql.VarChar, phoneNumber)
            .input("gender", mssql.VarChar, gender)
            .input("password", mssql.VarChar, hashed_pwd)
            .execute("registerUser")).rowsAffected

        console.log(results);

        return res.json({
            message: "Account Created Successfully",
        });
    } catch (error) {
        return res.json({ error });
    }
}

export const getUsers = async (req: Request, res: Response) => {
    try {
        const pool = await mssql.connect(sqlConfig);
        let allUsers = (await pool.request().execute("getAllUsers")).recordset

        return res.status(200).json({
            users: allUsers
        });
    } catch (error) {
        return res.json({ error });
    }
}

export const getOneUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const pool = await mssql.connect(sqlConfig);
        let user = (await pool.request().input("user_id", id).execute("getOneUser")).recordset
        return res.json({ user })
    } catch (error) {
        return res.json({ error });
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const {
            fname, lname, CohortNo, email, phoneNumber, gender
        }: User = req.body;

        const pool = await mssql.connect(sqlConfig);
        let results = (await pool.request()
            .input("user_id", mssql.VarChar, id)
            .input("fname", mssql.VarChar, fname)
            .input("lname", mssql.VarChar, lname)
            .input("CohortNo", mssql.Int, CohortNo)
            .input("email", mssql.VarChar, email)
            .input("phoneNumber", mssql.VarChar, phoneNumber)
            .input("gender", mssql.VarChar, gender)
            .execute("updateUser")).rowsAffected

        return res.status(200).json({
            message: "User Updated Successfully"
        });
    } catch (error) {
        return res.json({ error });
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const pool = await mssql.connect(sqlConfig);
        let results = (await pool.request().input("user_id", mssql.VarChar, id).execute("deleteUser")).rowsAffected

        console.log(results[0]);
        if (results[0] == 0) {
            return res.status(201).json({
                error: "User not found"
            })
        } else {
            return res.status(200).json({
                message: "Account deleted successfully"
            })
        }
    }
    catch (error) {
        return res.json({ error });
    }
}

