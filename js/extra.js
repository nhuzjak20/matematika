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
