
var fs = require("fs")
var logger = require('./logger')
    ; require("colors");
var fileCopy = require("./fileCopy")
function copyLoop(src, dst) {
    var dirs = fs.readdir(src, function (err, stats) {
        if (err) {
            logger.error(err);
            throw err;
        }
        stats.forEach(function (stat) {
            var _src = src + "/" + stat;
            var _dst = dst + "/" + stat;
            fs.stat(_src, function (err, stat) {
                if (err) {
                    logger.error(err);
                    throw err;
                }
                if (stat.isFile()) fileCopy(_src, _dst)
                else {
                    copyLoop(_src, _dst)
                }
            })
        })
    });
}
module.exports = function (src, dst) {
    var directories = dst.split("/")
    var dst_isFile = /\./g.test(directories[directories.length - 1])
    if (dst_isFile) {
        logger.error("创建失败，目标路径非法".red)
        return
    }
    copyLoop(src, dst)
}