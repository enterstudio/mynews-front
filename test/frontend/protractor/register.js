var Config          = require('../../../config.json');
var Core            = require('../../../node_modules/mynews-common');
var crypto          = require('crypto');
var RID             = require('../../../utils/rid');

//
var User        = Core.Models.User;


Core.Database.connect(Core.Config, function(e) {
    if (e) {
        Util.log(e);
    }else{


	    describe('Registration Page: ', function() {
	    var register_url = Config.web_host + "register";
	    var login_url = Config.web_host + "login";
        var user_home_url = Config.web_host+"#/feed";
	    var ptor = protractor.getInstance();
	    ptor.ignoreSynchronization = true;
	    
	    //from inputs
	    var form_first_name = element(by.id('txt_Reg_FirstName'));
	    var form_last_name = element(by.id('txt_Reg_LastName'));
	    var form_email = element(by.id('txt_Reg_Email'));
	    var form_password = element(by.id('pwd_Reg_Password'));
	    var form_submit = element(by.id('btn_Reg_Submit'));
	
	    //test data
	    var test_valid_firstname = "Firstname";
	    var test_valid_lastname = "Lastname";
	    var test_valid_email = "t_inexistentemail@inexistent.no";
	    var test_invalid_email ="invalid_email";    
	    var test_valid_password = "validpassword";
	    var test_invalid_password = "short";	    	   
	    
	    beforeEach(function() {
	        ptor = protractor.getInstance();
	    });

	    
	    it('should be accessible from the login page', function() {
	        var registration_link = element(by.id('register-btn'));
	        var login_url=Config.web_host + "login";
	    	        
	        browser.get(login_url);    	
	        expect(browser.getCurrentUrl()).toEqual(login_url);
	        expect(registration_link.getAttribute("href")).toBe(register_url);
	    });
	
	    it('should be a valid page', function() {
	    	
	        browser.get(register_url);
	        expect(browser.getCurrentUrl()).toEqual(register_url);
	        expect(form_first_name.getAttribute("value")).toBe("");
	        expect(form_last_name.getAttribute("value")).toBe("");
	        expect(form_email.getAttribute("value")).toBe("");
	        expect(form_password.getAttribute("value")).toBe("");
	        expect(form_submit.getAttribute("disabled")).toBe("true");
	    });
	    
	    it('should not accept invalid input', function() {
	    	
	        expect(browser.getCurrentUrl()).toEqual(register_url);
	    	
	        expect(form_submit.getAttribute("disabled")).toBe("true");
	        form_first_name.sendKeys(test_valid_firstname);
	        expect(form_first_name.getAttribute("value")).toBe(test_valid_firstname);
	        expect(form_submit.getAttribute("disabled")).toBe("true");
	    	
	        form_last_name.sendKeys(test_valid_lastname);
	        expect(form_last_name.getAttribute("value")).toBe(test_valid_lastname);
	        expect(form_submit.getAttribute("disabled")).toBe("true");
	        
	        form_email.sendKeys(test_invalid_email);
	        expect(form_email.getAttribute("value")).toBe(test_invalid_email);
	        expect(form_submit.getAttribute("disabled")).toBe("true");
	
	    	form_password.sendKeys(test_invalid_password);
	        expect(form_password.getAttribute("value")).toBe(test_invalid_password);
	        expect(form_submit.getAttribute("disabled")).toBe("true");
	        
	    });
	    
	    it("should accept valid input", function() {
	    	form_email.clear();
	        form_email.sendKeys(test_valid_email);
	        expect(form_email.getAttribute("value")).toBe(test_valid_email);
	        expect(form_submit.getAttribute("disabled")).toBe("true");
	        
	        form_password.clear();
	        form_password.sendKeys(test_valid_password);
	        expect(form_password.getAttribute("value")).toBe(test_valid_password);
	        expect(form_submit.getAttribute("disabled")).toBe(null);
	    });
	    
	    it("should register valid user", function() {
	    	var btn_continue = element(by.id("btn_Continue_to_Login"));
	    	
	    	form_submit.click();
	    	expect(browser.getCurrentUrl()).toEqual(register_url);
	    	expect(btn_continue.getAttribute("href")).toBe(login_url);
	    	
	    	btn_continue.click();
	    	expect(browser.getCurrentUrl()).toEqual(login_url);
	    });
	    
	    it("should activate the account", function (done) {
	    	var btn_continue = element(by.id("btn_Continue_to_Login"));
	    	
	    	User.Find({ where: { email: test_valid_email }}, function(err, found) {
	    			    		
	    		expect(found.email).toBe(test_valid_email);
	    		
	    		var ccode = found['@rid'] + '--nOlEt--' + found.email + '--NoLeT--' + found.handle;	            
	    		ccode = crypto.createHash('md5').update(ccode).digest("hex");
	            ccode = crypto.createHash('sha256').update(ccode).digest("hex");
	            var rid = RID.Encode(found['@rid']);
	            ccode = rid.split('.')[0] + '_' + ccode + '_' + rid.split('.')[1];
	            
	            var confirm_email = Config.web_host+'confirm/'+ccode;
	            browser.get(confirm_email);
	            
	            expect(btn_continue.getAttribute("href")).toBe(login_url);
	            done();
	    	});
	    });
	    
	    it("should login the new user", function() {
	    	browser.get(login_url);
	    	expect(browser.getCurrentUrl()).toEqual(login_url);
	    	
	        var name = element(by.name('name'));
	        var password = element(by.name('password'));
	        var submit = element(by.id('btn_ProcessLogin'));
	        var user_span=element(by.css('.username'));

	        name.clear();
	        password.clear();

	        name.sendKeys(test_valid_email);
	        password.sendKeys(test_valid_password);

	        expect(name.getAttribute('value')).toBe(test_valid_email);
	        expect(password.getAttribute('value')).toBe(test_valid_password);

	        submit.click();
	           
	        expect(browser.getCurrentUrl()).toEqual(user_home_url);
	        expect(user_span.getInnerHtml()).toBe(" "+test_valid_firstname+" "+test_valid_lastname+" ");
	        
	    });

        it("registered users should not be able to access the registration page", function() {
            expect(browser.getCurrentUrl()).toEqual(user_home_url);

            browser.get(register_url);
            expect(browser.getCurrentUrl()).toEqual(user_home_url);
        });

        it("should delete the test user", function(done){
            User.Find({ where: { email: test_valid_email }}, function(err, found) {
                found.delete();
                done();
            });
        });

	    
    });
}});


