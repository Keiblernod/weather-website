const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forcast = require('./utils/forcast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths express config
const publicDirectoryPath = path.join(__dirname,"../public");
const viewsPath = path.join(__dirname,"../templates/views");
const partialsPath = path.join(__dirname,"../templates/partials");

//Setting handlebars views location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('',(req,res) => {
    res.render('index', {
        title: "Weather",
        name: "Brandon"
    });
});

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About',
        name: 'Brandon'
    })
});

app.get('/help', (req,res) => {
    res.render('help', {
        title: "The help page?",
        msg: 'I don\'t know what\'s going on so don\'t ask me',
        name: "T.R.A."
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
       return res.send({
        error: 'you must povide an address'
       });
    }
    weather(req.query.address, (obj) => {
        res.send(obj);
    });

});

app.get('/help/*',(req,res) => {
    const errorCode = 404;
    const url = `https://http.cat/${errorCode}.jpg`;
        res.render('404',{
            title: "Help article not found... Have a cat",
            name: "Brandon",
            img: url
    });
})

app.get('*',(req,res) => {
    const errorCode = 404;
    const url = `https://http.cat/${errorCode}.jpg`;
        res.render('404',{
            title: "page not found... Have a cat instead",
            name: "Brandon",
            img: url
    });
});

const weather = (address, callback) => {
    geocode(address,(error, {latitude,longitude,location} = {},) => {
        if(error){
           return callback({error});
        } 
        forcast(latitude,longitude,(error,{description,temperature,feelslike}) => {
            if(error){
                return callback({error});
            }
            
            callback( {
                location,
                description,
                temperature,
                feelslike,
                address
            });
            
            });
    });
};

app.listen(port,() => {
    console.log('server is up on port '+port);
});