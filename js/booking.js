// Frontpage filtering

let biler = [
    {
        bilmaerke: "Tesla Model X",
        billede: "img/modelx.png",
        billedtekst: "Billede af udlejningsbil",
        kategori: "SUV",
        beskrivelse: "Det ideele køretøj for den store børnefamilie",
        personer: "7",
        kufferter: "5",
        tillaeg: "250",
        class: "modelx-img"
    },
    {
        bilmaerke: "Tesla Model S",
        billede: "img/models.png",
        billedtekst: "Billede af udlejningsbil",
        kategori: "Sedan",
        beskrivelse: "Elbil med mageløse køreegenskaber",
        personer: "5",
        kufferter: "3",
        tillaeg: "120",
        class: "models-img",
    },
    {
        bilmaerke: "Tesla Cybertruck",
        billede: "img/cybertruck.png",
        billedtekst: "Billede af udlejningsbil",
        kategori: "SUV",
        beskrivelse: "Ideelt valg hvis du er på flugt fra Politiet",
        personer: "5",
        kufferter: "4",
        tillaeg: "300",
        class: "cybertruck-img cybertruck-translate"
    },
    {
      bilmaerke: "Tesla Model Y",
      billede: "img/modely.png",
      billedtekst: "Billede af udlejningsbil",
      kategori: "SUV",
      beskrivelse: "Ikke så sexet som Model S, men det er en SUV",
      personer: "5",
      kufferter: "3",
      tillaeg: "100",
      class: "modely-img"
    },
    {
      bilmaerke: "Tesla Model 3",
      billede: "img/model3.png",
      billedtekst: "Billede af udlejningsbil",
      kategori: "Sedan",
      beskrivelse: "Til dig der ikke har råd til en Tesla",
      personer: "4",
      kufferter: "1",
      tillaeg: "0",
      class: "model3-img"
    },
    {
      bilmaerke: "Tesla Roadster",
      billede: "img/roadster.png",
      billedtekst: "Billede af udlejningsbil",
      kategori: "Spyder",
      beskrivelse: "Til dig der har for mange penge og ingen børn",
      personer: "2",
      kufferter: "0",
      tillaeg: "400",
      class: "roadster-img"
    },
  ];
  
  const sektion = document.getElementById('bil_sektion');
  const skabelon = document.getElementById('skabelon_output');
  const personer = document.getElementById('personer');
  const kufferter = document.getElementById('kufferter');
  const formular = document.getElementById('formular');
  const afhentningsdato = document.getElementById('afhentning');
  const afleveringsdato = document.getElementById('aflevering');
  
  formular.addEventListener("submit", function (event) {
  event.preventDefault();
  sektion.innerHTML = ""; //Nulstiller output-sektion
    for (const bil of biler) {
        if (kufferter.value <= bil.kufferter && personer.value <= bil.personer) {
            let logo = document.querySelector(".waiting-logo");
            const antaldage = beregnAntalLejedage(afhentningsdato.value, afleveringsdato.value);
            const klon = skabelon.content.cloneNode(true);
            const bilMM = klon.querySelector(".bilMM");
            const billedtag = klon.querySelector(".img-wrapper");
            const kategori = klon.querySelector(".kategori");
            const beskrivelse = klon.querySelector(".beskrivelse")
            const antalpersoner = klon.querySelector(".antalpersoner");
            const antalkufferter = klon.querySelector(".antalkufferter");
            const lejeudgift = klon.querySelector(".lejeudgift");
            const link = klon.querySelector(".booknu_knap");

            logo.setAttribute("hidden", '')
            link.href = `udstyr.html?bil=${bil.bilmaerke}&afhentning=${afhentningsdato.value}&aflevering=${afleveringsdato.value}&lejedage=${antaldage}&lejeudgift=${beregnLejeudgift(antaldage, bil.tillaeg)}&billede=${bil.billede}&class=${bil.class}`;
            billedtag.innerHTML = "<img class='" + bil.class + "' src='" + bil.billede + "' alt='" + bil.billedtekst + "'>";
            bilMM.textContent = bil.bilmaerke;
            kategori.textContent += bil.kategori;
            beskrivelse.textContent += bil.beskrivelse;
            antalkufferter.textContent += bil.kufferter;
            antalpersoner.textContent += bil.personer;
            lejeudgift.textContent = beregnLejeudgift(antaldage, bil.tillaeg) + " kr." ;
            sektion.appendChild(klon);
        }
    }
  })
  
  // instead of making it possible for the user to select an invalid date, we make it impossible to set the pickup date after the delivery date and vice verca,
  // We are also adjusting the default date to be equal to todays date, while also making it impossible to choose a date before todays date.

  $('.date-picker').val(new Date().toJSON().slice(0,10));

  function calenderRefresh() {
    afhentningsdato.setAttribute('min', afhentningsdato.value)
    afleveringsdato.setAttribute('min', afhentningsdato.value);
  }

  afhentningsdato.addEventListener('change', () =>  {
    afleveringsdato.setAttribute('min', afhentningsdato.value);
    if (afleveringsdato.value <= afhentningsdato.value) {
      afleveringsdato.value = afhentningsdato.value;
    }
  })
  
  afleveringsdato.addEventListener('change', () =>  {
    afhentningsdato.setAttribute('max', afleveringsdato.value);
  })

  function beregnAntalLejedage(afhentningsdato, afleveringsdato) {
  const AFHENTNING = new Date(afhentningsdato);
  const AFLEVERING = new Date(afleveringsdato);
  const FORSKELITID = AFLEVERING.getTime() - AFHENTNING.getTime();
  const FORSKELIDAGE = FORSKELITID / (1000 * 3600 * 24) + 1;
  return FORSKELIDAGE;
  }
  
  function beregnLejeudgift(antaldage, biltillaeg) {
  const MOMS = 0.25;
  const GRUNDBELOEB = 700;
  const PRISPRDAG = 100;
  const LEJEUDGIFT = (GRUNDBELOEB + (antaldage * PRISPRDAG) + (antaldage * biltillaeg)) * (1 + MOMS);
  return LEJEUDGIFT.toFixed(2);
  }
  