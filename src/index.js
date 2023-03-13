
import puppeteer from "puppeteer";

export let  myResponse = [""]

export async function start(domainName) {
  myResponse = [""];
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // taveling to the desired page  ------------------------------------------
  await page.goto("https://register.com.np/whois-lookup");

  //typing domainName in textfield of the site -------------------------------------------
  await page.type("#domainName", domainName),
    await Promise.all([
  //clicking the search button in the site -------------------------------------------

      await page.click(
        "body > div.whois-lookup > div > div > div > div > form > div.row > div.col-md-2.col-sm-2.col-xs-12 > button"
      ),
  //waiting for navigate to other page  -------------------------------------------

      await page.waitForNavigation(),
    ]);
  console.log(page.url());

  //checking whether the domain is availbale or not   -------------------------------------------

  if (page.url() == "https://register.com.np/domainwhoisdetail") {
  console.log("exist")  
  const domainname = await page.$eval(
      "body > div.contain-holder > div > div > div > div > div.whois-record > table > tbody > tr:nth-child(1) > td:nth-child(2) > strong",
      (el) => el.textContent
    );
    const firstRegister = await page.$eval(
        "body > div.contain-holder > div > div > div > div > div.whois-record > table > tbody > tr:nth-child(2) > td:nth-child(2)",
        (el) => el.textContent
      );

      const lastUpdated = await page.$eval(
        "body > div.contain-holder > div > div > div > div > div.whois-record > table > tbody > tr:nth-child(3) > td:nth-child(2)",
        (el) => el.textContent
      );
      const primaryServer = await page.$eval(
        "body > div.contain-holder > div > div > div > div > div.whois-record > table > tbody > tr:nth-child(4) > td:nth-child(2)",
        (el) => el.textContent
      );
      const secondaryServer = await page.$eval(
        "body > div.contain-holder > div > div > div > div > div.whois-record > table > tbody > tr:nth-child(5) > td:nth-child(2)",
        (el) => el.textContent
      );
      const email = await page.$eval(
        "body > div.contain-holder > div > div > div > div > div.whois-record > table > tbody > tr:nth-child(6) > td:nth-child(2)",
        (el) => el.textContent
      );
      const personName = await page.$eval(
        "body > div.contain-holder > div > div > div > div > div.whois-record > table > tbody > tr:nth-child(7) > td:nth-child(2)",
        (el) => el.textContent
      );
      const address = await page.$eval(
        "body > div.contain-holder > div > div > div > div > div.whois-record > table > tbody > tr:nth-child(11) > td:nth-child(2)",
        (el) => el.textContent
      );

    //pushing in the array for fetching later on    -------------------------------------------
    myResponse.push(domainname,firstRegister,lastUpdated,primaryServer,secondaryServer,email,personName,address);
  } 
  
  else {
    myResponse.push("its not going well")
    console.log("dont exist");
  }
  return myResponse;

}
