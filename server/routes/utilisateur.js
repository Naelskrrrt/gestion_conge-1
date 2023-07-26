import { Router } from "express";
import express from "express";
import { getData, createElement, getDataByID, updateData, deleteData } from "../database.js";

const router = express.Router()

router.get('/', (async (req, res) => {
    const user = await getData('SELECT * FROM utilisateur')
    res.send(user)
}))

router.post('/',(async (req, res) => {
    try {
        const insertQuery = `INSERT INTO 
        utilisateur (id_utilisateur, num_matricule, mot_de_passe, user_email, id_employe) 
        VALUES (?, ?, ?, ?, ?)`

        const tabProp = [req.body.id_utilisateur, req.body.num_matricule
                        , req.body.mot_de_passe, req.body.user_email
                        , req.body.id_employe]


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
        const updateQuery = `UPDATE utilisateur
                            SET \`num_matricule\` = ?,
                                \`mot_de_passe\` = ?, 
                                \`user_email\` = ?, 
                                \`id_employe\` = ?
                            WHERE id_utilisateur = ?;`

        const tabProp = [req.body.num_matricule, req.body.mot_de_passe, req.body.user_email, req.body.id_employe, id]

        const updateEntity = await updateData(updateQuery, tabProp)
        res.send(updateEntity)
    } catch (err) {
        console.log(err)
    }
}))


router.delete('/:id', (async (req, res) => {
    try {
        const id = req.params.id
        const deleteQuery = `DELETE FROM utilisateur
                                WHERE id_utilisateur = ?;`
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
    const user = await getDataByID('utilisateur', id , 'id_utilisateur')
    res.send(user)
}))

export default router

