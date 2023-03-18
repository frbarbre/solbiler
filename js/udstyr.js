const URL = window.location.search;
const URLDATA = new URLSearchParams(URL);
const LEJEASIDE = document.getElementById("lejeoplysninger");

LEJEASIDE.insertAdjacentHTML("beforeend", `<img class="${URLDATA.get('class')}" src="${URLDATA.get('billede')}" alt="bil-billede">`);
LEJEASIDE.insertAdjacentHTML("beforeend", "<h3>" + URLDATA.get('bil') + "</h3>");
LEJEASIDE.insertAdjacentHTML("beforeend", `<div class="period-container"><p>${URLDATA.get('afhentning')}</p><p>-</p><p>${URLDATA.get('aflevering')}</p></div>`);
LEJEASIDE.insertAdjacentHTML("beforeend", `<h4>${URLDATA.get('lejedage')} dage</h4>`);
LEJEASIDE.insertAdjacentHTML("beforeend", `<h2 class="car-total">${parseFloat(URLDATA.get('lejeudgift')).toLocaleString('da-DK', { style: 'currency', currency: 'DKK' })}</h2>`);

sessionStorage.setItem("bil", URLDATA.get('bil'));
sessionStorage.setItem("afhentningsdato", URLDATA.get('afhentning'));
sessionStorage.setItem("afleveringsdato", URLDATA.get('aflevering'));
sessionStorage.setItem("lejedage", URLDATA.get('lejedage'));
sessionStorage.setItem("billede", URLDATA.get('billede'));
sessionStorage.setItem("class", URLDATA.get('class'));
sessionStorage.setItem("lejeudgift", parseFloat(URLDATA.get('lejeudgift')).toLocaleString('da-DK', { style: 'currency', currency: 'DKK' }));

let TOTAL = parseFloat(URLDATA.get('lejeudgift'));
let UDSTYRSUDGIFT = 0.00;

const TOTALASIDE = document.getElementById("totalindhold");
visTotal();

const CHECKBOKSE = document.getElementsByClassName("checkboks");

let iosLabel = document.querySelectorAll(".ios-label");

for (const CHECKBOKS of CHECKBOKSE) {
    CHECKBOKS.addEventListener("change", function () {
        if (this.checked === true) { // Hvis der vælges en vare
            TOTAL = Math.abs(TOTAL + parseFloat(this.value)); // læg udstyrspris til total
            UDSTYRSUDGIFT = Math.abs(UDSTYRSUDGIFT + parseFloat(this.value));
            CHECKBOKS.classList.add("ios-active");  
        }
        else { // Hvis der fravælges en vare
            TOTAL = Math.abs(TOTAL - parseFloat(this.value)); // træk udstyrspris fra total
            UDSTYRSUDGIFT = Math.abs(UDSTYRSUDGIFT - parseFloat(this.value));
            CHECKBOKS.classList.remove("ios-active");
        }
        visTotal();
    })
}


const FORMULAR = document.getElementById("formular");
FORMULAR.addEventListener("submit", gemValgtUdstyr); 

function gemValgtUdstyr() {
    let udstyrsliste = [];
    for (const CHECKBOKS of CHECKBOKSE) {
        if (CHECKBOKS.checked === true) {
            udstyrsliste.push(CHECKBOKS.dataset.udstyr);
               
        }
    }
    sessionStorage.setItem("udstyrsliste", JSON.stringify(udstyrsliste));
    sessionStorage.setItem("udstyrsudgift", UDSTYRSUDGIFT.toLocaleString('da-DK', { style: 'currency', currency: 'DKK' }));
    sessionStorage.setItem("total", TOTAL.toLocaleString('da-DK', { style: 'currency', currency: 'DKK' }));
}

function visTotal() {
    TOTALASIDE.innerHTML = `<h3>${TOTAL.toLocaleString('da-DK', { style: 'currency', currency: 'DKK' })}</h3><p>inkl. moms</p>`;
}

