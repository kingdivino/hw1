fetch('loadcollection.php').then(onResponse).then(onJson_load);
const modalView = document.querySelector('#modal-view');
modalView.addEventListener('click', onModalClick);

function onResponse(response){
    console.log('caricamento collection');
    return response.json();
}

function onJson_load(json){
    console.log('caricato');
    console.log(json);
    const library = document.querySelector('#center-view');
	library.innerHTML = '';
    const results = json.carte;
    for(let i=0; i<results.length; i++){
        const carta_data = results[i];
        const image = carta_data.img;
        const id = carta_data.idcarta;
        const nome =carta_data.nomecarta;

        const carta = document.createElement('div');
        carta.classList.add('carta');
        const img = document.createElement('img');
        img.src = image;
        img.classList.add('aprimodale');
        const caption = document.createElement('span');
        caption.classList.add('caption');
        caption.textContent = nome;
        const campoid = document.createElement('a');
        campoid.classList.add('id');
        campoid.textContent = id;
        const icon = document.createElement('img');
        icon.src = ('./immagini/icon.png');
        icon.classList.add('icon');
        icon.addEventListener('click', removeCollection);
        carta.appendChild(campoid);
        carta.appendChild(img);
        carta.appendChild(icon);
        carta.appendChild(caption);
        library.appendChild(carta);
    }
    const bottoni = document.querySelectorAll(".aprimodale");
	for (let bottone of bottoni){
		bottone.addEventListener("click", onClick);
	}
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