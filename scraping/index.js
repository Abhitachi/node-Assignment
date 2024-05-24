const puppeteer = require("puppeteer");

const getQuotes = async () => {
  //"headless" refers to running the browser in a mode where the graphical user interface is not displayed
  const browser = await puppeteer.launch({
    //instantiate a browser variable that will use to manipulate browser
    headless: false,
    defaultViewport: null, //no default viewPort
  });
  //opens a new page
  const page = await browser.newPage();
  // on the new page, open the given url and wait untill the dom client loaded.
  await page.goto("http://quotes.toscrape.com/", {
    waitUntil: "domcontentloaded",
  });

  //get the page data
  const quotes = await page.evaluate(() => {
    const quoteList = document.querySelectorAll(".quote");

    return Array.from(quoteList).map((quote) => {
        const text = quote.querySelector(".text").innerText;
        const author = quote.querySelector(".author").innerText;

        return {text , author}
    })
  });

  console.log(quotes);
  await page.click(".pager > .next > a")

  await browser.close();
};
getQuotes();


