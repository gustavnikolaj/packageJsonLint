var expect = require('unexpected').clone();
var sinon = require('sinon');
var sortedAlphabetically = require('../../lib/checks/sortedAlphabetically')();

expect.installPlugin(require('unexpected-sinon'));

describe('lib/checks/sortedAlphabetically', function () {
    it('should be a method', function () {
        expect(sortedAlphabetically, 'to be a function');
    });

    it('should return true if a list is sorted sorted alphabetically', function () {
        var packageMock = {
            warn: sinon.spy(),
            packageDescription: {
                propName: {
                    bar: 'bar',
                    foo: 'foo'
                }
            }
        };
        sortedAlphabetically(packageMock, 'propName');
        expect(packageMock.warn, 'was not called');
    });
    
    it('should return false if a list is not sorted sorted alphabetically', function () {
        var packageMock = {
            warn: sinon.spy(),
            packageDescription: {
                propName: {
                    foo: 'foo',
                    bar: 'bar'
                }
            }
        };
        sortedAlphabetically(packageMock, 'propName');
        expect(packageMock.warn, 'was called once');
    });

    it('should not complain if the object has no such property', function () {
       var packageMock = {
            warn: sinon.spy(),
            packageDescription: {}
        };
        sortedAlphabetically(packageMock, 'propName');
        expect(packageMock.warn, 'was not called');
    });

});
