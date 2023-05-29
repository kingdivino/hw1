
const form = document.querySelector('form');
form.addEventListener('submit', search);
const modalView = document.querySelector('#modal-view');
modalView.addEventListener('click', onModalClick);
const audio = new Audio('./suoni/finito.mp3');

function onClick(event){
	const src = event.currentTarget.src;
	const cartaimg = document.createElement('img');
	cartaimg.src = src;
	document.body.classList.add('no-scroll');
	modalView.style.top = window.pageYOffset + 'px';
	modalView.appendChild(cartaimg);
	modalView.classList.remove('hidden');
}

function onModalClick(){
	modalView.classList.add('hidden');
	modalView.innerHTML = '';
	document.body.classList.remove('no-scroll');
}

function search(event)
{
    event.preventDefault();

    const carta_input = document.querySelector('#carta');
    const carta_value = encodeURIComponent(carta_input.value);
    console.log('Eseguo ricerca: ' + carta_value);

	fetch('api.php?q=' + encodeURIComponent(carta_value)).then(onResponse).then(onJson_hs);
    
}

function onResponse(response) {
	console.log('Risposta ricevuta');
	return response.json();
}


function onJson_hs(json){
	console.log('JSON ricevuto');
	// Svuotiamo la libreria
	const library = document.querySelector('#center-view');
	library.innerHTML = '';
	const results = json;
	console.log(json);
	let num_results = results.length;
	// Processa ciascun risultato
	for(let i=0; i<num_results; i++){
		// Leggi il documento
	  	const carta_data = results[i];
	  	// Leggiamo info
	  	const images = results[i].img;
		const imagegold = results[i].imgGold;
		const id = results[i].cardId;
	  	const title = carta_data.name;
		if (carta_data.img !== undefined ){
			let selected_image = images;
			
			// Creiamo il div che conterrà immagine e didascalia
			const carta = document.createElement('div');
			carta.classList.add('carta');
			// Creiamo l'immagine
			const img = document.createElement('img');
			img.src = selected_image;
			img.classList.add('aprimodale');
			// Creiamo la didascalia
			const caption = document.createElement('span');
			caption.classList.add('caption');
			caption.textContent = title;
			//aggiungo il campo hidden per l'id
			const campoid = document.createElement('a');
			campoid.classList.add('id');
			campoid.textContent = id;
			//aggiungo il pulsante per i preferiti
			const icon = document.createElement('img');
			icon.src = ('./immagini/iconblack.png');
			icon.classList.add('icon');
			icon.addEventListener('click', addCollection);
			// Aggiungiamo immagine, icona e didascalia al div
			carta.appendChild(campoid);
			carta.appendChild(img);
			carta.appendChild(icon);
			carta.appendChild(caption);
			// Aggiungiamo il div alla libreria
			library.appendChild(carta);
			
			//mettiamo la gold se c'è
			if(carta_data.imgGold !== undefined){
				const caption = document.createElement('span');
				caption.classList.add('caption');
				caption.textContent = title;
				let selected_gold = imagegold;
				const cartagold = document.createElement('div');
				cartagold.classList.add('carta');
				const img_gold = document.createElement('img');
				img_gold.src = selected_gold;
				img_gold.classList.add('aprimodale');
				const campoidgold = document.createElement('a');
				campoidgold.classList.add('id');
				campoidgold.textContent = id;
				const icongold = document.createElement('img');
				icongold.src = ('./immagini/iconblack.png');
				icongold.classList.add('icon');
				icongold.addEventListener('click', addCollection);
				cartagold.appendChild(campoidgold);
				cartagold.appendChild(img_gold);
				cartagold.appendChild(icongold);
				cartagold.appendChild(caption);
				library.appendChild(cartagold);
			}
			
		}
	  
	}

	const bottoni = document.querySelectorAll(".aprimodale");
	for (let bottone of bottoni){
		bottone.addEventListener("click", onClick);
	}
	audio.play();
}

function addCollection(event){
	const icona = event.currentTarget;
	icona.src = ('./immagini/icon.png');
	icona.removeEventListener('click', addCollection);
	const id = icona.parentNode.querySelector('.id').textContent;
	const img = icona.parentNode.querySelector('.aprimodale').src;
	const nome = icona.parentNode.querySelector('.caption').textContent;
	fetch("addcollection.php?" + "codice=" + id + "&img=" + img + "&nome=" + nome).then(onResponse).then(onJson_addc);
	icona.addEventListener('click', removeCollection);
	console.log('Aggiunto ai preferiti');
}

function removeCollection(event){
	const icona = event.currentTarget;
	icona.src = ('./immagini/iconblack.png');
	icona.removeEventListener('click', removeCollection);
	const id = icona.parentNode.querySelector('.id').textContent;
	fetch('removecollection.php?' + "codice=" + id).then(onResponse).then(onJson_addc);
	icona.addEventListener('click', addCollection);
	console.log('Rimosso dai preferiti');
}

function onJson_addc(json){
	console.log(json);
	if(json.errore != undefined){
		console.log(json.errore);
		alert(json.errore);
	}
	else{
		alert('carta aggiunta ai preferiti');
	}
}