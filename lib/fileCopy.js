
var fs = require("fs")
var mkdirp = require('mkdirp');
var logger = require('./logger')
    ; require("colors");
function writeFile(src, dst, content, isFile) {
    var _fileName = "";
    if (!isFile) {
        var _directories = src.split("/");
        _fileName = _directories[_directories.length - 1]
    }
    _dst = !isFile ? dst.replace(/\/*$/, "") + "/" + _fileName : dst.replace(/\/*$/, "");
    fs.writeFile(_dst, content, function (err) {
        if (err) {
            logger.error(err.red);
            throw err;
        }
        var desc = "拷贝成功 0.0~ \n" + "源文件：" + src.green + "\n目标文件：" + dst.green
        logger.info(desc)
    })

}
module.exports = function (src, dst) {
    var content = fs.readFileSync(src, { encoding: "utf8" });
    var dst_exsit = fs.existsSync(dst)
    var directories = dst.split("/");
    var fileName = directories[directories.length - 1];
    var directoryPath;
    var isFile = /\./g.test(fileName);
    if (!dst_exsit) {
        if (isFile) {
            directoryPath = directories.slice(0, directories.length - 1).join("/")
        } else {
            directoryPath = dst
        }
        mkdirp(directoryPath, function (err, a) {
            if (err) {
                logger.error(err.red);
                throw err;
            }
            writeFile(src, dst, content, isFile)
        })
    } else {
        writeFile(src, dst, content, isFile)
    }
}