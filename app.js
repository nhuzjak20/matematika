const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'html')))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/html/index.html')
})

app.get('/promjeniNaslov', (req, res) => {
    res.send('<h1>Promjenjen Naslov</h1>')
})

app.get('/ispit_navigacija', (req, res) => {
    console.log("Radi Ispit navigacija")
    res.sendFile(__dirname + "/html/ispit-navigacija.html")
})

app.listen(5000, ()=>{
    console.log("Server radi")
})