'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

app.on('window-all-closed', app.quit);
app.on('ready', () => {
	let mainWindow = new BrowserWindow({
		title: 'Gitweet',
		icon:'assets/icon.png',
		show: false,
		autoHideMenuBar: true,
		width: 400,
		height: 600,
		// frame: false,
		// transparent: true
	});

	mainWindow.loadURL('file://' + __dirname + '/index.html');
	mainWindow.show();

	mainWindow.on('closed', () => mainWindow = null);
});
