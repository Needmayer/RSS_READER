var expect = require('chai').expect;
/*
describe('Rss reader login test', function () {
    var randomUsername = '', password = '12312312';
    before(function () {

        randomUsername = Math.random().toString(36).substr(2, 14);
        var user = 'test12';
        var browserName = browser.desiredCapabilities.browserName;
        if (browserName == 'firefox') {
            user = 'test10';
        }
        browser.url('http://localhost:3000/login');
        browser.setValue('[name=user]', user);
        browser.setValue('[name=pass]', password);
        browser.submitForm('[name=login]');
        browser.waitForVisible('=Logout', 10000);
        expect(browser.isVisible('=Login')).to.equal(false);
        expect(browser.isVisible('=Sign up')).to.equal(false);
        expect(browser.isVisible('=Logout')).to.equal(true);
        expect(browser.isVisible('=Categories')).to.equal(true);
        expect(browser.isVisible('=Manage RSS')).to.equal(true);
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

    it('should check if manageRss page is corectly loaded', function () {
        browser.url('http://localhost:3000/');
        browser.click('a=Manage RSS');

        expect(browser.isVisible('h1=Manage your Rss')).to.equal(true);
        expect(browser.getAttribute('//*[@id="app"]/div/div/div/form/div[1]/input', 'placeholder')).to.equal('Category title');
        expect(browser.getAttribute('//*[@id="app"]/div/div/div/form/div[1]/div/input[1]', 'placeholder')).to.equal('rss feed url');

        expect(browser.isExisting('[name="1"]')).to.equal(false);
        expect(browser.isVisible('[value=Save]')).to.equal(true);
    });

    it(
        'should create 3 new titles, without any url - expect success message - Rss feeds saved' +
        'should remove middle title and rearange titles. No empty title inputs but the last', function () {
            browser.url('http://localhost:3000/');
            browser.click('a=Manage RSS');

            var i;
            for (i = 1; i < 4; i += 1) {
                expect(browser.isExisting('form>div>input[name= "' + (i - 1) + '"]')).to.equal(true);
                expect(browser.isExisting('form>div>input[name="' + i + '"]')).to.equal(false);
                browser.setValue('form>div>input[name="' + (i - 1) + '"]', ('Pokus' + i));
                browser.waitForVisible('form>div>input[name="' + i + '"]', 5000);
                // expect(browser.isVisible('form>div>input[name="' + i + '"]')).to.equal(true);
                expect(browser.getValue('form>div>input[name="' + i + '"]')).to.equal('');
                browser.pause(30);
            }

            expect(browser.isVisible('.red')).to.equal(false);
            browser.click('[value=Save]');

            browser.waitUntil(function () {
                return browser.isExisting('.toast-message') == true;
            }, 10000);
            expect(browser.getText('.toast-message')).to.equal('Rss feeds saved');
            browser.waitUntil(function () {
                return browser.isExisting('.toast-message') == false;
            }, 10000);

            browser.url('http://localhost:3000/');
            expect(browser.isExisting('=Zobrazit více')).to.equal(false);
            browser.click('a=Manage RSS');
            browser.pause(30);
            expect(browser.getValue('form>div>input[name="3"]')).to.equal('');
            browser.pause(30);
            browser.setValue('form>div>input[name="1"]', ['#', '\uE003']);
            expect(browser.isVisible('form>div>input[name="3"]')).to.equal(false);
            expect(browser.getValue('form>div>input[name="2"]')).to.equal('');
            expect(browser.getValue('form>div>input[name="1"]')).to.equal('Pokus3');
            browser.click('[value=Save]');
            browser.waitUntil(function () {
                return browser.isExisting('.toast-message') == false;
            }, 10000);
        });


    it('should remove empty url items but the last', function () {
        browser.url('http://localhost:3000/rssDialog');
        var i;
        for (i = 1; i < 3; i += 1) {
            expect(browser.isExisting('form>div>input[name= "' + (i - 1) + '"]')).to.equal(true);
            expect(browser.isExisting('form>div>input[name="' + i + '"]')).to.equal(false);
            browser.setValue('form>div>input[name="' + (i - 1) + '"]', ('Pokus' + i));
            browser.waitForVisible('form>div>input[name="' + i + '"]', 5000);
            expect(browser.getValue('form>div>input[name="' + i + '"]')).to.equal('');
            browser.pause(30);
        }
        var element = browser.element('form>div:nth-child(1)');
        for (i = 1; i < 5; i += 1) {
            expect(element.isExisting('[data-url="' + i + '"]')).to.equal(false);
            element.setValue('[data-url="' + (i - 1) + '"]', ('url' + i));
            browser.pause(50);
            expect(element.isExisting('[data-url="' + i + '"]')).to.equal(true);
            expect(element.getValue('[data-url="' + i + '"]')).to.equal('');
        }

        expect(element.getValue('[data-url="0"]')).to.equal('url1');
        expect(element.isExisting('[data-url="4"]')).to.equal(true);

        element.setValue('[data-url="0"]', ['#', '\uE003']);
        browser.pause(50);
        expect(element.getValue('[data-url="0"]')).to.equal('url2');
        expect(element.getValue('[data-url="1"]')).to.equal('url3');
        expect(element.getValue('[data-url="2"]')).to.equal('url4');
        expect(element.getValue('[data-url="3"]')).to.equal('');
        expect(element.isExisting('[data-url="4"]')).to.equal(false);

        element.setValue('[data-url="2"]', ['#', '\uE003']);
        browser.pause(50);
        expect(element.getValue('[data-url="0"]')).to.equal('url2');
        expect(element.getValue('[data-url="1"]')).to.equal('url3');
        expect(element.getValue('[data-url="2"]')).to.equal('');
        expect(element.isExisting('[data-url="3"]')).to.equal(false);
    });


    it('should not save if url in any category is filled but title of category is not - expected msg - \"Urls withnout category can not be saved\"', function () {
        browser.url('http://localhost:3000/rssDialog');
        expect(browser.isExisting('.red')).to.equal(false);
        expect(browser.setValue('[data-url="0"]', 'https://www.svethardware.cz/export.jsp?format=rss2'));
        browser.click('[value=Save]');
        browser.waitForVisible('.red', 2000);

        expect(browser.isExisting('.red')).to.equal(true);
        expect(browser.isExisting('.toast-message')).to.equal(false);
        expect(browser.getText('.red')).to.equal('Urls withnout category can not be saved');
    });

    it('filled wrong url in any category but title of category is not - expected msg - \"There is incorrect url\"', function () {
        browser.url('http://localhost:3000/rssDialog');
        expect(browser.isExisting('.red')).to.equal(false);
        expect(browser.setValue('[data-url="0"]', 'url'));
        browser.click('[value=Save]');
        browser.waitForVisible('.red', 2000);

        expect(browser.isExisting('.red')).to.equal(true);
        expect(browser.isExisting('.toast-message')).to.equal(false);
        expect(browser.getText('.red')).to.equal('There is incorrect url');
    });

    it('should show error message if \"There is incorrect url\" if is there any incorect url', function () {
        browser.url('http://localhost:3000/rssDialog');
        expect(browser.isExisting('.red')).to.equal(false);
        var element = browser.element('form>div:nth-child(1)');
        browser.setValue('form>div>input[name="0"]', 'Pokus');
        element.setValue('[data-url="0"]', 'url');

        browser.click('[value=Save]');
        browser.waitForVisible('.red', 2000);

        expect(browser.isExisting('.red')).to.equal(true);
        expect(browser.isExisting('.toast-message')).to.equal(false);
        expect(element.getAttribute('[data-url="0"]', "title")).to.equal('Error: Invalid URI \"url\"')
        expect(browser.getText('.red')).to.equal('There is incorrect url');
    });

    it('should show error message \"There is incorrect url\" if is there any incorect url - incorect in second category', function () {
        browser.url('http://localhost:3000/rssDialog');
        expect(browser.isExisting('.red')).to.equal(false);
        browser.setValue('form>div>input[name="0"]', 'Pokus');
        browser.setValue('form>div>input[name="1"]', 'Pokus1');
        var element = browser.element('form>div:nth-child(2)');

        element.setValue('[data-url="0"]', 'url0');
        element.setValue('[data-url="1"]', 'url1');

        browser.click('[value=Save]');
        browser.waitForVisible('.red', 2000);
        expect(browser.isExisting('.red')).to.equal(true);
        expect(browser.isExisting('.toast-message')).to.equal(false);
        expect(browser.getText('.red')).to.equal('There is incorrect url');
        expect(element.getAttribute('[data-url="0"]', "title")).to.equal('Error: Invalid URI \"url0\"')
        expect(element.getAttribute('[data-url="1"]', "title")).to.equal('Error: Invalid URI \"url1\"')
    });

    it('should show error message \"There is incorrect url\" if is there any incorect url - add few categories and add sevaral incorect urls in it. Then delete some', function () {
        browser.url('http://localhost:3000/rssDialog');
        expect(browser.isExisting('.red')).to.equal(false);
        browser.setValue('form>div>input[name="0"]', 'Pokus');
        browser.setValue('form>div>input[name="1"]', 'Pokus1');
        browser.setValue('form>div>input[name="2"]', 'Pokus2');
        browser.setValue('form>div>input[name="3"]', 'Pokus3');
        var element1 = browser.element('form>div:nth-child(1)');
        var element2 = browser.element('form>div:nth-child(2)');
        var element3 = browser.element('form>div:nth-child(3)');

        element1.setValue('[data-url="0"]', 'url 0 0');
        element1.setValue('[data-url="1"]', 'url 0 1');
        element1.setValue('[data-url="2"]', 'url 0 2');

        element2.setValue('[data-url="0"]', 'url 1 0');
        element2.setValue('[data-url="1"]', 'url 1 1');
        element2.setValue('[data-url="2"]', 'url 1 2');

        element3.setValue('[data-url="0"]', 'url 3 0');


        browser.click('[value=Save]');
        browser.waitForVisible('.red', 2000);

        expect(browser.isExisting('.red')).to.equal(true);
        expect(browser.isExisting('.toast-message')).to.equal(false);
        expect(browser.getText('.red')).to.equal('There is incorrect url');

        element1.setValue('[data-url="0"]', ['#', '\uE003']);
        element1.setValue('[data-url="1"]', ['#', '\uE003']);
        element2.setValue('[data-url="1"]', ['#', '\uE003']);

        browser.click('[value=Save]');
        browser.pause(250);
        expect(browser.isExisting('.red')).to.equal(true);
        expect(browser.isExisting('.toast-message')).to.equal(false);
        expect(browser.getText('.red')).to.equal('There is incorrect url');

        element1.clearElement('[data-url="0"]');        
        element1.setValue('[data-url="0"]', 'https://www.svethardware.cz/export.jsp?format=rss2');
        element2.clearElement('[data-url="0"]');
        element2.setValue('[data-url="0"]', 'https://www.svethardware.cz/export.jsp?format=rss2');

        browser.click('[value=Save]');
        browser.pause(50);

        expect(browser.isExisting('.red')).to.equal(true);
        expect(browser.isExisting('.toast-message')).to.equal(false);
        expect(browser.getText('.red')).to.equal('There is incorrect url');
        browser.pause(50);

        element2.clearElement('[data-url="1"]');
        element2.setValue('[data-url="1"]', 'https://www.svethardware.cz/export.jsp?format=rss2');

        element3.setValue('[data-url="0"]', ['#', '\uE003']);

        browser.click('[value=Save]');
        
        browser.waitForVisible('.red', 2000, true);

        expect(browser.isExisting('.red')).to.equal(false);
        expect(browser.isExisting('.toast-message')).to.equal(true);
        expect(browser.getText('.toast-message')).to.equal('Rss feeds saved');
    });


    it('should create 1 title with one url', function () {
        browser.url('http://localhost:3000/');
        expect(browser.isExisting('=Zobrazit více')).to.equal(false);
        
        browser.url('http://localhost:3000/rssDialog');
        browser.setValue('form>div>input[name="0"]', 'Pokus');       
        var element = browser.element('form>div:nth-child(1)');
        element.setValue('[data-url="0"]', 'https://www.svethardware.cz/export.jsp?format=rss2');
        
        browser.click('[value=Save]');
        browser.pause(100);

        expect(browser.isExisting('.red')).to.equal(false);
        browser.waitForVisible('.toast-message', 10000, true);

        browser.url('http://localhost:3000/');
        browser.waitForVisible('=Svět hardware', 5000);
        browser.pause(100);        
        expect(browser.isVisible('button=Zobrazit více')).to.equal(true);
        
    });

    after(function(){
        browser.url('http://localhost:3000/');
        browser.click('=Logout');
        browser.waitForVisible('.toast-message', 10000, true);
    });
    
        it('should create new categories in side menu after save', function () {
    
        });
  
});

*/
  