import { Router } from "express";
import express from "express";
import { getData, createElement, getDataByID, deleteData, updateData } from "../database.js";

const router = express.Router()

router.get('/', (async (req, res) => {
    const getter = await getData('SELECT * FROM conger')
    res.send(getter)
}))

router.post('/', (async (req, res) => {
    try {
        const insertQuery = `INSERT INTO
        conger (id_conger, motif_conger, statut_conger, date_deb, date_fin, id_type_conger, date_modif)
        VALUES (?, ?, ?, ?, ?, ?, ?)`
    
        const tabProp = [req.body.id_conger, req.body.motif_conger
                            , req.body.statut_conger, req.body.date_deb
                            , req.body.date_fin, req.body.id_type_conger
                            , req.body.date_modif]
    
        const setInTable = await createElement(insertQuery, tabProp)
        res.send(setInTable)
    } catch (err) {
        console.error('Une erreur est survenue: ', err)
    }

}))

router.put('/:id', (async (req, res) => {
    try {
        // const verif = courses.find(c => c.id === parseInt(req.params.id))
        // if(!verif) res.status(404).send('Data Not Found')
        const id = req.params.id
        const updateQuery = `UPDATE conger
                            SET \`motif_conger\` = ?,
                                \`statut_conger\` = ?, 
                                \`date_deb\` = ?, 
                                \`date_fin\` = ?,
                                \`id_type_conger\` = ?,
                                \`date_modif\` = ?
                            WHERE id_conger = ?;`

        const tabProp = [req.body.motif_conger, req.body.statut_conger
                        , req.body.date_deb, req.body.date_fin, req.body.id_type_conger
                        , req.body.date_modif, id]

        const updateEntity = await updateData(updateQuery, tabProp)
        res.send(updateEntity)
    } catch (err) {
        console.log(err)
    }
}))


router.delete('/:id', (async (req, res) => {
    try {
        const id = req.params.id
        const deleteQuery = `DELETE FROM conger
                                WHERE id_conger = ?;`
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
    const user = await getDataByID('conger', id , 'id_conger')
    res.send(user)
}))


export default router