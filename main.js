const { app, BrowserWindow, session } = require('electron');
const path = require('path');

// 创建窗口
function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1000,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            // devTools: true // 开启调试工具
        }
    });
    mainWindow.maximize();
    // 加载Vue.js应用程序
    mainWindow.loadURL(`file://${path.join(__dirname, 'dist', 'index.html')}`);
    mainWindow.setMenu(null);


    // 处理关闭事件
    mainWindow.on('close', (event) => {
        // 如果应用程序没有在后台运行，禁止关闭窗口
        if (!app.isQuiting) {
            event.preventDefault();
            mainWindow.destroy();
        }
    });


}

// 当应用程序准备就绪时创建窗口
app.whenReady().then(() => {
    createWindow();

    // 如果没有窗口，则退出
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });

    // 添加关闭事件处理程序
    app.on('before-quit', () => {
        const ses = session.defaultSession;
        ses.clearCache(() => {
            console.log('Cache cleared!');
        });
        ses.clearStorageData({
            storages: ['cookies'],
            quotas: ['persistent', 'syncable']
        }, () => {
            console.log('Cookies cleared!');
            app.quit();
        });


    });

    // 当所有窗口都关闭时退出应用程序
    app.on('window-all-closed', function () {
        if (process.platform !== 'darwin') app.quit();
    });

    app.on('close', function () {
        mainWindow.destroy()
    })
});


