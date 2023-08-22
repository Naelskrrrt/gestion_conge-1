import bcrypt, { hash } from "bcrypt"
import { Router } from "express";
import Joi from "joi";
import mysql from "mysql2"
import { query } from "express";
import express from "express";
import { getData, createElement, getDataByID, updateData, deleteData } from "../database.js";

const schema = Joi.object({
    // id_utilisateur: Joi.number().min(1).max(255).required(),
    num_matricule: Joi.string().min(1).max(1000).required(),
    id_type_utilisateur: Joi.number().min(1).max(1000).required(),
    email_user: Joi.string().min(5).max(255).required().email(),
    password_user: Joi.string().min(5).max(1024).required(),
    id_employe: Joi.number().min(1).max(100).required()   
  });

const router = express.Router()

router.get('/', (async (req, res) => {
    const user = await getData('SELECT id_utilisateur, num_matricule, email_user, utilisateur.id_employe, employee.nom_employe, employee.prenom_employe, employee.fonction_employe, type_desc FROM `utilisateur` JOIN employee ON utilisateur.id_employe = employee.id_employe JOIN type_utilisateur ON utilisateur.id_type_utilisateur = type_utilisateur.id_type_utilisateur;')
    res.send(user)
}))

router.post('/',(async (req, res) => {
    
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try {
        // const [rows] = await getData('SELECT * FROM utilisateur WHERE email_user = 2', [req.body.email]);
        // if (rows.length > 0) return res.status(400).send('User already registered');

        const insertQuery = `INSERT INTO 
        utilisateur (num_matricule,password_user, email_user, id_type_utilisateur, id_employe) 
        VALUES (?, ?, ?, ?, ?)`

        let salt = await bcrypt.genSalt(10)
        let passwordHashed = await bcrypt.hash(req.body.password_user, salt)
        
        const tabProp = [ req.body.num_matricule
                         ,passwordHashed, req.body.email_user
                        , req.body.id_type_utilisateur, req.body.id_employe]

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
                                \`password_user\` = ?, 
                                \`email_user\` = ?, 
                                \`id_employe\` = ?
                            WHERE id_utilisateur = ?;`

        const tabProp = [req.body.num_matricule, req.body.password_user, req.body.email_user, req.body.id_employe, id]

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

