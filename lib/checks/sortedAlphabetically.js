module.exports = function () {
    return function sortedAlphabetically(packageJsonLint, property) {
        var packageJson = packageJsonLint.packageDescription;
        if (packageJson.hasOwnProperty(property)) {
            var propertyValue = packageJson[property];
            var list = Object.keys(propertyValue);
            var sortedList = list.slice(0);
            sortedList.sort();
            if (sortedList.join() !== list.join()) {
                packageJsonLint.warn('"' + property + '"', 'are not sorted alphabetically');
            }
        }
    };
};
