'use strict';

const config = require('../config.json');
const ipc = require('electron').ipcRenderer;
const msg = ipc.sendToHost;
const readFile = require('fs').readFileSync;
const cssFile = './assets/webview.css';
let timer, offset;

function reload (delay) {
	delay = (typeof delay === 'number' ? delay : 500);
	if (timer) clearTimeout(timer);
	offset = document.body.scrollTop;
	timer = setTimeout(() => {
		document.querySelector('.filter-list .filter-item.selected').click();
		setTimeout(setCounter, 500);
		setTimeout(setCounter, 1500);
	}, delay);
}

function updateScrollOffset () {
	if (typeof offset === 'number') {
		document.body.scrollTop = offset;
		if (document.body.scrollTop > 0) offset = null;
	}
}

function setCounter () {
	updateScrollOffset();
	const href = '/notifications' + (config.participating ? '/participating' : '');
	const co = document.querySelector(`.filter-list a[href="${href}"] .count`).innerHTML;
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
	const el = e.target;

	if (el.matches('.notifications-list .js-navigation-open')) {
		e.preventDefault();
		msg('goto', el.href);
		reload(2000);
	}
	else if (el.matches('.delete *')) {
		reload(2000);
	}
}

function init () {
	setCounter();
	updateCss();
	ipc.on('reload', reload);
	document.addEventListener('click', onClick, true);
}


document.addEventListener('DOMContentLoaded', init);
