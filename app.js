const http = require('http');
const express = require('express');
require('dotenv').config();
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USERRRRR,
    password: process.env.PASSWORD,
    database: process.env.DBNAME
})

connection.connect((err) => {
    if(err) {
        console.log('ERROR:', err);
    }
    console.log('Conexion establecida');
})

const router = express();

router.get('/producto', (req, res) => {
    connection.query('SELECT * FROM producto', (err, result) => {
        if(err) {
            console.log('Error al obtener productos');
            return res.status(500).send('error en el servidor');
        }
        res.json(result);
    });
});

router.use(express.json());
router.post('/producto', (req, res) => {
    const {nombre, precio} = req.body;
    connection.query(`INSERT INTO producto(nombre, precio) VALUES("${nombre}", "${precio}");`, (err, result) => {
        if(err){
            console.log("Error desde POST:" , err);
            return res.status(500).send('ERROR en el servidor');
        }
        return res.status(200).send('Usuario agregado correctamente');
    })
})

router.put('/producto', (req, res) => {
    const {id, nombre, precio} = req.body;
    connection.query(`UPDATE producto SET nombre = "${nombre}", precio = "${precio}" WHERE id = ${id};`, (err, result) => {
        if(err){
            console.log("Error desde PUT:" , err);
            return res.status(500).send('ERROR en el servidor');
        }
        return res.status(200).send('Usuario actualizado correctamente');
    })
})

router.delete('/producto', (req, res) => {
    const {id} = req.body;
    connection.query(`DELETE FROM producto WHERE id = ${id};`, (err, result) => {
        if(err){
            console.log("Error desde DELETE:" , err);
            return res.status(500).send('ERROR en el servidor');
        }
        return res.status(200).send('Usuario eliminado correctamente');
    })
})

process.on('SIGINT', () => {
    connection.end();
    process.exit();
});

router.listen(8888, 'localhost', () => {
    console.log('El servidor esta escuchando');
})

