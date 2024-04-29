//import { createClient } from 'pexels';


function modificacolore(event) {
    const bot = event.currentTarget;
    const colo = bot.style.backgroundColor;
    if (colo === "white") {
        bot.style.backgroundColor = "#CCCCCC";
    } else {
        bot.style.backgroundColor = "white";

    }
};
const botton = document.getElementById("bot");
botton.addEventListener("click", modificacolore);


function bottoni(event) {
    const bottone = event.currentTarget;
    var bottone1 = document.querySelector('#bott1');
    var bottone2 = document.querySelector('#bott2');


    if (bottone === document.getElementById("bot1")) {
        bott1.classList.add('hidden');
        bott2.classList.remove('hidden');
        const img = document.querySelector('header');
        img.style.backgroundImage = "url('https://amabilejewels.it/media/slideshow/cache/1440x680/wysiwyg/prov1.jpg')";
    }
    else if (bottone === document.getElementById("bot2")) {
        bott1.classList.remove('hidden');
        bott2.classList.add('hidden');
        const img = document.querySelector('header');
        img.style.backgroundImage = "url('https://amabilejewels.it/media/slideshow/cache/1440x680/wysiwyg/banner-collezione-circle-orizzontale.jpg')"

    }


}
const bot1 = document.getElementById("bot1");
const bot2 = document.getElementById("bot2");
bot1.addEventListener("click", bottoni);
bot2.addEventListener("click", bottoni);


let indice = 0;
const slides = document.querySelectorAll('.ma');

function showSlide(index) {
    slides.forEach(slide => {
        slide.classList.add('hidden');
    });
    for (let i = index; i < index + 4; i++) {
        slides[i].classList.remove('hidden');
    }
}

function prevSlide() {
    if (indice === 0) return;
    indice--;
    showSlide(indice);
}

function nextSlide() {
    if (indice >= slides.length - 3) return;
    indice++;
    showSlide(indice);
}

showSlide(indice);

let indice2 = 0;
const slides2 = document.querySelectorAll('.ok');

function showSlide2(index) {
    slides2.forEach(slide2 => {
        slide2.classList.add('hidden');
    });
    for (let i = index; i < index + 4; i++) {
        slides2[i].classList.remove('hidden');
    }
}

function prevSlide2() {
    if (indice2 === 0) return;
    indice2--;
    showSlide2(indice2);
}

function nextSlide2() {
    if (indice2 >= slides2.length - 3) return;
    indice2++;
    showSlide2(indice2);
}

showSlide2(indice2);



const RIGHT_ARROW = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1083533/forward-arrow.png';
const DOWN_ARROW = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1083533/down-arrow.png';

function toggle(event) {
    const details = document.querySelector('.details');
    const image = event.currentTarget.querySelector('img');
    const text = event.currentTarget.querySelector('span');

    isVisible = !isVisible;
    if (isVisible) {
        details.classList.remove('hidden');
        image.src = DOWN_ARROW;
        text.textContent = 'Nascondi dettagli';
    } else {
        details.classList.add('hidden');
        image.src = RIGHT_ARROW;
        text.textContent = 'Mostra altro';
    }
}
let isVisible = false;

const detailToggle = document.querySelector('.show-details');
detailToggle.addEventListener('click', toggle);




function searchImages() {
    var query = document.getElementById('searchQuery').value;
    var url = 'https://api.unsplash.com/search/photos?query=' + encodeURIComponent(query) + '&client_id=cENvgh3iwvQfsRoKGFEoRHIVRza28mMHj7HVDL5nCmM';

    // Cancella le immagini precedenti
    document.getElementById('modalContent').innerHTML = '';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            data.results.forEach(result => {
                var img = document.createElement('img');
                img.src = result.urls.regular;
                document.getElementById('modalContent').appendChild(img);
            });
            openModal();
        })
        .catch(error => console.error('Errore durante la ricerca delle immagini:', error));
}

// Funzione per aprire la modale
function openModal() {
    document.getElementById('myModal').style.display = 'block';
}

// Funzione per chiudere la modale
function closeModal() {
    document.getElementById('myModal').style.display = 'none';
}

// Chiudi la modale cliccando fuori da essa
window.onclick = function (event) {
    var modal = document.getElementById('myModal');
    if (event.target == modal) {
        closeModal();
    }
}

////////////////////////////////////////////////////////////////////////////////////////
// Funzione per mostrare la modale
function openCustomModal() {
    document.getElementById('customModal').style.display = 'block';
}

// Funzione per chiudere la modale
function closeCustomModal() {
    document.getElementById('customModal').style.display = 'none';
}

// Funzione per chiudere la modale se clicchi fuori
function closeIfClickedOutside(event) {
    if (event.target === document.getElementById('customModal')) {
        closeCustomModal();
    }
}

function onJson(json) {
    console.log('JSON ricevuto');
    const customModalContent = document.getElementById('customModalContent');
    customModalContent.innerHTML = ''; // Svuota il contenuto della modale
    const results = json.albums.items;
    for (let i = 0; i < results.length; i++) {
        const album_data = results[i];
        const title = album_data.name;
        const selected_image = album_data.images[0].url;
        const album = document.createElement('div');
        album.classList.add('album');
        const img = document.createElement('img');
        img.src = selected_image;
        const caption = document.createElement('span');
        caption.textContent = title;
        album.appendChild(img);
        album.appendChild(caption);
        customModalContent.appendChild(album);
    }
    openCustomModal(); // Apri la modale dopo aver aggiunto i contenuti
}

function onResponse(response) {
    console.log('Risposta ricevuta');
    return response.json();
}

function search(event) {
    event.preventDefault();
    const album_input = document.querySelector('#musica');
    const album_value = encodeURIComponent(album_input.value);
    console.log('Eseguo ricerca: ' + album_value);
    fetch("https://api.spotify.com/v1/search?type=album&q=" + album_value, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }).then(onResponse).then(onJson);
}

function onTokenJson(json) {
    token = json.access_token;
}

function onTokenResponse(response) {
    return response.json();
}

const client_id = '1c036b8f328d45ccbb3a9c8ade254a89';
const client_secret = 'c4d11ceb3bb6488ea00b15ae3162aac6';
let token;

fetch("https://accounts.spotify.com/api/token", {
    method: "post",
    body: 'grant_type=client_credentials',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
    }
}).then(onTokenResponse).then(onTokenJson);

const form = document.getElementById('searchForm');
form.addEventListener('submit', search);