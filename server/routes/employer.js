import { Router } from "express";
import express from "express";
import { getData, createElement, getDataByID, deleteData, updateData } from "../database.js";

const router = express.Router()

router.get('/', (async (req, res) => {
    const getter = await getData('SELECT * FROM employer')
    res.send(getter)
}))

router.post('/', (async (req, res) => {
    try {
        const insertQuery = `INSERT INTO
        employer (id_employe, nom_employe, prenom_employe, fonction_employe, num_phone, photo_employe, id_conger, id_type_utilisateur, id_sup_employe)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    
        const tabProp = [req.body.id_employe, req.body.nom_employe
                            , req.body.prenom_employe, req.body.fonction_employe
                            , req.body.num_phone , req.body.photo_employe, req.body.id_conger
                            , req.body.id_type_utilisateur, req.body.id_sup_employe]
    
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
        const updateQuery = `UPDATE utilisateur
                            SET \`nom_employe\` = ?,
                                \`prenom_employe\` = ?, 
                                \`fonction_employe\` = ?, 
                                \`num_phone\` = ?,
                                \`photo_employe\` = ?,
                                \`id_conger\` = ?,
                                \`id_type_utilisateur\` = ?,
                                \`id_sup_employe\` = ?,
                            WHERE id_employe = ?;`

        const tabProp = [req.body.nom_employe, req.body.prenom_employe,
                         req.body.fonction_employe, req.body.num_phone,
                         req.body.photo_employe, req.body.id_conger, 
                         req.body.id_type_utilisateur, req.body.id_sup_employe, id]

        const updateEntity = await updateData(updateQuery, tabProp)
        res.send(updateEntity)
    } catch (err) {
        console.log(err)
    }
}))


router.delete('/:id', (async (req, res) => {
    try {
        const id = req.params.id
        const deleteQuery = `DELETE FROM employer
                                WHERE id_employer = ?;`
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
    const user = await getDataByID('employer', id , 'id_employer')
    res.send(user)
}))


export default router