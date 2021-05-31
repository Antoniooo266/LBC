const {Builder, By, Key, until, WebElement} = require('selenium-webdriver');


(async function example() {
    let driver = await new Builder().forBrowser('Chrome').build();
try {
    await driver.get('http://localhost:3000/public/Registrar.html');
    await driver.findElement(By.name('name').sendKeys('angel'));

  } finally {
    await driver.quit();
  }
})();