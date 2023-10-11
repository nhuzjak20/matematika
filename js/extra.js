module.exports = class Operacije{
    izvuciKoeficijenteIzJednadzbi(jednadbe) {
        //const izrazi = ['-1+7t', '6-12t', '6+6t'];
        const koeficijenti = [];
      
        for (const izraz of jednadbe) {
          // Koristimo regularni izraz za pronalazak brojeva pored 't'
          const rezultat = izraz.match(/(-?\d+)t/);
      
          if (rezultat) {
            // Dodajemo pronađeni koeficijent u polje
            koeficijenti.push(parseInt(rezultat[1]));
          }
        }
      
        return koeficijenti;
      }
}