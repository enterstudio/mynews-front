'use strict';

describe('Midway: Module Verification >', function() {

    var module;
    var test = it;

    // --
    // Pre Test Setup
    // --

    before(function() {
        module = angular.module('MyNewsApp');
    });

    // --
    // Tests
    // --

    test('MyNewsApp Module should be registered', function() {
        module.should.not.equal(null);
    });

    describe('Dependencies:', function() {

        var deps;
        var has_module = function(m) {
            return deps.indexOf(m) >= 0;
        }

        before(function() {
            deps = module.value('appName').requires;
        });

        test('Sanity: Should not have NyanCat as dependency', function() {
            has_module('NyanCat').should.not.be.ok;
        });

        test('Should have MyNewsApp.Controllers as dependency', function() {
            has_module('MyNewsApp.Controllers').should.be.ok;
        });

        test('Should have MyNewsApp.Directives as dependency', function() {
            has_module('MyNewsApp.Directives').should.be.ok;
        });

        test('Should have MyNewsApp.Services as dependency', function() {
            has_module('MyNewsApp.Services').should.be.ok;
        });

        test('Should have MyNewsApp.Models as dependency', function() {
            has_module('MyNewsApp.Models').should.be.ok;
        });

        test('Should have CommonModels as dependency', function() {
            has_module('CommonModels').should.be.ok;
        });

    });

    // --
    // Post Test Teardown
    // --

    after(function() {

    });

});