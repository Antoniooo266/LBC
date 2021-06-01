const webdriver = require('selenium-webdriver');
const app = require('../app');
const http = require('http').createServer(app).listen(3000);

const capabilities = {
 'os_version' : '10',
 'resolution' : '1920x1080',
 'browserName' : 'Chrome',
 'browser_version' : 'latest',
 'os' : 'Windows',
 'browserstack.debug' : 'true'
}

async function RunTest(){
    let driver = new webdriver.Builder()
    .usingServer('http//localhost:3000@hub-cloud.browserstack.com/wd/hub')
    .withCapabilities(capabilities)
    .build();
  await driver.get("http://www.google.com");
  try{
    await driver.findElement(By.name('name').sendKeys('angel'));
    await driver.findElement(By.name('password').sendKeys('asdeasde2'));
    await driver.findElement(By.name('email').sendKeys('angel@gmail.com'));
    await driver.findElement(By.name('date').sendKeys('2001-08-03'));
    await driver.findElement(By.name('paistext').sendKeys('España'));
  }finally{
    (await driver).quit
  }
}
RunTest();