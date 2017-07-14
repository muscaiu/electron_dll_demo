const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow(
    {
      width: 800,
      height: 600,
      webPreferences: {
        plugins: true
      }
    })

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

// app.commandLine.appendSwitch('ppapi-flash-path', path.join(__dirname + '/lib/pepflashplayer.dll'))

app.commandLine.appendSwitch('ppapi-flash-path', path.join((__dirname.includes(".asar") ? process.resourcesPath : __dirname) + '/app/lib/pepflashplayer.dll'))

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})

