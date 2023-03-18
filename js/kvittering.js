const LEJEASIDE = document.getElementById("lejeoplysninger");

LEJEASIDE.insertAdjacentHTML("beforeend", '<img class="' + sessionStorage.getItem('class') + '"' + "src='" + sessionStorage.getItem('billede') + "' alt='bil-billede'>");
LEJEASIDE.insertAdjacentHTML("beforeend", "<h3>" + sessionStorage.getItem('bil') + "</h3>");
LEJEASIDE.insertAdjacentHTML("beforeend", 
`<div class="recipt-card-flex">
    <div>
        <h3>Lejeperiode</h3>
        <div class="period-container period-padding">
            <p>${sessionStorage.getItem('afhentningsdato')}</p>
            <p>-</p>
            <p>${sessionStorage.getItem('afleveringsdato')}</p>
        </div>
        <h5>${sessionStorage.getItem('lejedage')} dage</h5>
        <h4>${sessionStorage.getItem('lejeudgift')}</h4>
    </div>
    <div>
        <h3>Udstyrsvalg</h3>
        <ul id="ekstraudstyr">
        </ul>
        <h4>${sessionStorage.getItem('udstyrsudgift')}</h4>    
    </div>
</div>`);
const DATA = sessionStorage.getItem("udstyrsliste");
const UDSTYRSLISTE = JSON.parse(DATA);
const EKSTRAUDSTYR = document.getElementById("ekstraudstyr");

// udskrivning af liste til skærm
for (const UDSTYR of UDSTYRSLISTE) {
    EKSTRAUDSTYR.insertAdjacentHTML("beforeend", `<p class="udstyr">${UDSTYR}</p>`);
}

const TOTALASIDE = document.getElementById("totalindhold");
TOTALASIDE.insertAdjacentHTML("beforeend", `<h3>${sessionStorage.getItem('total')}</h3><p>inkl. moms</p>`);

const STAMOPLYSNINGERDESKTOP = document.getElementById("stamopl-desktop");
const STAMOPLYSNINGERMOBILE = document.getElementById("stamopl-mobile");

STAMOPLYSNINGERDESKTOP.insertAdjacentHTML("afterbegin", `
    <div><h3>Navn</h3> <h3>Adresse</h3> <h3>Postnr. og by</h3> </div>
    <div> <h4>${sessionStorage.getItem("fornavn")}&nbsp;${sessionStorage.getItem("efternavn")}</h4> <h4>${sessionStorage.getItem("vejnavn")}&nbsp;${sessionStorage.getItem("vejnr")}</h4> <h4>${sessionStorage.getItem("postnr")}</h4> </div>
`);

STAMOPLYSNINGERMOBILE.insertAdjacentHTML("afterbegin", `
    <div><h3>Navn</h3> <h4>${sessionStorage.getItem("fornavn")}&nbsp;${sessionStorage.getItem("efternavn")}</h4></div>
    <div><h3>Adresse</h3> <h4>${sessionStorage.getItem("vejnavn")}&nbsp;${sessionStorage.getItem("vejnr")}</h4></div>
    <div><h3>Postnr. og by</h3> <h4>${sessionStorage.getItem("postnr")}</h4></div>
`);

const UDSKRIVKNAP = document.getElementById("udskrivKnap");
UDSKRIVKNAP.addEventListener("click", function() {
    window.print();
})

// Map Box 

mapboxgl.accessToken = 'pk.eyJ1IjoiZnJlZDk4OTEiLCJhIjoiY2xmYXh0bndwMmZ4YzN6bnRhOTZoa3BiZCJ9.ajDp70TNtFQ5XE4cKiArYQ'; 
    const map = new mapboxgl.Map({
      container: 'map',
      // Replace YOUR_STYLE_URL with your style URL.
      style: 'mapbox://styles/fred9891/clfd1avc4005d01o4sitv5e9z', 
      center: [10.1684208,
        56.147832],
      zoom: 15
    });
