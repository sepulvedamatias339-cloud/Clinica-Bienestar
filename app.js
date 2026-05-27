const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

let pacientes = [];

// LOGIN
app.get('/', (req, res) => {

    res.render('login');

});

// LOGIN
app.post('/login', (req, res) => {

    const correo = req.body.correo;
    const password = req.body.password;

    if(correo === 'admin@clinica.com' && password === '1234'){

        res.redirect('/dashboard');

    }else{

        res.send('Credenciales incorrectas');

    }

});

// DASHBOARD
app.get('/dashboard', (req, res) => {

    res.render('dashboard', {
        pacientes: pacientes
    });

});

// AGREGAR
app.get('/agregar', (req, res) => {

    res.render('agregar');

});

// GUARDAR
app.post('/agregar', (req, res) => {

    pacientes.push({
        id: pacientes.length + 1,
        nombre: req.body.nombre,
        correo: req.body.correo
    });

    res.redirect('/dashboard');

});

// ELIMINAR
app.get('/eliminar/:id', (req, res) => {

    const id = parseInt(req.params.id);

    pacientes = pacientes.filter(paciente => paciente.id !== id);

    res.redirect('/dashboard');

});

app.listen(3000, () => {

    console.log('Servidor corriendo en puerto 3000');

});