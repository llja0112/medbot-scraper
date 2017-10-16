# Medbot scraper

### About
Designed to scrap internet content for the main project Medbot.

### Usage
1. Define your own config file `yourconfig.json`. It should contain which file to write to and which urls to crawl.
2. Write your own parsing methods using cheerios with `objecttype` as method name. Refer to `scrape.js` for movies example.
3. Call from commandline `node main.js yourconfig.json objecttype`.
