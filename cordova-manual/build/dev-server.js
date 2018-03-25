var fs = require('fs');
var path = require('path');
var os = require('os');

require('dns').lookup(require('os').hostname(), function(err, add, fam) {
  console.log('addr: ' + add);
})

function removeFileContent(dirPath) {
  try {
    var files = fs.readdirSync(dirPath);
  } catch (e) {
    return;
  }
  if (files.length > 0)
    for (var i = 0; i < files.length; i++) {
      var filePath = dirPath + '/' + files[i];
      if (fs.statSync(filePath).isFile())
        fs.unlinkSync(filePath);
      else
        removeFileContent(filePath);
    }
  fs.rmdirSync(dirPath);

}

removeFileContent(process.env.PWD + '/cordova-manual/mobileStore/www');
var fs = require('fs');
fs.mkdirSync(process.env.PWD + '/cordova-manual/mobileStore/www');
fs.copyFile(process.env.PWD + '/cordova-manual/build/bin/livereload/index.html', process.env.PWD + '/cordova-manual/mobileStore/www/index.html', (err) => {
  if (err) throw err;
  console.log('source.txt was copied to destination.txt');
});