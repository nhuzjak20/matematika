const express = require('express');
const path = require('path');
const v = require('vec3')
const app = express();
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static(path.join(__dirname, 'html')))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/html/index.html')
})

app.get('/promjeniNaslov', (req, res) => {
    res.send('<h1>Promjenjen Naslov</h1>')
})

app.get('/ispit_navigacija', (req, res) => {
    //console.log("Radi Ispit navigacija")
    res.sendFile(__dirname + "/html/ispit-navigacija.html")
})

app.get('/IspitPrviZadatak', (req, res)=>{
    res.sendFile(__dirname + "/html/templates/Ispit/prvi-zadatak/zadatak.html")
})

app.post('/RijesiPrviZadatak',urlencodedParser ,(req, res)=>{
    console.log(req.body.PrviDrugi)
    const prviVektor = v(req.body.PrviPrvi, req.body.PrviDrugi, req.body.PrviTreci)
    const drugiVektor = v(req.body.DrugiPrvi, req.body.DrugiDrugi, req.body.DrugiTreci)
    const treciVektor = v(req.body.TreciPrvi, req.body.TreciDrugi, req.body.TreciTreci)
    const privremeno = treciVektor.cross(drugiVektor)
    const rezultat = privremeno.dot(prviVektor)
    console.log(rezultat)
    res.send("<h2>Rezultat je " + rezultat + "</h2>")
})

app.listen(5000, ()=>{
    console.log("Server radi")
})