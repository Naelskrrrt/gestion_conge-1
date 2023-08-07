import express from "express";
// import {createElement, getData, getDataByID} from "./database.js"

// ROUTES CRUD
import utilisateur from "./routes/utilisateur.js";
import type_utilisateur from "./routes/type_utilisateur.js"
import disposer from "./routes/disposer.js"
import employer from "./routes/employer.js"
import conger from "./routes/conger.js"
import solde_conger from "./routes/solde_conger.js"
import type_conger from "./routes/type_conger.js"
import cors from 'cors'
// import auth from "./routes/auth.js"



const app = express()
const port = 8080
app.use(cors())
app.use(express.json())
app.use('/utilisateur', utilisateur)
app.use('/type_utilisateur', type_utilisateur)
app.use('/disposer', disposer)
app.use('/employer', employer)
app.use('/conger', conger)
app.use('/solde_conger', solde_conger)
app.use('/type_conger', type_conger)
// app.use('/auth', auth)









app.get('/', (async (req, res) => {
    res.send('Vous etes connecté')
}))

app.listen(port, () => console.log(`App listen on port: http://localhost:8080`))