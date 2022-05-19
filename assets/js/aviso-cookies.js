const switchCookiesOk = document.getElementById('cookies-not-ok-button');
const switchCookiesNotOk = document.getElementById('cookies-ok-button');
const cookiesOkBar = document.getElementById('cookies-not-ok');
const cookiesNotOkBar = document.getElementById('cookies-ok');

if(localStorage.getItem('cookies-aceptadas')){
	cookiesNotOkBar.style.bottom = '-150px';
	cookiesOkBar.style.bottom = '0px';
}
else{
	cookiesNotOkBar.style.bottom = '0px';
	cookiesOkBar.style.bottom = '-150px';
}

switchCookiesOk.addEventListener('click', e => {
	e.preventDefault();
	console.log("beep")
	localStorage.removeItem('cookies-aceptadas');
	cookiesOkBar.style.bottom = '0px';
	cookiesNotOkBar.style.bottom = '-150px';
});
switchCookiesNotOk.addEventListener('click', e => {
	e.preventDefault();
	localStorage.setItem('cookies-aceptadas', 'true');
	cookiesOkBar.style.bottom = '-150px';
	cookiesNotOkBar.style.bottom = '0px';
})