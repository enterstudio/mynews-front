var Config = require('../../../config.json');



describe('Login Page: ', function() {
    var login_url = Config.web_host + "login";
    var home_url = Config.web_host + "#/feed";
    var flagUrl;
    var ptor = protractor.getInstance();
    ptor.ignoreSynchronization = true;

    beforeEach(function() {
        ptor = protractor.getInstance();
    });

    it('should redirect back to /login after a /logout', function() {
        browser.get(Config.web_host + "logout");
        expect(browser.getCurrentUrl()).toEqual(login_url);
    });

    it('should be valid login page', function() {
        browser.get(login_url);
        expect(browser.getCurrentUrl()).toEqual(login_url);
        expect(ptor.isElementPresent(by.name('name'))).toEqual(true);
        expect(ptor.isElementPresent(by.name('password'))).toEqual(true);
        expect(ptor.isElementPresent(by.id('btn_ProcessLogin'))).toEqual(true);
        expect(browser.getTitle()).toEqual('Log into MyNews');
    });

    it('should be able to change pages without crashing', function() {
        expect(browser.getCurrentUrl()).toEqual(login_url);
        browser.get(Config.web_host + 'register');
        expect(browser.getCurrentUrl()).toEqual(Config.web_host + 'register');
        browser.get(login_url);
        expect(browser.getCurrentUrl()).toEqual(login_url);
    });

    it("should enable login submit on valid form data", function() {
        var name = element(by.name('name'));
        var password = element(by.name('password'));
        var submit = element(by.id('btn_ProcessLogin'));

        submit.getAttribute('disabled')
            .then(function(disabled) {
                // Submit button should initially be disabled.
                expect(disabled).toBe('true');

                name.sendKeys('test');
                password.sendKeys('somepassword');

                expect(submit.getAttribute('disabled')).toBe(null);
                expect(name.getAttribute('value')).toBe('test');
                expect(password.getAttribute('value')).toBe('somepassword');
            });
    });

    it("should return to /login on bad credentials", function() {
        var name = element(by.name('name'));
        var password = element(by.name('password'));
        var submit = element(by.id('btn_ProcessLogin'));

        expect(submit.getAttribute('disabled')).toBe(null);
        expect(name.getAttribute('value')).toBe('test');
        expect(password.getAttribute('value')).toBe('somepassword');

        submit.click()
            .then(function() {
                expect(browser.getCurrentUrl()).toEqual(login_url);
            });
    });

    it('should accept admin credentials and change page to /#/feed', function() {
        expect(browser.getCurrentUrl()).toEqual(login_url);

        browser.get(login_url);
        var name = element(by.name('name'));
        var password = element(by.name('password'));
        var submit = element(by.id('btn_ProcessLogin'));
        var user_span=element(by.css('.username'));

        name.clear();
        password.clear();

        name.sendKeys('admin');
        password.sendKeys('administrator');

        expect(name.getAttribute('value')).toBe('admin');
        expect(password.getAttribute('value')).toBe('administrator');

        submit.click();
           
        expect(browser.getCurrentUrl()).toEqual(home_url);
        expect(user_span.getInnerHtml()).toBe(" Super Admin ");

           
    });

    it('should logout again properly', function() {
        browser.get(Config.web_host + "logout");
        expect(browser.getCurrentUrl()).toEqual(login_url);
    });
});