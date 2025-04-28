const list = document.querySelector('.list');
const counts = document.querySelector('.counts');


fetch('https://restcountries.com/v3.1/all') 
    .then((response) => {
        return response.json()
    })
    .then((data) => {
console.log(data);

        function renderCountris() {

            counts.textContent = data.length;
            list.innerHTML = ``;

        data.forEach((item, index) => {
// console.log(item);

            let li = document.createElement('li');
            li.setAttribute('class', 'li-list');

            let countries = document.createElement('span');
            countries.setAttribute('class', 'countris');
            
            let country = document.createElement('span');
            country.setAttribute('class', 'countrys');
            country.textContent = item.name.common;
            
            let imgs = document.createElement('img');
            imgs.setAttribute('class', 'flag');
            imgs.setAttribute('src', `${item.flags.png}`);
            
            let textpop = document.createElement('span');
            textpop.setAttribute('class', 'textpop');
            textpop.textContent = 'Population:';

            let population = document.createElement('span');
            population.setAttribute('class', 'population');
            population.textContent = item.population;
            let maps = document.createElement('a');
            maps.setAttribute('class', 'googleMaps');
            maps.setAttribute('href', item.maps.googleMaps);
            maps.setAttribute('target', '_blank');
            maps.textContent = 'GoogleMaps'


            let btclosed = document.createElement('button');
            btclosed.setAttribute('class', 'btclosed');
            btclosed.setAttribute('data-index', `${index}`);
            btclosed.textContent = `X`;

            list.appendChild(li);
            li.appendChild(countries);
            countries.appendChild(country);
            countries.appendChild(imgs);
            countries.appendChild(textpop);
            countries.appendChild(population);
            countries.appendChild(maps);
            li.appendChild(btclosed);

        })

    } 

                       // Popup

    document.addEventListener('click', (e) => {
        const index = e.target.getAttribute('data-index');

        if(e.target.classList.contains('btclosed')) {
            data.splice(index, 1);
        }
        else if(e.target.classList.contains('countrys') || e.target.classList.contains('population') || e.target.classList.contains('flag') || e.target.classList.contains('textpop') || e.target.classList.contains('li-list')) {
            let card = e.target.closest('.li-list');
            let imgs = card.querySelector('.flag').src;
            let title = card.querySelector('.countrys').textContent;
            let populations = card.querySelector('.population').textContent;
            let map = card.querySelector('.googleMaps').href;

            const imgPopup = document.querySelector('.imgPopup');
            const titlePopup = document.querySelector('.titlePopup');
            const totalPopup = document.querySelector('.totalPopup');
            const googlePopup = document.querySelector('.googlePopup');

            imgPopup.src = imgs;
            titlePopup.textContent = title;
            totalPopup.textContent = `Population: ${populations}`;
            googlePopup.href = map;
            googlePopup.setAttribute('target', '_blank');
            googlePopup.textContent = 'GoogleMaps';

            document.querySelector('.bgpopup').classList.add('bgpopupclass');
            
        }

        document.querySelector('.btclosedPopup').addEventListener('click', () => {
            document.querySelector('.bgpopup').classList.remove('bgpopupclass');
        });

        renderCountris();

    })

    renderCountris();

    });
