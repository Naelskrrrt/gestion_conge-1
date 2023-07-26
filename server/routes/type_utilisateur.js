import { Router } from "express";
import express from "express";
import { getData, createElement, getDataByID, updateData, deleteData } from "../database.js";


const router = express.Router()

router.get('/', (async (req, res) => {
    const user = await getData('SELECT * FROM type_utilisateur')
    res.send(user)
}))

router.post('/',(async (req, res) => {
    try {
        const insertQuery = `INSERT INTO 
        type_utilisateur (id_type_utilisateur, type_desc) 
        VALUES (?, ?)`

        const tabProp = [req.body.id_type_utilisateur, req.body.type_desc]


        const setInTable = await createElement(insertQuery, tabProp)
        res.send(setInTable)
    } catch (error) {
        console.error('Une erreur est survenue: ', error);
    }

}))

router.put('/:id', (async (req, res) => {
    try {
        // const verif = courses.find(c => c.id === parseInt(req.params.id))
        // if(!verif) res.status(404).send('Data Not Found')
        const id = req.params.id
        const updateQuery = `UPDATE type_utilisateur
                            SET \`type_desc\` = ?
                            WHERE id_type_utilisateur = ?;`

        const tabProp = [req.body.type_desc, id]

        const updateEntity = await updateData(updateQuery, tabProp)
        res.send(updateEntity)
    } catch (err) {
        console.log(err)
    }
}))


router.delete('/:id', (async (req, res) => {
    try {
        const id = req.params.id
        const deleteQuery = `DELETE FROM type_utilisateur
                                WHERE id_type_utilisateur = ?;`
        const tabProp = [id]
        const deleteEntity = await deleteData(deleteQuery, tabProp)
        res.send(deleteEntity)
    } catch (error) {
        console.error("Une erreur s'est produit: ", error)
    }
}))

// SEARCH BY ID
router.get('/:id', (async (req, res) => {
    const id = req.params.id
    const user = await getDataByID('type_utilisateur', id , 'id_type_utilisateur')
    res.send(user)
}))

export default router