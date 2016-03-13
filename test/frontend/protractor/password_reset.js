var Config = require('../../../config.json');



describe('Password reset page: ', function() {
	var reset_url = Config.web_host + "recovery";
	
	
	 beforeEach(function() {
	        ptor = protractor.getInstance();
	 });
	 
	 it("should be valid page", function(){
		 browser.get(reset_url);
		 expect(browser.getCurrentUrl()).toEqual(reset_url);
		 expect(ptor.isElementPresent(by.name('email'))).toEqual(true);
		 expect(ptor.isElementPresent(by.id('btn_ProcessRecovery'))).toEqual(true);
		 expect(browser.getTitle()).toEqual('Password Recovery');
	 });
	 
	 it("should enable submit on valid data", function(){
		 var submit = element(by.id('btn_ProcessRecovery'));
		 var email = element(by.name('email'));
		 
		 expect(browser.getCurrentUrl()).toEqual(reset_url);		 		 		 

		 email.sendKeys("invalidemail@inexistent.no");
		 
		 
		 submit.click().
		 	then(function(){
		 		expect(browser.getCurrentUrl()).toEqual(reset_url);
		 	});
		 
	 });
	 
	 
});