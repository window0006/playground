const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');
const chalk = require('chalk');

const [a, b, cmd, projectName] = process.argv;

const projectPath = path.join(__dirname, `../${projectName}`);

if (!fs.existsSync(projectPath)) {
  console.log(
    chalk.red(`can not find project ${projectName}`)
  );
  return;
}

const promisifySpawn = (...args) => new Promise((resolve, reject) => {
  const sh = spawn(...args);

  sh.stdout.on('data', data => {
    console.log(data.toString());
  });

  sh.on('error', err => {
    console.log(
      chalk.red(`[run ${cmd} ${projectName}] Error: \n${err.message}`)
    );
  });

  sh.on('close', resolve);
});

;(async () => {
  await promisifySpawn('npm', ['run', cmd], {
    cwd: projectPath,
  });
})();
