var expect = require('chai').expect;


describe('test main page', function () {

    var randomUsername = '';
    var pass = "12312312";
    before(function () {
        randomUsername = Math.random().toString(36).substr(2, 10);
    });

    beforeEach(function () {

        browser.url('http://localhost:3000/rssDialog');
        while (true) {
            if (browser.getValue('form>div>input[name="0"]')) {
                browser.setValue('form>div>input[name="0"]', ['#', '\uE003']);
                browser.pause(50);
            } else {
                break;
            }
        }
        browser.setValue('form>div>input[name="0"]', ['#', '\uE003']);
        browser.click('[value=Save]');
        browser.waitUntil(function () {
            return browser.isExisting('.toast-message') == false;
        }, 10000);

    });

    it('should check if main page is loaded correctly when user is not logged', function () {
        browser.url('http://localhost:3000/');

        expect(browser.isVisible('=Sign up')).to.equal(true);
        expect(browser.isVisible('=Login')).to.equal(true);
        expect(browser.isVisible('=Home')).to.equal(true);

        expect(browser.isVisible('=Zobrazit více')).to.equal(false);
        expect(browser.isVisible('=Logout')).to.equal(false);
        expect(browser.isVisible('=Categories')).to.equal(false);
        expect(browser.isVisible('=Manage Rss')).to.equal(false);
    });

    it('should sign up', function () {
        browser.url('http://localhost:3000/');
        browser.click('a=Sign up');

        browser.setValue('[name=user]', randomUsername);
        browser.setValue('[name=pass]', pass);
        browser.setValue('[name=pass2]', pass);
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

    it('should check if main page is loaded correctly when user is logged - without any category', function () {
        browser.url('http://localhost:3000/');

        expect(browser.isVisible('=Sign up')).to.equal(false);
        expect(browser.isVisible('=Login')).to.equal(false);
        expect(browser.isVisible('=Zobrazit více')).to.equal(false);
        expect(browser.isVisible('=Home')).to.equal(true);
        expect(browser.isVisible('=Logout')).to.equal(true);
        expect(browser.isVisible('=Categories')).to.equal(true);
        expect(browser.isVisible('=Manage RSS')).to.equal(true);
    });

    it('add 1 category \"Science\" and 1 url - and check correct load', function () {
        browser.url('http://localhost:3000/rssDialog');
        browser.setValue('form>div>input[name="0"]', 'Science');
        var element = browser.element('form>div:nth-child(1)');
        element.setValue('[data-url="0"]', 'https://www.svethardware.cz/export.jsp?format=rss2');

        browser.click('[value=Save]');
        browser.pause(100);
        expect(browser.isExisting('.red')).to.equal(false);
        browser.waitForVisible('.toast-message', 10000, true);

        browser.url('http://localhost:3000/');
        browser.waitForVisible('button=Zobrazit více', 10000);
        expect(browser.isVisible('=Science')).to.equal(true);

        expect(browser.getAttribute('=Svět hardware', 'href')).to.equal('https://www.svethardware.cz/');
        var elementClass = browser.getAttribute('#app > div > div > div > div > div > div > div:nth-child(1) > div.collapseItem > span', 'class');
        expect(elementClass).to.equal('glyphicon glyphicon-collapse-down');
        browser.click('#app > div > div > div > div > div > div > div:nth-child(1) > div.collapseItem');
        browser.waitForVisible('.glyphicon-collapse-up', 10000);
    });

    it('add new category \"Games\" and 2 urls in it - check on main page', function () {

    });
    /* 
        it('should check functions of sidebar menu', function () {
    
        });
    */

    after(function () {
        browser.url('http://localhost:3000/');
        browser.click('=Logout');
        browser.waitForVisible('.toast-message', 10000, true);
    });
});
