import mysql from "mysql2";
import dotenv from "dotenv";
import { query } from "express";

dotenv.config()

const pool = mysql.createPool ({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password:process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()


export async function getData(query){
    const [rows] = await pool.query(query)
    return rows
}

export async function getDataByID (entity, id, name_id){
    const [rows] = await pool.query(`
    SELECT * 
    FROM ${entity}
    WHERE ${name_id} = ${id}`)
    return rows
}

export async function createElement(insertQuery, propTab){
    const [result] = await pool.query(insertQuery, propTab)
    return result
}

export async function updateData(updateQuery, propTab){
    const [result] = await pool.query(updateQuery, propTab)
    return result
}

export async function deleteData(deleteQuery, propTab){
    const [result] = await pool.query(deleteQuery, propTab)
    return result
}