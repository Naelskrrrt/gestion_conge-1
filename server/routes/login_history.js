import { Router } from "express";
import express from "express";
import { getData, createElement, getDataByID, updateData, deleteData } from "../database.js";


const router = express.Router()

router.get('/', (async (req, res) => {
    const history = await getData('SELECT * FROM login_history')
    res.send(history)
}))

router.post('/',(async (req, res) => {
    try {
        const insertQuery = `INSERT INTO 
        login_history (derniere_connection, id_utilisateur) 
        VALUES (?, ?)`

        
        const tabProp = [req.body.derniere_connection, req.body.id_utilisateur]
        console.log(tabProp)

        const setInTable = await createElement(insertQuery, tabProp)
        res.send(setInTable)
    } catch (error) {
        res.send('Une erreur est survenue: ');
    }

}))
export default router