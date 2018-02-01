/*
   检查 node vue 版本
*/
const chalk = require('chalk'); // 命令行字体颜色美化
const semver = require('semver'); // 版本解析插件
const packageConfig = require('../package.json');
const shell = require('shelljs'); // node 中使用 shell 命令

function exec(cmd) {
   // child_process 开启子进程，并执行 cmd 命令 然后返回结果
   return require('child_process')
      .execSync(cmd)
      .toString()
      .trim();
}

const versionRequirements = [
   {
      name: 'node',
      /*
         semver.clean(version) 能格式化版本号
         例如：'  =v1.2.3   ' -> '1.2.3'
      */
      currentVersion: semver.clean(process.version),
      versionRequirement: packageConfig.engines.node
   }
];

// shell.which('命令')在系统的路径搜索命令, 如果用的是 npm 就检查 npm 版本
if (shell.which('npm')) {
   versionRequirements.push({
      name: 'npm',
      currentVersion: exec('npm --version'),
      versionRequirement: packageConfig.engines.npm
   });
}

module.exports = function() {
   const warnings = [];
   for (let i = 0; i < versionRequirements.length; i++) {
      const mod = versionRequirements[i];
      /*
      semver.satisfies('当前版本'，'版本范围')
      用于判断版本是否符合需求，不符合要求则加入警告
   */
      if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
         warnings.push(`${mod.name}: ${chalk.red(mod.currentVersion)} should be ${chalk.green(mod.versionRequirement)}`);
      }
   }

   // 警告输出
   if (warnings.length) {
      console.log('');
      console.log(chalk.yellow('To use this template, you must update following to modules:'));
      console.log();
      for (let i = 0; i < warnings.length; i++) {
         const warning = warnings[i];
         console.log(`  ${warning}`);
      }
      console.log();
      process.exit(1);
   }
};
