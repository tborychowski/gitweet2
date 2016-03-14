'use strict';

const ipc = require('electron').ipcRenderer;

function reload () {
	setTimeout(() => {
		document.querySelector('.filter-list .filter-item.selected').click();
	}, 500);
}

function setCounter () {
	const sel = '.filter-list a[href="/notifications/participating"] .count';
	const co = document.querySelector(sel).innerHTML;
	ipc.sendToHost('counter', co);
}

function updateCss () {
	const style = document.createElement('style');
	style.innerHTML = `
		.container { width: auto; }
		.main-content { padding: 0 20px 0 10px; }
		.header,
		.site-footer,
		.flash-full.js-notice,
		.tabnav,
		.notification-actions .mute
			{ display: none; }
		@media (max-width: 850px) {
			.main-content { padding: 0 10px; }
			.one-fourth { display: none; }
			.three-fourths { width: 100%; }
		}
	`;
	document.head.appendChild(style);
	document.querySelector('.accessibility-aid').remove();
}


function onClick (e) {
	const el = e.target, sel = '.notifications-list .js-navigation-open';

	if (el.matches(sel)) {
		ipc.sendToHost('goto', el.href);
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
