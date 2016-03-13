'use strict';

describe('UserProfileController', function() {

    // --
    // Suite Setup
    // --

    beforeEach(angular.mock.module('MyNewsApp'));

    // --
    // Tests
    // --

    it('UserProfileController should exist', function() {

        for (var i in MyNewsApp) {
            dump('MyNewsApp.' + i + ' ::');
            dump(MyNewsApp[i]);
        }

        MyNewsApp.should.not.be.null;

        Alerts.should.not.be.null;
    });

    // --
    // Suite Teardown
    // --

    // ~~

});