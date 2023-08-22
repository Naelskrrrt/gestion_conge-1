import { Router } from "express";
import express from "express";
import { getData, createElement, getDataByID, updateData, deleteData } from "../database.js";


const router = express.Router()

router.get('/', (async (req, res) => {
    const user = await getData('SELECT * FROM type_congee')
    res.send(user)
}))

router.post('/',(async (req, res) => {
    try {
        const insertQuery = `INSERT INTO 
        type_conger (id_type_congee, type_congee_desc, avance_demande, duree_normale) 
        VALUES (?, ?, ?, ?)`

        const tabProp = [req.body.id_type_conger, req.body.type_conger_desc, req.body.avance_demande, req.body.duree_normale]


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
        const updateQuery = `UPDATE type_congee
                            SET \`type_congee_desc\` = ?,
                                \`avance_demande\` = ?, 
                                \`duree_normale\` = ?
                            WHERE id_type_congee = ?;`

        const tabProp = [req.body.type_conger_desc, req.body.avance_demande, req.body.duree_normale, id]

        const updateEntity = await updateData(updateQuery, tabProp)
        res.send(updateEntity)
    } catch (err) {
        console.log(err)
    }
}))


router.delete('/:id', (async (req, res) => {
    try {
        const id = req.params.id
        const deleteQuery = `DELETE FROM type_congee
                                WHERE id_type_congee = ?;`
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
    const user = await getDataByID('type_congee', id , 'id_type_congee')
    res.send(user)
}))

export default router