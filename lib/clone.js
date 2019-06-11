var fs = require("fs");
var path = require("path");
var fileCopy = require("./fileCopy")
var fileDirectory = require("./fileDirectory")
var logger = require('./logger')
    ; require("colors");

var root = process.cwd();
/**
 * 克隆者
 * @param {*} source 源文件目录
 * @param {*} dest 目标路径
 */
function cloner(source, dest) {
    this.source = source;
    this.dest = dest;
}

cloner.prototype = {
    clone: function clone() {
        var _source = /^\.\/*/.test(this.source) ? path.resolve(root, this.source.replace(/^\.\/*/, "")) : this.source;
        var _dest = /^\.\/*/.test(this.dest) ? path.resolve(root, this.dest.replace(/^\/*/, "")) : this.dest;
        var source_exist = fs.existsSync(_source)
        if (!source_exist) {
            logger.error("操作失败，源文件不存在".red)
            return;
        }
        // 判断当前路径是文件还是文件夹：
        // * 若为文件则直接拷贝文件内容
        // * 若为文件夹则拷贝文件夹下所有内容
        fs.stat(_source, function (err, stat) {
            if (err) {
                logger.error(err.red);
                throw err
            }
            else {
                if (stat.isFile()) {
                    // 拷贝文件
                    fileCopy(_source, _dest)
                } else {
                    fileDirectory(_source, _dest)
                }
            }
        })
    },
}
module.exports = cloner;