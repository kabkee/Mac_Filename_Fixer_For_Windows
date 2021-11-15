/** @format */

module.exports = {
    transpileDependencies: ['vuetify'],
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
            builderOptions: {
                productName: "Mac Filename Fixer For Windows",
                appId: 'kr.look360.kabkee.mac_filename_fixer_for_windows',
                mac: {
                  icon: 'src/assets/look360_favicon@3x.png',
                },
                win: {
                    "target": [
                        "nsis"
                    ],
                  icon: 'src/assets/look360_favicon@3x.png',
                  "requestedExecutionLevel": "asInvoker"
                },
                // "nsis": {
                //     "installerIcon": 'src/assets/look360_favicon.png',
                //     "uninstallerIcon": 'src/assets/look360_favicon.png',
                //     "uninstallDisplayName": "CPU Monitor",
                //     "license": "license.txt",
                //     "oneClick": false,
                //     "allowToChangeInstallationDirectory": true
                // },
                "asar": false
            }
        },
    },
};
