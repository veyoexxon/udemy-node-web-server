const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 8080;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req,res,next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });
    console.log(log);
    next(); 
});

/*
app.use((req,res,next) => {
    res.render('maintenance.hbs', {
        pageTitle: 'Under Maintenance'
    });
});
*/

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.upperCase();
});

app.get('/', (req, res) => {0
    /*res.send({
        name: 'Veijo',
        likes: [
            'keijo',
            'reijo'
        ]
    });*/
    res.render('home.hbs', {
        pageTitle: 'Welcome page',
        welcomeMessage: 'Another visitor. Stay awhile. Stay forever! MUAHHAHAHAHAHAAA',
        currentYear: new Date().getFullYear()
    });
});

app.get('/about', (req,res) => {
    res.render('about.hbs', {
        pageTitle: 'About page',
    });
});

app.get('/bad', (req,res) => {
    res.send({
        errorMessage: 'Invalid user error'
    });
});

app.listen(port, () => {
    console.log(`Starting listener in port ${port}`);
});
