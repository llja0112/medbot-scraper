# Medbot scraper

### About
Designed to scrap internet content for the main project Medbot.

### Usage
1. `npm install` to install packages.
1. Define your own config file `yourconfig.json`. It should contain which file to write to and which urls to crawl.
1. Write your own parsing methods using cheerios with `objecttype` as method name. Refer to `scrape.js` for movies example.
1. Call from commandline `node main.js yourconfig.json objecttype`.
