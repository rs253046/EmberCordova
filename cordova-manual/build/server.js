var fs = require('fs');
var path = require('path');

function copyFileSync(source, target) {
  var targetFile = target;
  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isDirectory()) {
      targetFile = path.join(target, path.basename(source));
    }
  }
  fs.writeFileSync(targetFile, fs.readFileSync(source));
}


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

function copyFolderRecursiveSync(source, target) {
  var files = [];
  var targetFolder = path.join(target, path.basename(source));
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder);
  }

  if (fs.lstatSync(source).isDirectory()) {
    files = fs.readdirSync(source);
    files.forEach(function(file) {
      var curSource = path.join(source, file);
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, targetFolder);
      } else {
        copyFileSync(curSource, targetFolder);
      }
    });
  }
}

removeFileContent(process.env.PWD + '/cordova-manual/mobileStore/www');
copyFolderRecursiveSync(process.env.PWD + '/dist', process.env.PWD + '/cordova-manual/mobileStore');
fs.renameSync(process.env.PWD + '/cordova-manual/mobileStore/dist', process.env.PWD + '/cordova-manual/mobileStore/www');