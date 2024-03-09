const fs = require('fs');
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

let visitas = 0;

app.engine('mpp', function (filePath, options, callback) { // define the template engine
    fs.readFile(filePath, function (err, content) {
        if (err) return callback(new Error(err));
        // this is an extremely simple template engine
        for(var key in options){
            if(content.indexOf('((' + key + '))') !== -1){
                var content = content.toString().split('((' + key + '))').join(options[key]);
            }
        }
        rendered = content;
        return callback(null, rendered);
    });
});
app.set('views', './views'); // specify the views directory
app.set('view engine', 'mpp'); // register the template engine

app.get('/mpp1', (req, res) => {
    res.render('plantilla1', {
        titulo: 'Bienvenidos al servidor express',
        mensaje: 'Estamos en el servidor Express',
        auto: 'Pablo',
        version: 1.3
    });
});

app.get('/mpp2', (req, res) => {
    res.render('plantilla2', {
        nombre: 'Pablo',
        apellido: 'Iglesias',
        fyh: new Date().toLocaleString(),
    });
});

const server = app.listen(PORT, () => {
    console.log(`Server trabajando en http://localhost:${PORT}`);
})