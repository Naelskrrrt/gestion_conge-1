import bcrypt, { hash } from "bcrypt"
import { Router } from "express";
import Joi from "joi";
import mysql from "mysql2"
import { query } from "express";
import express from "express";
import { getData, createElement, getDataByID, updateData, deleteData } from "../database.js";

const schema = Joi.object({
    num_matricule: Joi.string().min(5).max(50).required(),
    user_email: Joi.string().min(5).max(255).required().email(),
    mot_de_passe: Joi.string().min(5).max(1024).required(),
    id_employe: Joi.number().min(1).max(3).required()
  });

const router = express.Router()

router.get('/', (async (req, res) => {
    const user = await getData('SELECT id_utilisateur, num_matricule, user_email, utilisateur.id_employe, employer.nom_employe, employer.fonction_employe, employer.num_phone FROM `utilisateur` JOIN employer ON utilisateur.id_employe = employer.id_employe;')
    res.send(user)
}))

router.post('/',(async (req, res) => {
    
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try {
        // const [rows] = await getData('SELECT * FROM utilisateur WHERE user_email = 2', [req.body.email]);
        // if (rows.length > 0) return res.status(400).send('User already registered');

        const insertQuery = `INSERT INTO 
        utilisateur (id_utilisateur, num_matricule, mot_de_passe, user_email, id_employe) 
        VALUES (?, ?, ?, ?, ?)`

        let salt = await bcrypt.genSalt(10)
        let passwordHashed = await bcrypt.hash(req.body.mot_de_passe, salt)
        
        const tabProp = [req.body.id_utilisateur, req.body.num_matricule
                        , passwordHashed, req.body.user_email
                        , req.body.id_employe]

        const setInTable = await createElement(insertQuery, tabProp)
        res.send(setInTable)

    } catch (error) {
        console.error('Une erreur est survenue: ', error);
        res.status(500).send("Server Error")
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

