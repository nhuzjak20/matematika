const express = require('express');
const path = require('path');
const v = require('vec3')
const app = express();
const bodyParser = require('body-parser')
const nerdamer = require('nerdamer/all')
const math = require('mathjs');
const { type } = require('os');
const urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static(path.join(__dirname, 'html')))
app.use('/images',express.static(path.join(__dirname, '/images')))

function pretvoriPIuBroj(str) {
    const piSymbol = 'π';
    const piValue = Math.PI;
  
    // Zamijeni sve pojave simbola π u stringu s vrijednošću broja Math.PI
    const noviString = str.replace(new RegExp(piSymbol, 'g'), piValue);
    console.log("Novi string je " + noviString)
    // Vrati novi string koji sadrži brojevnu vrijednost za simbol PI
    return noviString;
}

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
        res.sendFile(__dirname + '/html/templates/Ispit/prvi-zadatak/vektorskiProdukt.html');
    }
})

app.get('/IspitDrugiZadatak', (req, res) => {
    res.sendFile(__dirname + '/html/templates/Ispit/drugi-zadatak/zadatak.html');
})

app.post('/IspitDrugiRijesenje', urlencodedParser, (req, res) => {
    const vSmjer1 = req.body.smjer1
    const vSmjer2 = req.body.smjer2
    const VTocka1 = req.body.tocka1
    const OrgTocka1 = req.body.tocka1
    const OrgTocka2 = req.body.tocka2
    const VTocka2 = req.body.tocka2
    for(var i = 0; i<3; i++){
        VTocka1[i] = VTocka1[i]* -1
        VTocka2[i] = VTocka2[i]* -1
        if(VTocka1[i]>0){
            VTocka1[i] = "+" + VTocka1[i] 
        }
        if(VTocka2[i]>0){
            VTocka2[i] = "+" + VTocka2[i]
        }
    }
    console.log("Vtocka1 je " + VTocka1)
    const v1 = v(vSmjer1[0], vSmjer1[1], vSmjer1[2])
    const v2 = v(vSmjer2[0], vSmjer2[1], vSmjer2[2])
    const v1xv2 = v1.cross(v2)
    const Npravac1Tocka = OrgTocka1.map(x => x * -1)
    const Npravac2Tocka = OrgTocka2.map(x => x * -1)
    console.log("vSmjer1 je : " + vSmjer1)
    const NoviVektorSmjera1 = vSmjer1.map(x => x * -1)
    const CijelaBrojka = [0, 0, ]
    const privremenizbroj= OrgTocka1.map(x => x * -1)
    for(var i = 0; i < 3; i++){
        CijelaBrojka[i] = privremenizbroj[i] + OrgTocka2[i] 
    }
    console.log("Orginalna točka 2 je " + OrgTocka2)
    console.log("Privremeni zbroj je " + privremenizbroj)
    console.log("Zbroj Tocaka za kraj je: " + CijelaBrojka)
    console.log("Npravac1Tocka je " + Npravac1Tocka)
    console.log("Vektorski zbroj je: " + v1xv2)
    for(var i = 0; i<3; i++){
        if(Npravac1Tocka[i]>0){
            Npravac1Tocka[i] = "+" + Npravac1Tocka[i] 
        }
        if(Npravac2Tocka[i]>0){
            Npravac2Tocka[i] = "+" + Npravac2Tocka[i]
        }
    }
    console.log("Npravac1Tocka je " + Npravac1Tocka)
    console.log("Npravac2Tocka je " + Npravac2Tocka)
    console.log("Vtocka2 je " + VTocka2)
    const posalji = `<div class="poravnaj">
    <div>
        <h6>Vektori smjera:</h6>
        <h5 class="margina-mala">S1(${vSmjer1[0]},${vSmjer1[1]}, ${vSmjer1[2]})</h5>
        <h5 class="margina-mala">S2(${vSmjer2[0]},${vSmjer2[1]}, ${vSmjer2[2]})</h5>
    </div>
    <div>
        <h6>Točke:</h6>
        <h5 class="margina-mala">T1(${OrgTocka1[0]}, ${OrgTocka1[1]}, ${OrgTocka1[2]})</h5>
        <h5 class="margina-mala">T1(${OrgTocka2[0]}, ${OrgTocka2[1]}, ${OrgTocka2[2]})</h5>
    </div>
</div>
<div class="poravnaj">
    <h5>S1</h5><h5>X</h5><h5>S2</h5><h5>=</h5><h5>(${v1xv2.x}, ${v1xv2.y}, ${v1xv2.z})</h5>
</div>
<div>
    <div class="poravnaj">
        <div>
            <h5>P1...</h5>
        </div>
        <div class="stupac">
            <div>
                <h6>X = ${vSmjer1[0]}p ${VTocka1[0]}</h6>
            </div>
            <div>
                <h6>Y = ${vSmjer1[1]}p ${VTocka1[1]}</h6>
            </div>
            <div>
                <h6>Z = ${vSmjer1[2]}p ${VTocka1[2]}</h6>
            </div>
        </div>
    </div>
    <div>
        <div class="poravnaj">
            <h5>P2...</h5>
        </div>
        <div class="stupac">
            <div>
                <h6>X = ${vSmjer2[0]}u ${VTocka2[0]}</h6>
            </div>
            <div>
                <h6>Y = ${vSmjer2[1]}u ${VTocka2[1]}</h6>
            </div>
            <div>
                <h6>Z = ${vSmjer2[2]}u ${VTocka2[2]}</h6>
            </div>
        </div>
    </div>
    <div class="stupac">
    <div>
        <h5>N1 = (${vSmjer1[0]}t ${VTocka1[0]}, ${vSmjer1[1]}t ${VTocka1[1]}, ${vSmjer1[2]}t ${VTocka1[2]} )</h5></div>
        <div><h5>N2 = (${vSmjer2[0]}u ${VTocka2[0]}, ${vSmjer2[1]}u ${VTocka2[1]}, ${vSmjer2[2]}u ${VTocka2[2]} )</h5>
    </div>
</div>
<div class="centriraj">
    <h5>N1N2 = ((${vSmjer2[0]}u ${VTocka2[0]}) - (${vSmjer1[0]}t ${VTocka1[0]}),(${vSmjer2[1]}u ${VTocka2[1]}) - (${vSmjer1[1]}t ${VTocka1[1]}), (${vSmjer2[2]}u ${VTocka2[2]}) - (${vSmjer1[2]}t ${VTocka1[2]}))</h5>
</div>
<div>
    <h5>${Npravac1Tocka[0]}t ${Npravac2Tocka[0]}u ${CijelaBrojka[0]} = ${v1xv2.x}& </h5>
    <h5>${Npravac1Tocka[1]}t ${Npravac2Tocka[1]}u ${CijelaBrojka[1]} = ${v1xv2.y}& </h5>
    <h5>${Npravac1Tocka[2]}t ${Npravac2Tocka[2]}u ${CijelaBrojka[2]} = ${v1xv2.z}& </h5>
    <p>Upitno koliko je ovo točno, izračunajte si to na papiru</p>
</div>
</div>`
    res.send(posalji)
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

app.get('/Kruznica', (req, res) =>{
    res.sendFile(__dirname + '/html/templates/Ispit/sesti-zadatak/zadatak.html')
})

app.post('/kruznicaRijesenje',urlencodedParser ,(req, res)=>{
    const jednadba = req.body.jednadba
    const reza = req.body.jednakost

})

app.get('/IspitTreciZadatak', (req, res)=>{
    const xDerivacija = math.derivative('x^2 - y^2 -14x + 10y', 'x').toString()
    const xJednadba = xDerivacija + ' = 0'
    console.log(nerdamer.solve(xJednadba, 'x').toString())

    const vrati = ``
    res.sendFile(__dirname + '/html/templates/Ispit/treci-zadatak/zadatak.html')
})

app.post('/ispitTreciRijesenje',urlencodedParser ,(req, res)=>{
    const jednadba = req.body.jednadba
    //derivacija po x
    const xDerivacija = math.derivative(jednadba, 'x')
    
    //Rijesenje x jednadbe
    const BrojkaX = nerdamer.solve(xDerivacija, 'x').toString().replace(/[\[\]]/g, '')
    const xRijesenje = parseInt(BrojkaX)
    //Derivacija po y
    const yDerivacija = math.derivative(jednadba, 'y')
    console.log(yDerivacija.toString())
    //Rijesenje y jednadbe
    const BrojkaY = nerdamer.solve(yDerivacija, 'y').toString().replace(/[\[\]]/g, '')
    console.log(BrojkaY)
    const yRijesenje = parseInt(BrojkaY)
    console.log(typeof yRijesenje)
    const RijesenaJednadba = math.evaluate(jednadba, {x:xRijesenje, y:yRijesenje}).toString()
    var JednadbaPostupak = jednadba.replace(/[xy]/g, function(match) {
        if (match === "x") {
          return xRijesenje.toString();
        } else if (match === "y") {
          return yRijesenje.toString();
        }
      });

    console.log(RijesenaJednadba)
    console.log(JednadbaPostupak)
    const vrati = `<div class="poravnaj">
    <div>
        <div class="stupac">
            <h5>${xDerivacija} = 0</h5>
            <h5>x = ${xRijesenje}</h5>
        </div>
        <div class="stupac">
            <h5>${yDerivacija} = 0</h5>
            <h5>y = ${yRijesenje}</h5>
        </div>
    </div>
</div>`
    res.send(vrati)
})

app.get('/IspitCetvrtiZadatak', (req, res)=>{
    res.sendFile(__dirname + '/html/templates/Ispit/cetvrti-zadatak/zadatak.html')
})

app.post('/IspitCetvrtiZadatakRijesenje',urlencodedParser ,(req, res)=>{
    const jednadbe = req.body.Jednadbe
    nerdamer.set('SOLUTIONS_AS_OBJECT', true);
    const tocka = req.body.tocka
    var JednadbeZaRijesit = [jednadbe[0] + ' = ' + tocka[0], jednadbe[1] + ' = ' + tocka[1], jednadbe[2] + ' = ' + tocka[2]]
    console.log(JednadbeZaRijesit)
    const uDerivacije = [math.derivative(jednadbe[0], 'u'), math.derivative(jednadbe[1], 'u'), math.derivative(jednadbe[2], 'u')]
    const vDerivacije = [math.derivative(jednadbe[0], 'v'), math.derivative(jednadbe[1], 'v'), math.derivative(jednadbe[2], 'v')]
    try {
        
        //console.log(JednadbeZaRijesit)
        //console.log(nerdamer.solveEquations(JednadbeZaRijesit).toString())
        /*
        res.send (`
        <div class="centriraj stupac">
        <div class="stupac">
            <h5>${JednadbeZaRijesit[0]}</h5>
            <h5>${JednadbeZaRijesit[1]}</h5>
            <h5>${JednadbeZaRijesit[2]}</h5>
        </div>
    </div>
    <h5>Parcijalno deriviraj svaku jednadbu</h5>
    <div class="poravnaj">
    <div class="stupac">
        <h5>Derivacija po U</h5>
        <div class="stupac">
            <h5>1. ${uDerivacije[0]}</h5>
            <h5>2. ${uDerivacije[1]}</h5>
            <h5>3. ${uDerivacije[2]}</h5>
        </div>
    </div>
    <div class="stupac">
        <h5>Derivacija po V</h5>
        <div class="stupac">
            <h5>1. ${vDerivacije[0]}</h5>
            <h5>2. ${vDerivacije[1]}</h5>
            <h5>3. ${vDerivacije[0]}</h5>
        </div>
    </div>
    </div>
        `) */
    } catch (e) {
        console.log(e)
        console.log("Ne radi")
        res.write('<p>*Kod je izbacio error, ovdje su ti izbačene jednadbe, to ti je sustav jednadbi pa rijesis i dobis U i V</p>')
    }
    
    console.log(uDerivacije.toString())
    console.log(JednadbeZaRijesit)
    res.send(`
    <div class="centriraj stupac">
    <div class="stupac">
        <h5>${JednadbeZaRijesit[0]}</h5>
        <h5>${JednadbeZaRijesit[1]}</h5>
        <h5>${JednadbeZaRijesit[2]}</h5>
    </div>
    </div>
    <h5>Parcijalno deriviraj svaku jednadbu</h5>
    <div class="poravnaj">
    <div class="stupac">
    <h5>Derivacija po U</h5>
    <div class="stupac margina-srednja width-max">
        <h5>${JednadbeZaRijesit[0]} -> ${uDerivacije[0]}</h5>
        <h5>${JednadbeZaRijesit[1]} -> ${uDerivacije[1]}</h5>
        <h5>${JednadbeZaRijesit[2]} -> ${uDerivacije[2]}</h5>
    </div>
    </div>
    <div class="stupac margina-srednja width-max">
        <h5>Derivacija po V</h5>
        <div class="stupac margina-srednja width-max">
            <h5>${JednadbeZaRijesit[0]} -> ${vDerivacije[0]}</h5>
            <h5>${JednadbeZaRijesit[1]} -> ${vDerivacije[1]}</h5>
            <h5>${JednadbeZaRijesit[2]} -> ${vDerivacije[2]}</h5>
        </div>
    </div>
    </div>
        <div class="poravnaj margina-mala">
        <h5>(${vDerivacije[0]}, ${vDerivacije[1]}, ${vDerivacije[2]})</h5>
        <h5>X</h5>
        <h5>(${uDerivacije[0]} ,${uDerivacije[1]}, ${uDerivacije[2]})</h5>
    </div>
    <div class="margina-mala">
        <p>*izbaci nepoznanice iz deriviranog i izračunaj vektorski produkt u kalkulatoru dolje i dobio si visinu normale na plohu</p>
    </div>
        <form hx-post="/vektorskiProdukt" hx-target="#VektorskiProduktRijesenje">
        <div id="nize">
            <div class="cijeli-vektor">
                <h5>Vektor A</h5>
                <div><h1>(</h1></div>
                <div><input type="number" name="Vektor1"></div>
                <div><h1>,</h1></div>
                <div><input type="number" name="Vektor1"></div>
                <div><h1>,</h1></div>
                <div><input type="number" name="Vektor1"></div>
                <div><h1>)</h1></div>
            </div>
            <div class="cijeli-vektor">
                <h5>Vektor B</h5>
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
    </form>
    <div id="VektorskiProduktRijesenje"></div>
    `)
})

app.get('/gradijentFunkcije', (req, res)=>{
    res.sendFile(__dirname + '/html/templates/Ispit/peti-zadatak/zadatak.html')
})

app.post('/gradijentRijesenje',urlencodedParser , (req, res)=>{
    const jednadba = req.body.jednadba
    const tocka = req.body.tocka
    let xDerivacija = undefined
    let yDerivacija = undefined
    let TockaRijesenje1 = undefined
    let TockaRijesenje2 = undefined
    try{
        xDerivacija = math.derivative(jednadba, 'x').toString()
        yDerivacija = math.derivative(jednadba, 'y').toString()
        const tockaPretvoreno = [pretvoriPIuBroj(tocka[0]), pretvoriPIuBroj(tocka[1])]
        TockaRijesenje1 = math.evaluate(xDerivacija, {'x' : tockaPretvoreno[0]})
        TockaRijesenje2 = math.evaluate(yDerivacija, {'y' : tockaPretvoreno[1]})
        console.log(tockaPretvoreno)
        console.log(TockaRijesenje1)
    } catch(e){
        console.log("Error je izaso")
        console.log(e)
    }
    
    //console.log(xDerivacija.toString())
    //console.log(yDerivacija.toString())
    
    //console.log(TockaRijesenje1)
    //console.log(TockaRijesenje2)
    res.send(`
    <div class="poravnaj">
    <div class="stupac margina-mala">
        <h5>Derivacija po X</h5>
        <h5>${xDerivacija}</h5>
    </div>
    <div class="stupac margina-mala">
        <h5>Derivacija po Y</h5>
        <h5>${yDerivacija}</h5>
    </div>
    </div>
    <div class="stupac">
        <p>Uneses x i y od točke u deriviranu jednadbu</p>
        <p>*π(pi) se piše da uključiš CAPSLOCK, držiš ALT i upišeš 227 sa keypadom(brojevi desno, ne ovi u redu)</p>
    </div>
    <div class="stupac">
    <h5>Prva točka je = ${TockaRijesenje1}</h5>
    <h5>Druga točka je = ${TockaRijesenje2}</h5>
    </div>
    <form hx-post="/GradijentPomocno" class="poravnaj" hx-target="#pomocno">
    <h5>u = </h5>
    <input type="number" name="vektor" id="">
    <h5>i   </h5>
    <input type="number" name="vektor" id="">
    <h5>j</h5>
    </form>
    `)
})

app.post('/GradijentPomocno',urlencodedParser ,(req, res)=>{
    
})

app.get('/polinom', (req, res)=>{
    res.sendFile(__dirname + '/html/templates/Ispit/sedmi-zadatak/zadatak.html')
})

app.post('/polinomi',urlencodedParser ,(req, res)=>{
    const polinom1 = req.body.polinom
    const polinom2 = req.body.polinomQ
    const rezultat = req.body.rezultat
})

app.listen(5000, ()=>{
    console.log("Server radi")
})

/* 

 try{
        nerdamer.set('SOLUTIONS_AS_OBJECT', true);
        const jednadbe = req.body.Jednadbe
        const tocka = req.body.tocka
        var JednadbeZaRijesit = [jednadbe[0] + ' = ' + tocka[0], jednadbe[1] + ' = ' + tocka[1], jednadbe[2] + ' = ' + tocka[2]]
        console.log(JednadbeZaRijesit)
        console.log(nerdamer.solveEquations(JednadbeZaRijesit))
        console.log(nerdamer.solveEquations(JednadbeZaRijesit).toString())
        const uDerivacije = [math.derivative(JednadbeZaRijesit[0], 'u'), math.derivative(JednadbeZaRijesit[1], 'u'), math.derivative(JednadbeZaRijesit[2], 'u')]
        const vDerivacije = [math.derivative(JednadbeZaRijesit[0], 'v'), math.derivative(JednadbeZaRijesit[1], 'v'), math.derivative(JednadbeZaRijesit[2], 'v')]
        
        res.send( `
    <div class="centriraj stupac">
        <div class="stupac">
            <h5>${JednadbeZaRijesit[0]}</h5>
            <h5>${JednadbeZaRijesit[1]}</h5>
            <h5>${JednadbeZaRijesit[2]}</h5>
        </div>
    </div>
    <h5>Parcijalno deriviraj svaku jednadbu</h5>
    <div class="poravnaj">
    <div class="stupac">
        <h5>Derivacija po U</h5>
        <div class="stupac">
            <h5>1. ${uDerivacije[0]}</h5>
            <h5>2. ${uDerivacije[1]}</h5>
            <h5>3. ${uDerivacije[2]}</h5>
        </div>
    </div>
    <div class="stupac">
        <h5>Derivacija po V</h5>
        <div class="stupac">
            <h5>1. ${vDerivacije[0]}</h5>
            <h5>2. ${vDerivacije[1]}</h5>
            <h5>3. ${vDerivacije[0]}</h5>
        </div>
    </div>
    </div>
    `)
    } catch(error){
        nerdamer.set('SOLUTIONS_AS_OBJECT', true);
        const jednadbe = req.body.Jednadbe
        const tocka = req.body.tocka
        var JednadbeZaRijesit = [jednadbe[0] + ' = ' + tocka[0], jednadbe[1] + ' = ' + tocka[1], jednadbe[2] + ' = ' + tocka[2]]
        console.log(error)
        console.log("Neradi")
        try{
            
            console.log(nerdamer.diff())
        } catch(error){
            console.log("Greška je kod operacija")
        }
        //const uDerivacije = [math.derivative(JednadbeZaRijesit[0], 'u'), math.derivative(JednadbeZaRijesit[1], 'u'), math.derivative(JednadbeZaRijesit[2], 'u')]
        //const vDerivacije = [math.derivative(JednadbeZaRijesit[0], 'v'), math.derivative(JednadbeZaRijesit[1], 'v'), math.derivative(JednadbeZaRijesit[2], 'v')]
        //console.log(uDerivacije)
        //console.log(vDerivacije)
        uDerivacije = 1
        vDerivacije = 2
        res.send( `
    <div class="centriraj stupac">
        <div class="stupac">
            <h5>${JednadbeZaRijesit[0]}</h5>
            <h5>${JednadbeZaRijesit[1]}</h5>
            <h5>${JednadbeZaRijesit[2]}</h5>
            <p>*Kod je izbacio error, ovdje su ti izbačene jednadbe, to ti je sustav jednadbi pa rijesis i dobis U i V</p>
        </div>
    </div>
    <h5>Parcijalno deriviraj svaku jednadbu</h5>
    <div class="poravnaj">
    <div class="stupac">
        <h5>Derivacija po U</h5>
        <div class="stupac">
            <h5>1. ${uDerivacije[0]}</h5>
            <h5>2. ${uDerivacije[1]}</h5>
            <h5>3. ${uDerivacije[2]}</h5>
        </div>
    </div>
    <div class="stupac">
        <h5>Derivacija po V</h5>
        <div class="stupac">
            <h5>1. ${vDerivacije[0]}</h5>
            <h5>2. ${vDerivacije[1]}</h5>
            <h5>3. ${vDerivacije[0]}</h5>
        </div>
    </div>
    </div>
    `)
    }

*/