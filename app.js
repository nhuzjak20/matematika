const express = require('express');
const operacije = require('./js/extra')
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
    const rezultat = Math.abs(privremeno.dot(prviVektor))
    
    //console.log(rezultat)
    const povrat = `<div>
    <h4>Volumen je ${rezultat}</h4>
</div>
<div>
    <h4>Postupak</h4>
    <div class="poravnaj">
        <div class="poravnaj">
            <h6>(</h6>
            <h6>${prviVektor.x}</h6>
            <h6>,</h6>
            <h6>${prviVektor.y}</h6>
            <h6>,</h6>
            <h6>${prviVektor.z}</h6>
            <h6>)</h6>
        </div>
        <h5>x</h5>
        <div class="poravnaj">
            <h6>(</h6>
            <h6>${drugiVektor.x}</h6>
            <h6>,</h6>
            <h6>${drugiVektor.y}</h6>
            <h6>,</h6>
            <h6>${drugiVektor.z}</h6>
            <h6>)</h6> 
        </div>
        <h5>*</h5>
        <div class="poravnaj">
            <h6>(</h6>
            <h6>${treciVektor.x}</h6>
            <h6>,</h6>
            <h6>${treciVektor.y}</h6>
            <h6>,</h6>
            <h6>${treciVektor.z}</h6>
            <h6>)</h6>
        </div class="poravnaj">
        <h5>= ${rezultat}</h5>
    </div>
</div>
`
    res.send(povrat)
})


app.post('/dodaj_zadatak',urlencodedParser , (req, res) => {
    if(req.body.zadatak == 4){
        const salji = `<form hx-post="/vektorskiProdukt" hx-target="#nize" hx-swap="afterend">
        <div id="nize">
            <div class="cijeli-vektor">
                <h5>Vektor <h5 contenteditable="true">B</h5> = </h5>
                <div><h1>(</h1></div>
                <div><input type="number" name="Vektor1"></div>
                <div><h1>,</h1></div>
                <div><input type="number" name="Vektor1"></div>
                <div><h1>,</h1></div>
                <div><input type="number" name="Vektor1"></div>
                <div><h1>)</h1></div>
            </div>
            <div class="cijeli-vektor">
                <h5>Vektor <h5 contenteditable="true">C</h5> = </h5>
                <div><h1>(</h1></div>
                <div><input type="number" name="Vektor2"></div>
                <div><h1>,</h1></div>
                <div><input type="number" name="Vektor2"></div>
                <div><h1>,</h1></div>
                <div><input type="number" name="Vektor2"></div>
                <div><h1>)</h1></div>
            </div>
            <div class="centriraj"><button type="submit">Izračunaj</button></div>
            
        </div>
        
    </form>`
        res.send(salji)
    }
})

app.post('/vektorskiProdukt',urlencodedParser , (req, res) => {
    console.log("radi")
    const vektor1 = req.body.Vektor1
    console.log(vektor1)
    const vektor2 = req.body.Vektor2
    console.log(vektor2)
    const v1 = v(vektor1[0], vektor1[1], vektor1[2])
    console.log("Sredina Vektor")
    const v2 = v(vektor2[0], vektor2[1], vektor2[2])
    console.log("Kraj vektora")
    console.log(v1)
    console.log("Ispisivanje vektora")
    const rezultat = v1.cross(v2)
    const vrati = `<div class="poravnaj">
        <h5>(${v1.x}, ${v1.y}, ${v1.z})</h5>
        <h5>(${v2.x}, ${v2.y}, ${v2.z})</h5>
        <h5>=</h5>
        <h5>(${rezultat.x}, ${rezultat.y}, ${rezultat.z})</h5>
    </div>`
    res.send(vrati)
})

app.get('/prvi-kolokvij-navigacija', (req, res) => {
    res.sendFile(__dirname + '/html/templates/prvi-kolokvij/navigacija.html')
})

app.get('/kolokvij1CetvrtiZadatak', (req, res) => {
    res.sendFile(__dirname + '/html/templates/prvi-kolokvij/PravacTockaVektor/zadatak.html')
})

app.post('/rijesiZad4', urlencodedParser, (req, res) => {
    
})

app.listen(5000, ()=>{
    console.log("Server radi")
})