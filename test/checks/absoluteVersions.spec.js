var expect = require('unexpected').clone();
var sinon = require('sinon');
var absoluteVersions = require('../../lib/checks/absoluteVersions')();

expect.installPlugin(require('unexpected-sinon'));

describe('lib/checks/absoluteVersions', function () {
    it('should be a method', function () {
        expect(absoluteVersions, 'to be a function');
    });
    it('should allow an absolute version', function () {
        var packageMock = {
            warn: sinon.spy(),
            packageDescription: {
                propName: {
                    foo: '=1',
                    bar: '=2'
                }
            }
        };
        absoluteVersions(packageMock, 'propName');
        expect(packageMock.warn, 'was not called');
    });
    it('should not allow ^ marked version', function () {
        var packageMock = {
            warn: sinon.spy(),
            packageDescription: {
                propName: {
                    foo: '=1',
                    bar: '^2'
                }
            }
        };
        absoluteVersions(packageMock, 'propName');
        expect(packageMock.warn, 'was called with',
            'propName', '"bar"', 'is not referencing absolute version', '(^2)'
        );
    });
    it('should not allow ~ marked version', function () {
        var packageMock = {
            warn: sinon.spy(),
            packageDescription: {
                propName: {
                    foo: '=1',
                    bar: '~2'
                }
            }
        };
        absoluteVersions(packageMock, 'propName');
        expect(packageMock.warn, 'was called with',
            'propName', '"bar"', 'is not referencing absolute version', '(~2)'
        );
    });
});
