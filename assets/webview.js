'use strict';

const msg = require('electron').ipcRenderer.sendToHost;
const readFile = require('fs').readFileSync;
const cssFile = './assets/webview.css';

function reload () {
	setTimeout(() => {
		document.querySelector('.filter-list .filter-item.selected').click();
		setTimeout(setCounter, 500);
		setTimeout(setCounter, 1500);
	}, 500);
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
		msg('goto', el.href);
		reload();
		e.preventDefault();
	}
	else if (el.matches('.delete *')) {
		reload();
	}
}

function init () {
	setCounter();
	updateCss();
}

document.addEventListener('click', onClick, true);
document.addEventListener('DOMContentLoaded', init);
