// 检查 node npm 版本
require('./check-versions')();

process.env.NODE_ENV = 'production';

const ora = require('ora'); // node 终端的 loading 图
const rm = require('rimraf'); // 用于深度删除模块
const path = require('path');
const chalk = require('chalk'); // 命令行彩色输出
const webpack = require('webpack');
const config = require('../config');
const webpackConfig = require('./webpack.prod.conf');

// loading
const spinner = ora('building for production...');
spinner.start();

/*
   使用 rimraf 将旧的编译输出的文件夹删除，然后重新编译生成
   rimraf(f: 路径, [opts], callback: 回调)
*/
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
   if (err) throw err;
   webpack(webpackConfig, function(error, stats) {
      spinner.stop();
      if (error) throw error;
		//  输出提示信息
      process.stdout.write(`${stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
         })}\n\n`);

      if (stats.hasErrors()) {
         console.log(chalk.red('  Build failed with errors.\n'));
         process.exit(1);
      }

      console.log(chalk.cyan('  Build complete.\n'));
      console.log(chalk.yellow('  Tip: built files are meant to be served over an HTTP server.\n' +
               "  Opening index.html over file:// won't work.\n"));
   });
});
