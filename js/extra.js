const { typeOf } = require('mathjs');
const nerdamer = require('nerdamer/all')

function najveciZajednickiDjelitelj(a, b) {
  // Euklidov algoritam za pronalazak NZD
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

//ova funkcija vraća najveći zajednički
function NZD3(a, b, c) {
  // Prvo pronađemo NZD prvih dva broja
  const NZD_AB = najveciZajednickiDjelitelj(a, b);

  // Zatim koristimo dobiveni NZD i treći broj za konačni rezultat
  return najveciZajednickiDjelitelj(NZD_AB, c);
}

function izvadiBrojIzZagrada(inputString) {
  // Provjeri da li string počinje s '[' i završava s ']'
  if (inputString.startsWith('[') && inputString.endsWith(']')) {
    // Izreži string tako da ukloni zagrade
    const brojString = inputString.slice(1, -1);
    
    // Pretvori brojString u broj i vrati ga
    const broj = parseFloat(brojString);
    
    // Provjeri da li je pretvorba uspješna
    if (!isNaN(broj)) {
      return broj ;
    }
  }
  
  // Ako ulazni string nije u ispravnom formatu, vrati null ili neku drugu oznaku po vašem izboru
  return null;
}

function IzdvojiKoeficijenteIzJednadbe(jednadbe){
  const koeficijentiT = [];
  const slobodniKoeficijenti = [];

  for (let i = 0; i < 3; i++) {
    const jednadzba = jednadbe[i];
    const tIndex = jednadzba.indexOf('t'); // Pronađi indeks 't' u jednadžbi
    if (tIndex !== -1) {
      // Ako 't' postoji, izdvoji koeficijent koji prethodi 't'
      const koeficijentT = parseFloat(jednadzba.slice(0, tIndex));
      koeficijentiT.push(koeficijentT);
    } else {
      koeficijentiT.push(0); // Ako 't' ne postoji, koeficijent je 0
    }

    // Izdvoji slobodni koeficijent koji slijedi nakon 't'
    const slobodniKoeficijent = parseFloat(jednadzba.slice(tIndex + 1));
    slobodniKoeficijenti.push(slobodniKoeficijent);
  }

  return [koeficijentiT, slobodniKoeficijenti];
}



module.exports = class Operacije{
  izvuciKoeficijenteIzJednadzbi(jednadbe) {
    const izrazi = jednadbe;
    const koeficijenti = [];
  
    for (const izraz of izrazi) {
      // Koristimo regularni izraz za pronalazak brojeva pored 't' ili same 't' ili '-t'
      const rezultat = izraz.match(/([-+]?\d*)t/);
      
      if (rezultat) {
        // Ako nema broja pored 't', postavljamo 1 ili -1
        const koeficijent = rezultat[1] === '' ? (izraz.includes('-t') ? -1 : 1) : parseInt(rezultat[1]);
        koeficijenti.push(koeficijent);
      }
    }
  
    return koeficijenti;
  }

  KoeficijentiJednadbe(polje, kanonskaDolje, kanonskaGore){
    const [koeficijentiT, slobodni] = IzdvojiKoeficijenteIzJednadbe(polje)
    const helpArr = koeficijentiT
    var novo = []
    for (let index = 0; index < 3; index++) {
      novo[index] = koeficijentiT[index]/NZD3(helpArr[0], helpArr[1], helpArr[2])
    }
    console.log("Novo je: " + novo)
    console.log("Slobodni su: ", slobodni)
    if(kanonskaGore[1] == 'm' || kanonskaGore[1] == 'n') {
      console.log("prvi primjer ", kanonskaGore[0], ' m ', ' n'  )
      kanonskaGore[1] = izvadiBrojIzZagrada(nerdamer.solve('(' + slobodni[0] + '+(' + kanonskaGore[0] + '))/' + novo[0] + '=(' + slobodni[1] + ' - m)/' + novo[1] + '', 'm').toString())
      kanonskaGore[2] = izvadiBrojIzZagrada(nerdamer.solve('(' + slobodni[1] + '+(' + kanonskaGore[1] + '))/' + novo[1] + '=(' + slobodni[2] + ' - n)/' + novo[2] + '', 'n').toString())
      console.log("Orginal je ", kanonskaGore[0])
      console.log("m : ", kanonskaGore[1])
      console.log("n : ", kanonskaGore[2])
      return ` 
      <div class="poravnaj">
        <div class="centriraj">
          
            <h5>${slobodni[0]} ${kanonskaGore[0]>0 ? '+' + kanonskaGore[0] : kanonskaGore[0]}</h5>
            <hr>
            <h5>${novo[0]}</h5>
        
        </div>
        <h5>=</h5>
        <div class="centriraj">
          
            <h5>${slobodni[1]} ${kanonskaGore[1]>1 ? '+' + kanonskaGore[1] : kanonskaGore[1]}</h5>
            <hr>
            <h5>${novo[1]}</h5>
          
        </div>
        <h5>=</h5>
        <div class="centriraj">
          
            <h5>${slobodni[2]} ${kanonskaGore[2]>2 ? '+' + kanonskaGore[2] : kanonskaGore[2]}</h5>
            <hr>
            <h5>${novo[2]}</h5>
          
        </div>
      </div>
      `
    } else return "neradi"
  }

  DvijeTockeItockaT(a,b,t){
    var vektor = [0,0,0]
    
    for (let index = 0; index < 3; index++) {
      vektor[index] = b[index] - a[index];
      //console.log(vektor[index]);
    }
    console.log("Unutar funkcije: ",a,b,t,vektor)
    //console.log((a[0] - t[0])/vektor[0])
    
    if(t[1]=='m' && t[2]=='n'){
      t[1] = izvadiBrojIzZagrada(nerdamer.solve((a[0] - t[0])/vektor[0] + '=(' + a[1] + '-m' +')/'+ vektor[1], 'm').toString())
      console.log(t[0], t[1])
      t[2] = izvadiBrojIzZagrada(nerdamer.solve((a[1] - t[1])/vektor[1] + '=(' + a[1] + '-n' +')/'+ vektor[2], 'n').toString())
      console.log('PrvaOpcija(',t[0], t[1], t[2], ')')
      return `
      
      <div class="poravnaj">
        <div class="stupac">
            <h6 class="bottom-border">${t[0]} - ${a[0]}</h6>
            <h6>${vektor[0]}</h6>
        </div>
        <h6>=</h6>
        <div class="stupac">
            <h6 class="bottom-border">${t[1]} - ${a[1]}</h6>
            <h6>${vektor[1]}</h6>
        </div>
        <h6>=</h6>
        <div class="stupac">
            <h6 class="bottom-border">${t[2]} - ${a[2]}</h6>
            <h6>${vektor[2]}</h6>
        </div>
    </div>

      <div class="poravnaj">
        <div class="margina-mala">
          <h5>M = ${t[1]}</h5>
        </div>
          <div class="margina-mala">
            <h5>N = ${t[2]}</h5>
          </div>
      </div>`
    } else if(t[0]=='m' && t[2]=='n'){
      t[0] = izvadiBrojIzZagrada(nerdamer.solve((a[1] - t[1])/vektor[1] + '=(' + a[0] + '-m' +')/'+ vektor[0], 'm').toString())
      t[2] = izvadiBrojIzZagrada(nerdamer.solve((a[1] - t[1])/vektor[1] + '=(' + a[2] + '-n' +')/'+ vektor[2], 'n').toString())
      console.log('DrugaOpcija(',t[0], t[1], t[2], ')')
      return `<div class="poravnaj">
        <div class="margina-mala">
          <h5>M = ${t[0]}</h5>
        </div>
          <div class="margina-mala">
            <h5>N = ${t[2]}</h5>
          </div>
      </div>`
    } else if(t[1]=='n' && t[0]=='m'){
      console.log('TrecaOpcija(',t[0], t[1], t[2], ')')
      t[0] = izvadiBrojIzZagrada(nerdamer.solve((a[2] - t[2])/vektor[2] + '=(' + a[1] + '-m' +')/'+ vektor[1], 'm').toString())
      t[1] = izvadiBrojIzZagrada(nerdamer.solve((a[0] - t[0])/vektor[1] + '=(' + a[2] + '-n' +')/'+ vektor[2], 'n').toString())
      console.log('(' + t[0] + t[1] + t[2] + ')')
      return `<div class="poravnaj">
        <div class="margina-mala">
          <h5>M = ${t[0]}</h5>
        </div>
          <div class="margina-mala">
            <h5>N = ${t[1]}</h5>
          </div>
      </div>`
    }
  }

  VolumenTetraedraOsi(x,y,z,c,opt){
    var vrijednosti = [(c/x).toFixed(2), (c/y).toFixed(2), (c/z).toFixed(2)];
    const vrijednosti2 = vrijednosti
    console.log(vrijednosti)
    var rezhelp = (1/3)*(vrijednosti[0]*vrijednosti[1]/2)
    //print(vrijednosti2[2])
    console.log((1/3)*(vrijednosti[0]*vrijednosti[1]/2))
    return `<div>
    <div class="poravnaj">
        ${x}X ${y<0 ? y : "+" + y}Y ${z < 0 ? z : "+" + z}Z = ${c<0 ? c : "+" + c} / ${c<0 ? c : c}
    </div>
    <div class="poravnaj">
      <div class="margina-mala">
          <h4 class="bottom-border stupac">X</h4>
          <h4>${vrijednosti[0]}</h4>

      </div>
      <h4>${vrijednosti[1] > 0 ? "+": "-"}</h4>
      <div class="margina-mala stupac">
          <h4 class="bottom-border">X</h4>
          <h4>${vrijednosti[1]>0 ? vrijednosti[1] : vrijednosti[1]*(-1)}</h4>
      </div>
      <h4>${vrijednosti[2] > 0 ? "+": "-"}</h4>
      <div class="margina-mala stupac">
          <h4 class="bottom-border">X</h4>
          <h4>${vrijednosti[2]>0 ? vrijednosti[2] : vrijednosti[2]*(-1)}</h4>

      </div>
      <div class="margina-mala stupac">
          <h4> = 1</h4>
      </div>
      
  </div>
  <div class="poravnaj">
    <h4>Baza = </h4>
    <div class="stupac">
          <div class="bottom-border">
            <h4>${vrijednosti2[0]} * ${vrijednosti2[1]}</h4>
          </div>
          <div class="centriraj">
            <h4>2</h4>
          </div>
      </div>
      <h4>=</h4>
    <h4>${(vrijednosti2[0] * vrijednosti2[1])/2}</h4>
  </div>
  <div class="poravnaj">
    <div class="stupac">
        <h4 class="bottom-border">1</h4>
        <h4>3</h4>
    </div>
    <h4>*</h4>
    <div>
        <h4>${(vrijednosti2[0]*vrijednosti2[1])/2}</h4>
    </div>
    <h4>*</h4>
    <h4>${vrijednosti2[2]} = ${rezhelp*vrijednosti2[2]}</h4>
</div>
</div>`
  }
}
