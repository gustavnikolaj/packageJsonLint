var expect = require('unexpected').clone();
var sinon = require('sinon');
var PackageJsonLint = require('../lib/PackageJsonLint');

expect.installPlugin(require('unexpected-sinon'));

describe('lib/PackageJsonLint', function () {
    describe('Constructor', function () {
        it('should take an object as the argument', function () {
            var packageJson = {
                'name': 'test',
                'version': '1.0.1'
            };
            var packageJsonLint = new PackageJsonLint(packageJson);

            expect(packageJsonLint, 'to have properties', {
                checkQueue: [],
                packageDescription: {
                    name: 'test',
                    version: '1.0.1'
                }
            });
        });
    });
    describe('register check', function () {
        var packageJsonLint;
        var packageJson = {
            'name': 'test',
            'version': '1.0.1'
        };
        beforeEach(function () {
            packageJsonLint = new PackageJsonLint(packageJson);
        });
        it('create a method on the object', function () {
            expect(packageJsonLint.aTestCheck, 'not to be a function');

            var checkModule = function () { return function () {}; };
            PackageJsonLint.registerCheck('aTestCheck', checkModule);

            expect(packageJsonLint.aTestCheck, 'to be a function');
        });
        it('queue a task for execution', function () {
            var check = function CheckMethodForQueing() {};
            var checkModule = function () { return check; };
            PackageJsonLint.registerCheck('aTestCheck', checkModule);

            packageJsonLint.aTestCheck();

            expect(packageJsonLint.checkQueue, 'to equal', [{
                check: check,
                args: [],
                name: 'aTestCheck'
            }]);
        });
        it('run queued tasks', function () {
            packageJsonLint.log = sinon.stub(); // Silence test output
            var check = sinon.spy();
            var checkModule = function () { return check; };
            PackageJsonLint.registerCheck('aTestCheck', checkModule);

            packageJsonLint.aTestCheck().run();

            expect(check, 'was called once');
        });
    });
});
