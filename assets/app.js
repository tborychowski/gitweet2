'use strict';

const shell = require('electron').shell;
const badge = require('./assets/badge');
const config = require('./config.json');

const refreshTimeout = (config.refreshEvery || 20) * 1000;	// in sec.
let refreshTimer = null;

const ghUrl = config.url.replace(/\/$/, '') + '/notifications/participating';
const wvUrl = `file://${__dirname}\\assets\\webview.js`;
const html = `<webview id="webview" src="${ghUrl}" preload="${wvUrl}" partition="persist:github"></webview>`;

document.getElementById('app').innerHTML = html;

const webview = document.getElementById('webview');
webview.style.opacity = 0;
webview.addEventListener('dom-ready', function() {
	webview.style.transition = 'opacity .5s ease-out';
	webview.style.opacity = 1;
});

webview.addEventListener('ipc-message', function (ev) {
	const handlers = { counter, reload, goto, log };
	const fn = handlers[ev.channel];
	if (typeof fn === 'function') fn.apply(fn, ev.args);
});

function refresh () {
	if (refreshTimer) clearTimeout(refreshTimer);
	refreshTimer = setTimeout(refresh, refreshTimeout);
	// console.log('refreshed');
}

function counter (co) {
	badge(co);
}

function reload () {
	webview.reload();
}

function goto (lnk) {
	shell.openExternal(lnk);
}

function log (txt) {
	console.log(txt);
}

// start cycle
refresh();
