import { Router } from "express";
import express from "express";
import { getData, createElement, getDataByID, updateData, deleteData } from "../database.js";


const router = express.Router()

router.get('/', (async (req, res) => {
    const getter = await getData('SELECT * FROM solde_conger')
    res.send(getter)
}))

router.post('/',(async (req, res) => {
    try {
        const insertQuery = `INSERT INTO 
        solde_conger (id_solde, ajout_mois, cumul_jours) 
        VALUES (?, ?, ?)`

        const tabProp = [req.body.id_solde, req.body.ajout_mois, req.body.cumul_jours]


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
        const updateQuery = `UPDATE solde_conger
                            SET \`ajout_mois\` = ?, 
                                \`cumul_jours\` = ?
                            WHERE id_solde = ?;`

        const tabProp = [req.body.ajout_mois, req.body.cumul_jours, id]

        const updateEntity = await updateData(updateQuery, tabProp)
        res.send(updateEntity)
    } catch (err) {
        console.log(err)
    }
}))


router.delete('/:id', (async (req, res) => {
    try {
        const id = req.params.id
        const deleteQuery = `DELETE FROM solde_conger
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
    const user = await getDataByID('solde_conger', id , 'id_solde')
    res.send(user)
}))


export default router