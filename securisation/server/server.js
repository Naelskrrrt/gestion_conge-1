import express, { response } from "express";
import mysql from "mysql"
import cors from 'cors'
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import cookieParser from "cookie-parser";

const salt = 10

const app= express()
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5174/"],
    methods: ["POST", "GET"],
    credentials: true
}))
app.use(cookieParser())


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: 'signup'
})

app.post('/register', (req, res) => {
    const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?)"
    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if(err) return res.json({msg: "Error for hashing password"})
        const values = [
            req.body.name,
            req.body.email,
            hash
        ]
        db.query(sql, [values], (err, result) => {
            if(err) return res.json({Err: "Insering data error in server"})
            return res.json({Status: "Success"})
        })
    })
    
})

app.post('/login', (req, res) => {
    const sql = 'SELECT * FROM login WHERE email = ?'
    db.query(sql, [req.body.email], (err, data) => {
        if(err) return res.json({msg: "Login error in server"})
        if(data.length > 0){
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
                if(err) return res.json({msg: "Password compare error"})
                if(response){
                    const name = data[0].name;
                    const token = jwt.sign({name}, "jwt-secret-key", {expiresIn: '1d'})
                    res.cookie('token', token)
                    return res.json({Status: "Success"})
                } else {
                    return res.json({Error: "Password not matched"})
                }

            })
        } else {
            return res.json({Error: "No email exist"})
        }
    })
})

app.listen(8081, () => {
    console.log("Running on port: http://localhost:8081");
})
