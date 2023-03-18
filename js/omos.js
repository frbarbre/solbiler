// * MapBox

mapboxgl.accessToken = 'pk.eyJ1IjoiZnJlZDk4OTEiLCJhIjoiY2xmYXh0bndwMmZ4YzN6bnRhOTZoa3BiZCJ9.ajDp70TNtFQ5XE4cKiArYQ'; 
    const map = new mapboxgl.Map({
      container: 'map',
      // Replace YOUR_STYLE_URL with your style URL.
      style: 'mapbox://styles/fred9891/clfay1fef000701o11lcmhfh2', 
      center: [10.168478,
        56.148532],
      zoom: 10.7
    });

/* 
Add an event listener that runs
  when a user clicks on the map element.
*/
map.on('click', (event) => {
    // If the user clicked on one of your markers, get its information.
    const features = map.queryRenderedFeatures(event.point, {
      layers: ['solbiler-aiebde'] // replace with your layer name
    });
    if (!features.length) {
      return;
    }
    const feature = features[0];
  
    /* 
    Create a popup, specify its options 
    and properties, and add it to the map.
  */
const popup = new mapboxgl.Popup({ offset: [0, -31] })
.setLngLat(feature.geometry.coordinates)
.setHTML(
  `<h3 style="margin-bottom: 0.3rem;">${feature.properties.name}</h3>
  <a href="https://goo.gl/maps/o5YGwe9f8SeKwgHZA" target="_blank" style="color: var(--black); margin-bottom: 0.3rem;">Lokesvej 10, 8230 Åbyhøj</a>
  <p><strong>Mandag-Fredag</strong> <br> 08:00-17:00</p>
  <p><strong>Lørdag</strong> <br> 10:00-15:00</p>
  <p><strong>Søndag</strong> <br> Lukket</p>`
)
.addTo(map);
  });

// * Video animated onScroll

const canvas = document.querySelector(".omos-video");
const text = document.querySelector(".welcome");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const context = canvas.getContext("2d");
const frameCount = 461;

const currentFrame = (index) => `./video/frames/${(index + 1).toString()}.png`;

const images = [];
let ball = { frame: 0 };

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  images.push(img);
}

gsap.to(ball, {
  frame: frameCount - 1,
  snap: "frame",
  ease: "none",
  scrollTrigger: {
    scrub: 0.5,
    pin: "canvas",
    end: "1000%",
  },
  onUpdate: render,
});

gsap.fromTo(
  ".welcome",
  {
    opacity: 0,
  },
  {
    opacity: 1,
    scrollTrigger: {
      scrub: 1,

      start: "20%",
      end: "90%",
    },
  onComplete: () => {
    gsap.to(".welcome", { opacity: 0 });
  },
  }
);

images[0].onload = render;

function render() {
  context.canvas.width = images[0].width;
  context.canvas.height = images[0].height;

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(images[ball.frame], 0, 0);
}