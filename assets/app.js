'use strict';

const shell = require('electron').shell;
const counter = require('./assets/badge');
const config = require('./config.json');

const refreshTimeout = (config.refreshEvery || 20) * 1000;	// in sec.
let refreshTimer = null;

const ghUrl = config.url.replace(/\/$/, '') + '/notifications/participating';
const wvUrl = `file://${__dirname}\\assets\\webview.js`;
const html = `<webview id="webview" src="${ghUrl}" preload="${wvUrl}" partition="persist:github"></webview>`;

document.getElementById('app').innerHTML = html;
const webview = document.getElementById('webview');


function refresh () {
	if (refreshTimer) clearTimeout(refreshTimer);
	refreshTimer = setTimeout(refresh, refreshTimeout);
	if (webview.send) webview.send('reload');
}

function goto (lnk) { shell.openExternal(lnk); }
function log (txt) { console.log(txt); }
function loading() { webview.style.opacity = 0; }
function loadingStop() { webview.style.opacity = 1; }

function init () {
	loading();
	webview.addEventListener('dom-ready', loadingStop);
	webview.addEventListener('ipc-message', function (ev) {
		const handlers = { counter, goto, log };
		const fn = handlers[ev.channel];
		if (typeof fn === 'function') fn.apply(fn, ev.args);
	});
	refresh();		// start cycle
}

init();
