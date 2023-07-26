import { Router } from "express";
import express from "express";
import { getData, createElement, getDataByID, deleteData, updateData } from "../database.js";

const router = express.Router()

router.get('/', (async (req, res) => {
    const getter = await getData('SELECT * FROM disposer')
    res.send(getter)
}))

router.post('/',(async (req, res) => {
    try {
        const insertQuery = `INSERT INTO 
        disposer (id_disposition, id_employe, id_solde) 
        VALUES (?, ?, ?)`

        const tabProp = [req.body.id_disposition, req.body.id_employe, req.body.id_solde]


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
        const updateQuery = `UPDATE disposer
                            SET \`id_employe\` = ?,
                                \`id_solde\` = ?
                            WHERE id_disposition = ?;`

        const tabProp = [req.body.id_employe, req.body.id_solde, id]

        const updateEntity = await updateData(updateQuery, tabProp)
        res.send(updateEntity)
    } catch (err) {
        console.log(err)
    }
}))


router.delete('/:id', (async (req, res) => {
    try {
        const id = req.params.id
        const deleteQuery = `DELETE FROM disposer
                                WHERE id_disposition = ?;`
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
    const user = await getDataByID('disposer', id , 'id_disposition')
    res.send(user)
}))


export default router