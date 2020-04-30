const vscode = require('vscode');
const path = require('path');
const fs = require('fs');
const util = require('./util');

/**
 * 鼠标悬停提示，当鼠标停在package.json的dependencies或者devDependencies时，
 * 自动显示对应包的名称、版本号和许可协议
 * @param {*} document 
 * @param {*} position 
 * @param {*} token 
 */
// eslint-disable-next-line no-unused-vars
function provideHover (document, position, token) {
    // const fileName    = document.fileName;
    // const workDir     = path.dirname(fileName);
    /** 悬浮的内容 */
    const word = document.getText(document.getWordRangeAtPosition(position));
    const line = document.lineAt(position);

    const lineText = line.text.substring(0, position.character);

    // 匹配的内容,例如: this.$api
    if (lineText.indexOf('this.$api.') !== -1) {
        const projectPath = util.getProjectPath(document);
        let api_path = path.join(projectPath, 'src/js/config/api.js')
        let apiStr = ''
        try { apiStr = fs.readFileSync(api_path, 'utf-8') } catch (error) { }

        let apiIndex = apiStr.indexOf(word)

        if (apiIndex !== -1) {
            let 展示 = apiStr.slice(apiIndex - 30, apiIndex)

            if (展示) {
                return new vscode.Hover(展示)
            }
        }
    }

}

module.exports = function (context) {
    // 注册鼠标悬停提示
    context.subscriptions.push(vscode.languages.registerHoverProvider('vue', {
        provideHover
    }));
};