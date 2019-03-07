// spec.js
describe('Tvil auth', function() {
  it('test', function() {
  	const baseUrl = 'http://tvil.ru';
    const email = 'smaktun7@dginozator.com';
    const password = '9390095';
    // const password = '9390094_faik';

    const cResult = {0: "Fail", 1: "Passed"};

    const formUsernameId = 'AuthForm_username';
    const formPassId = 'AuthForm_password';
    const authButtonCss = '#authorization button';
    const dropdownMenuCss = 'a.dropdown-toggle';
    const logOutButtonCss = 'a[href*="logout"]';

    var result = {value: 1};

  	browser.waitForAngularEnabled(false);
  	browser.ignoreSynchronization = true;
    browser.get(baseUrl, 10000);

    element(by.css('a[class*="ButtonLogin"]')).click();

    var until = protractor.ExpectedConditions;

    browser.driver.sleep(1000);

    browser.wait(until.presenceOf(element(by.id(formUsernameId))), 5000, 'Element taking too long to appear in the DOM');

    element(by.id(formUsernameId)).sendKeys(email).then(()=>{
    	browser.driver.sleep(1000);
    	return element(by.id(formPassId)).sendKeys(password);
    }).then(()=>{
    	browser.driver.sleep(1000);
    	element(by.css(authButtonCss)).click();
    });

		browser.wait(until.stalenessOf(element(by.id(formUsernameId))), 5000, 'Element taking too long to disappear in the DOM')
		.then(()=>{
			browser.wait(until.presenceOf(element(by.css(logOutButtonCss))), 5000, 'Element taking too long to appear in the DOM');
			element(by.css(dropdownMenuCss)).click();
			element(by.css(logOutButtonCss)).click().then(()=>{
				result.value = 1;
				console.log(cResult[result.value]);
			}).catch(()=>{
				result.value = 0;
				console.log(cResult[result.value]);
			});
		})
		.catch(()=>{
			result.value = 0;
			console.log(cResult[result.value]);
		});

		browser.driver.sleep(3000);
  });
});