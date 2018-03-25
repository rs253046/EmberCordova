const {
  exec
} = require('child_process');

console.log('Building...');
var yourscript = exec('cd cordova-manual/mobileStore && cordova build',
  (error, stdout, stderr) => {
    console.log(`${stdout}`);
    console.log(`${stderr}`);
    if (error !== null) {
      console.log(`exec error: ${error}`);
    }
  });