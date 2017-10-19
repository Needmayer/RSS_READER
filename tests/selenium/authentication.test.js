var expect = require('chai').expect;
/*
describe('Rss reader login test', function () {
    var randomUsername = '';
    before(function () {
        randomUsername = Math.random().toString(36).substr(2, 10);
    });

    it('should check if login page is loaded properly', function () {
        browser.url('http://localhost:3000/');
        expect(browser.getText('a=Login')).to.equal('Login');
        browser.click('a=Login');

        expect(browser.getText('h1')).to.equal('Login to Your Account');
        expect(browser.getAttribute('[name=user]', 'placeholder')).to.equal('Username');
        expect(browser.getText('[name=user]')).to.equal('');
        expect(browser.getAttribute('[name=pass]', 'placeholder')).to.equal('Password');
        expect(browser.getText('[name=pass]')).to.equal('');
        expect(browser.getText('=Login')).to.equal('Login');
        expect(browser.isVisible('.red')).to.equal(false);
    });

    it('should return \'Password is required.\' message (wrong username and no password)', function () {
        browser.url('http://localhost:3000/');
        browser.click('a=Login');
        browser.setValue('[name=user]', randomUsername);
        browser.submitForm('[name=login]');

        browser.waitUntil(function () {
            return browser.isVisible('.red') == true;
        }, 10000);
        expect(browser.isVisible('.red')).to.equal(true);
        expect(browser.getText('.red')).to.equal('Password is required.');
    });

    it('should return \'invalid user or password\' message (wrong username and wrong password)', function () {
        browser.url('http://localhost:3000/');
        browser.click('a=Login');

        browser.setValue('[name=user]', randomUsername);
        browser.setValue('[name=pass]', 'passwd');
        browser.submitForm('[name=login]');
        browser.waitUntil(function () {
            return browser.isVisible('.red') == true;
        }, 10000);
        expect(browser.getText('.red')).to.equal('Invalid username or password.');
    });

    it('should return \'Username is required.\' message (no username and any password)', function () {
        browser.url('http://localhost:3000/');
        browser.click('a=Login');

        browser.setValue('[name=pass]', 'passwd');
        browser.submitForm('[name=login]');
        browser.waitUntil(function () {
            return browser.isVisible('.red') == true;
        }, 10000);
        expect(browser.getText('.red')).to.equal('Username is required.');
    });

    it('should return \'Username is required.\' message (no username no password)', function () {
        browser.url('http://localhost:3000/');
        browser.click('a=Login');
        browser.submitForm('[name=login]');
        browser.waitUntil(function () {
            return browser.isVisible('.red') == true;
        }, 10000);
        expect(browser.getText('.red')).to.equal('Username is required.');
    });


    it('should return \'The account is temporarily locked out.\' message (wrong username any password several times submited)', function () {
        var i = 0;
        for (i = 0; i < 6; i += 1) {
            browser.url('http://localhost:3000/');
            browser.click('a=Login');
            browser.setValue('[name=user]', randomUsername);
            browser.setValue('[name=pass]', randomUsername);
            browser.submitForm('[name=login]');
            browser.waitUntil(function () {
                return browser.isVisible('.red') == true;
            }, 10000);
        }
        expect(browser.getText('.red')).to.equal('The account is temporarily locked out.');
    });

    it('should login and redirect to home page', function () {
        browser.url('http://localhost:3000/');
        browser.click('a=Login');

        browser.setValue('[name=user]', 'tes');
        browser.setValue('[name=pass]', '12312312');
        browser.submitForm('[name=login]');
        browser.waitForExist('button=Zobrazit více', 10000);
        browser.waitForExist('a=Categories', 10000);

        expect(browser.isExisting('a=Categories')).to.equal(true)
        expect(browser.isExisting('=Logout')).to.equal(true);
        expect(browser.isExisting('[name=pass]')).to.equal(false);
        expect(browser.isExisting('=Login')).to.equal(false);
        expect(browser.isVisible('.red')).to.equal(false);
    });

    it('should be logged - then logout', function () {
        browser.url('http://localhost:3000/');

        expect(browser.isExisting('a=Categories')).to.equal(true)
        expect(browser.isExisting('=Logout')).to.equal(true);

        expect(browser.isExisting('[name=pass]')).to.equal(false);
        expect(browser.isExisting('=Login')).to.equal(false);
        expect(browser.isVisible('.red')).to.equal(false);

        browser.click('a=Logout');
        browser.waitUntil(function () {
            return browser.isExisting('.toast-message') == true;
        }, 10000);

        expect(browser.getText('.toast-message')).to.equal('You where succesfully logout.');

        browser.waitUntil(function () {
            return browser.isExisting('.toast-message') == false;
        }, 10000);
        browser.waitForExist('a=Login', 5000);

        expect(browser.isExisting('a=Login')).to.equal(true);
        expect(browser.isExisting('a=Sign up')).to.equal(true);
        expect(browser.isExisting('a=Logout')).to.equal(false);

        expect(browser.isExisting('=Zobrazit více')).to.equal(false);
        expect(browser.isExisting('=Svět hardware')).to.equal(false);

    });

});

describe('signup tests', function () {
    var randomUsername, longPassword = '123123123', shortPassword = '45678';
    before(function () {
        randomUsername = randomUsername = Math.random().toString(36).substr(2, 10);
    });

    it('should check if signup page is loaded properly', function () {
        browser.url('http://localhost:3000/');
        expect(browser.isExisting('a=Sign up')).to.equal(true);
        browser.click('a=Sign up');

        expect(browser.getText('h1')).to.equal('Create new account');
        expect(browser.getAttribute('[name=user]', 'placeholder')).to.equal('Username');
        expect(browser.getText('[name=user]')).to.equal('');
        expect(browser.getAttribute('[name=pass]', 'placeholder')).to.equal('Password');
        expect(browser.getText('[name=pass]')).to.equal('');
        expect(browser.getAttribute('[name=pass2]', 'placeholder')).to.equal('Password');
        expect(browser.getText('[name=pass2]')).to.equal('');
        expect(browser.isVisible('a=Sign up')).to.equal(true);
        expect(browser.isVisible('.red')).to.equal(false);
    });
    it('should return \'Username is required.\' message (empty inputs)', function () {
        browser.url('http://localhost:3000/');
        browser.click('a=Sign up');

        browser.click('[name=signup]');
        browser.waitForVisible('.red', 10000);

        expect(browser.isVisible('.red')).to.equal(true);
        expect(browser.getText('.red')).to.equal('Username is required.');
    });
    it('should return \'Username is required.\' message (no username any password)', function () {
        browser.url('http://localhost:3000/');
        browser.click('a=Sign up');

        browser.setValue('[name=pass]', shortPassword);
        browser.click('[name=signup]');
        browser.waitForVisible('.red', 10000);

        expect(browser.isVisible('.red')).to.equal(true);
        expect(browser.getText('.red')).to.equal('Username is required.');
    });
    it('should return \'Password must be at least 8 characters.\' message (username, no password)', function () {
        browser.url('http://localhost:3000/');
        browser.click('a=Sign up');

        browser.setValue('[name=user]', randomUsername);
        browser.click('[name=signup]');
        browser.waitForVisible('.red', 10000);

        expect(browser.isVisible('.red')).to.equal(true);
        expect(browser.getText('.red')).to.equal('Password must be at least 8 characters.');
    });

    it('should return \'Password must be at least 8 characters\' message (username, short password)', function () {
        browser.url('http://localhost:3000/');
        browser.click('a=Sign up');

        browser.setValue('[name=user]', randomUsername);
        browser.setValue('[name=pass]', shortPassword);
        browser.click('[name=signup]');
        browser.waitForVisible('.red', 10000);

        expect(browser.isVisible('.red')).to.equal(true);
        expect(browser.getText('.red')).to.equal('Password must be at least 8 characters.');
    });
    it('should return \'Passwords do not match.\' message (username, long + no password)', function () {
        browser.url('http://localhost:3000/');
        browser.click('a=Sign up');

        browser.setValue('[name=user]', randomUsername);
        browser.setValue('[name=pass]', longPassword);
        browser.click('[name=signup]');
        browser.waitForVisible('.red', 10000);

        expect(browser.isVisible('.red')).to.equal(true);
        expect(browser.getText('.red')).to.equal('Passwords do not match.');
    });
    it('should return \'Passwords do not match.\' message (username, long + short password)', function () {
        browser.url('http://localhost:3000/');
        browser.click('a=Sign up');

        browser.setValue('[name=user]', randomUsername);
        browser.setValue('[name=pass]', longPassword);
        browser.setValue('[name=pass2]', shortPassword);
        browser.click('[name=signup]');
        browser.waitForVisible('.red', 10000);

        expect(browser.isVisible('.red')).to.equal(true);
        expect(browser.getText('.red')).to.equal('Passwords do not match.');
    });

    it('should return \'Username already exists.\' message (existing username, correct passwords)', function () {
        browser.url('http://localhost:3000/');
        browser.click('a=Sign up');

        browser.setValue('[name=user]', 'tes');
        browser.setValue('[name=pass]', longPassword);
        browser.setValue('[name=pass2]', longPassword);
        browser.click('[name=signup]');
        browser.waitForVisible('.red', 10000);

        expect(browser.isVisible('.red')).to.equal(true);
        expect(browser.getText('.red')).to.equal('Username already exists.');
    });

    it('should signup new user and redirect to home page', function () {
        browser.url('http://localhost:3000/');
        browser.click('a=Sign up');

        browser.setValue('[name=user]', randomUsername);
        browser.setValue('[name=pass]', longPassword);
        browser.setValue('[name=pass2]', longPassword);
        browser.click('[name=signup]');

        browser.waitUntil(function () {
            return browser.isExisting('.toast-message') == true;
        }, 10000);
        expect(browser.getText('.toast-message')).to.equal('You where succesfully Sign up.');
        browser.waitUntil(function () {
            return browser.isExisting('.toast-message') == false;
        }, 10000);

        expect(browser.isVisible('=Login')).to.equal(false);
        expect(browser.isVisible('=Sign up')).to.equal(false);
        expect(browser.isVisible('=Logout')).to.equal(true);
        expect(browser.isVisible('=Categories')).to.equal(true);

    });

    it('should be logged - then logout', function () {
        browser.url('http://localhost:3000/');

        expect(browser.isExisting('a=Categories')).to.equal(true)
        expect(browser.isExisting('=Logout')).to.equal(true);

        expect(browser.isExisting('[name=pass]')).to.equal(false);
        expect(browser.isExisting('=Login')).to.equal(false);
        expect(browser.isVisible('.red')).to.equal(false);

        browser.click('a=Logout');
        browser.waitUntil(function () {
            return browser.isExisting('.toast-message') == true;
        }, 10000);

        expect(browser.getText('.toast-message')).to.equal('You where succesfully logout.');

        browser.waitUntil(function () {
            return browser.isExisting('.toast-message') == false;
        }, 10000);
        browser.waitForExist('a=Login', 5000);

        expect(browser.isExisting('a=Login')).to.equal(true);
        expect(browser.isExisting('a=Sign up')).to.equal(true);
        expect(browser.isExisting('a=Logout')).to.equal(false);

        expect(browser.isExisting('=Zobrazit více')).to.equal(false);
        expect(browser.isExisting('=Svět hardware')).to.equal(false);
    });

});
*/