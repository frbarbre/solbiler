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
        <div id="ekstraudstyr">
        </div>
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

const FORMULAR = document.getElementById("formular");
FORMULAR.addEventListener("submit", function (e) {
    e.preventDefault();
    sessionStorage.setItem("fornavn", document.getElementById("fornavn").value);
    sessionStorage.setItem("efternavn", document.getElementById("efternavn").value);
    sessionStorage.setItem("vejnavn", document.getElementById("vejnavn").value);
    sessionStorage.setItem("vejnr", document.getElementById("vejnr").value);
    sessionStorage.setItem("postnr", document.getElementById("postnr").value);
    window.location.href = "kvittering.html";
})


fetch("https://api.dataforsyningen.dk/postnumre")
    .then(function (data) {
        return data.json();
    })
    .then(function (post) {
        const PBLISTE = document.getElementById("pbliste");
        for (const oplysninger of post) {
            PBLISTE.insertAdjacentHTML("beforeend", "<option>" + oplysninger.nr + " " + oplysninger.navn + "</option>");
        }

    })
    .catch(function (error) {
        const PB = document.getElementById("postnr");
        PB.innerHTML = "Postnr og by ikke tilgængelige";
    })

