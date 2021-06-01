const {Builder, By, Key, until, WebElement} = require('selenium-webdriver');


(async function example() {
    let driver = await new Builder().forBrowser('Chrome').build();
try {
    await driver.get('http://localhost:3000/public/Registrar.html');
    await driver.findElement(By.name('name').sendKeys('angel'));
    await driver.findElement(By.name('password').sendKeys('asdeasde2'));
    await driver.findElement(By.name('email').sendKeys('angel@gmail.com'));
    await driver.findElement(By.name('date').sendKeys('2001-08-03'));
    await driver.findElement(By.name('paistext').sendKeys('asdeasde2'));

  } finally {
    await driver.quit();
  }
})();