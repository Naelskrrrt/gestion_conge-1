import { Router } from "express";
import express from "express";
import { getData, createElement, getDataByID, deleteData, updateData } from "../database.js";

const router = express.Router()

router.get('/', (async (req, res) => {
    const getter = await getData(
        `
        SELECT 
            congee.id_conger,
            nom_employe, 
            fonction_employe, 
            statut_conger,
            utilisateur.email_user, 
            DATE_FORMAT(date_deb, '%Y-%m-%d') AS date_deb, 
            DATE_FORMAT(date_fin, '%Y-%m-%d') AS date_fin,
            DATEDIFF(date_fin, date_deb) as duree, 
            type_congee.type_congee_desc
        FROM congee
        JOIN employee ON congee.id_employe = employee.id_employe
        JOIN type_congee ON congee.id_type_congee = type_congee.id_type_congee
        JOIN utilisateur ON employee.id_employe = utilisateur.id_employe;
        `
    )
    console.log(getter)
    // dateString.split('T')[0]
   
    res.send(getter)
}))

router.post('/', (async (req, res) => {
    try {
        const insertQuery = `INSERT INTO
        congee ( motif_conger, date_deb, date_fin, id_type_congee)
        VALUES (?, ?, ?, ?)`
    
        const tabProp = [req.body.motif_conger
                            , req.body.date_deb
                            , req.body.date_fin, req.body.id_type_congee
                        ]
    
        const setInTable = await createElement(insertQuery, tabProp)
        res.send(setInTable)
    } catch (err) {
        console.error('Une erreur est survenue: ', err)
    }

}))

router.put('/validation/:id', (async (req, res) => {
    try {
        const id = req.params.id
        const updateDataQuery = `UPDATE conger SET \`statut_conger\` = ? WHERE id_conger = ?`
        const tabProp = [req.body.statut_conger, id]

        const updateEntity = await updateData(updateDataQuery, tabProp)
        res.send(updateEntity)
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: "Erreur de la part du serveur... Veuiller contacter l'administrateur"})
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
        const deleteQuery = `DELETE FROM congee
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