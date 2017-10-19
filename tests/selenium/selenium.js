var webdriver = require('selenium-webdriver')
var chrome = require('selenium-webdriver/chrome'),
var firefox = require('selenium-webdriver/firefox');

var driver = new webdriver.Builder()
    .withCapabilities({ browserName: 'firefox' })
    .build();


    test.describe( 'Test Suite' , function(){
        
          test.before(function(){
          
              driver.get("http://www.google.com");
              driver.findElement(webdriver.By.id(username)).sendKeys(my_username);
              driver.findElement(webdriver.By.id(submit)).click();
          });
       
          test.after(function(){
              driver.quit();
          });
       
          test.it( 'Test Case' , function(){
          
              driver.getTitle().then(function(title){
                  expect(title).equals(my_title);
              })
       
              driver.sleep();
          });
       
      });