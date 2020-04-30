// const vscode = require('vscode');

/**
 * 插件被激活时触发，所有代码总入口
 * @param {*} context 插件上下文
 */
exports.activate = function(context) {
    
    require('./src/helloword')(context); // helloworld
    // require('./test-command-params')(context); // 测试命令参数
    // require('./test-menu-when')(context); // 测试菜单when命令
    // require('./jump-to-definition')(context); // 跳转到定义
    require('./src/completion')(context); // 自动补全
    require('./src/hover')(context); // 悬停提示
    // require('./webview')(context); // Webview
    // require('./welcome')(context); // 欢迎提示
    // require('./other')(context); // 其它杂七杂八演示代码
    // // this.dependecies.
    // const testFn = require('./test-require-function');
    // testFn(1, 2);

    // 自动提示演示，在dependencies后面输入.会自动带出依赖
    
};

/**
 * 插件被释放时触发
 */
exports.deactivate = function() {
    
};
