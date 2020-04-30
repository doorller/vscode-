const vscode = require('vscode');
const util = require('./util');
const path = require('path');
const fs = require('fs')
/**
 * 自动提示实现，这里模拟一个很简单的操作
 * 当输入 this.dependencies.xxx时自动把package.json中的依赖带出来
 * 当然这个例子没啥实际意义，仅仅是为了演示如何实现功能
 * @param {*} document 
 * @param {*} position 
 * 
 */
function provideCompletionItems(document, position) {
    const line        = document.lineAt(position);
    /** 项目地址 例如: d:\工作\商户后台 */
    const projectPath = util.getProjectPath(document);

    // 这行的内容,例如: this.$api
    const s此行内容 = line.text.substring(0, position.character);


    // 只要当前光标前的字符串为`this.$api.`都自动带出所有的依赖
    // store 下面的提示
    if(/(^|=| )this+\.\$api\.$/g.test(s此行内容)) {
        let api_path = path.join(projectPath,'src/js/config/api.js')
        let apiStr = ''
        try {
            apiStr = fs.readFileSync(api_path, 'utf-8')
        } catch (error) {
            
        }
        let apiArray =apiStr.match(/\s{2,4}\w+(?=:\s{1}{)/g)
        const apis = apiArray.map(key=>{
            let index = apiStr.indexOf(key)
            let 两个提示内容 = apiStr.slice(index-20,index+key.length)
            let arr = 两个提示内容.split('\n')
            let api = (key||'').replace(/\s+/g,'')
            let item = api+arr[arr.length-2]
            return item
        })
        return apis.map(dep => {
            // vscode.CompletionItemKind 表示提示的类型
            return new vscode.CompletionItem(dep, vscode.CompletionItemKind.Field);
        })
    }
    if(s此行内容.indexOf('store.4355435')!==-1) {
        let 需要的路径 = path.join(projectPath,'/src/store/module/app.js')
        let 里面的文字 = fs.readFileSync(需要的路径, 'utf-8')
        let export的index = 里面的文字.indexOf('export default')
        const 需要的文字 = 里面的文字.slice(export的index+14)
        console.log('需要的文字: ', 需要的文字);
        let obj
        obj = eval('obj = '+需要的文字)
        console.log('需要的文字: ', obj);

    }
}

/**
 * 光标选中当前自动补全item时触发动作，一般情况下无需处理
 * 
 */
function resolveCompletionItem() {
    return null;
}

module.exports = function(context) {
    // 注册代码建议提示，只有当按下“.”时才触发
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider('vue', {
        provideCompletionItems,
        resolveCompletionItem
    }, '.'));
};