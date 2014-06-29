var fs = require('fs');
var Path = require('path');
var chalk = require('chalk');

function PackageJsonLint(packageJsonContent, stopOnWarning) {
    this.checkQueue = [];
    this.packageDescription = packageJsonContent;
    this.warnings = 0;
}

PackageJsonLint.registerCheck = function (name, check) {
    PackageJsonLint.prototype[name] = function () {
        this.checkQueue.push({
            name: name,
            check: check(),
            args: Array.prototype.slice.call(arguments, 0)
        });
        return this;
    };
};

PackageJsonLint.prototype.warn = function () {
    this.warnings += 1;
    var args = Array.prototype.slice.call(arguments, 0);
    args = [chalk.red(' ✘ ERROR:')].concat(args);
    console.log.apply(console, args);
};

PackageJsonLint.prototype.log = function () {
    var args = Array.prototype.slice.call(arguments, 0);
    console.log.apply(console, args);
};

PackageJsonLint.prototype.exit = function () {
    if (arguments.length) {
        var args = Array.prototype.slice.call(arguments, 0);
        args = [chalk.red(' ✘ ERROR:')].concat(args);
        console.log.apply(console, args);
    }
    process.exit(1);
};

PackageJsonLint.prototype.run = function (report) {
    var that = this;
    that.checkQueue.forEach(function (check) {
        var initWarnings = that.warnings;
        check.check.apply(
            null, [that].concat(check.args)
        );
    });
    if (that.warnings > 0) {
        that.exit();
    } else {
        that.log(chalk.green(' ✔ '), 'Linting passed.');
    }
};

fs.readdirSync(Path.resolve(__dirname, 'checks')).forEach(function (fileName) {
    PackageJsonLint.registerCheck(
        fileName.replace(/.js$/, ''),
        require(Path.resolve(__dirname, 'checks', fileName))
    );
});

module.exports = PackageJsonLint;
