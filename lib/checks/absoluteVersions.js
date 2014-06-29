module.exports = function () {
    return function absoluteVersions(packageJsonLint, property) {
        var propertyNameSingular = property.replace(/ies$/, 'y');
        var packageJson = packageJsonLint.packageDescription;
        if (packageJson.hasOwnProperty(property)) {
            var propertyValue = packageJson[property];
            Object.keys(propertyValue).forEach(function (packageName) {
                if (!(/^=/.test(propertyValue[packageName]))) {
                    packageJsonLint.warn(
                        propertyNameSingular,
                        '"' + packageName + '"',
                        'is not referencing absolute version',
                        '(' + propertyValue[packageName] + ')'
                    );
                }
            });
        }
    };
};
