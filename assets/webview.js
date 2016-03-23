'use strict';

const ipc = require('electron').ipcRenderer;
const msg = ipc.sendToHost;
const readFile = require('fs').readFileSync;
const cssFile = './assets/webview.css';
let timer;

function reload (delay) {
	if (timer) clearTimeout(timer);
	delay = (typeof delay === 'number' ? delay : 500);
	timer = setTimeout(() => {
		document.querySelector('.filter-list .filter-item.selected').click();
		setTimeout(setCounter, 500);
		setTimeout(setCounter, 1500);
	}, delay);
}

function setCounter () {
	const sel = '.filter-list a[href="/notifications/participating"] .count';
	const co = document.querySelector(sel).innerHTML;
	msg('counter', co);
}

function updateCss () {
	let css;
	try { css = readFile(cssFile, 'utf8'); } catch (e) { css = ''; }

	const style = document.createElement('style');
	style.innerHTML = css;
	document.head.appendChild(style);
	document.querySelector('.accessibility-aid').remove();
}

function onClick (e) {
	const el = e.target, sel = '.notifications-list .js-navigation-open';

	if (el.matches(sel)) {
		e.preventDefault();
		msg('goto', el.href);
		reload(2000);
	}
	else if (el.matches('.delete *')) reload(2000);
}

function init () {
	setCounter();
	updateCss();
	ipc.on('reload', reload);
	document.addEventListener('click', onClick, true);
}


document.addEventListener('DOMContentLoaded', init);
