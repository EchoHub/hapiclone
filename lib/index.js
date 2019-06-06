var hapi = require("commander");
var pkg = require("./../package.json");
var cloner = require("./clone");
hapi
    .version(pkg.version, "-v, --version")
    .description(pkg.description)
    .command("clone <source> <dest>")
    .description("拷贝源文件/目录至目标文件/目录")
    .action(function (arg1, arg2) {
        var cloneman = new cloner(arg1, arg2);
        cloneman.clone();
    })
hapi.parse(process.argv)