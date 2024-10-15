import scrapy
from scrapy.crawler import CrawlerProcess
import json

class CheapflightsSpider(scrapy.Spider):
    name = "all"
    
    # Starting URL for the flight search page
    start_urls = [
        "https://www.in.cheapflights.com/flight-search/DEL-BOM/2024-09-30/2024-09-30?sort=bestflight_a"
    ]
    
    headers = {
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br, zstd",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/x-www-form-urlencoded",
        "referer": "https://www.in.cheapflights.com/flight-search/DEL-BOM/2024-09-30/2024-09-30?sort=bestflight_a",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
        "x-requested-with": "XMLHttpRequest"
    }

    def parse(self, response):
        self.logger.info("Starting to parse the main page")
        yield scrapy.Request(
            url="https://www.in.cheapflights.com/s/horizon/flights/results/FlightSearchPollAction?p=3",
            callback=self.parse_json,
            headers=self.headers
        )

    def parse_json(self, response):
        # Check the response status
        if response.status == 200:
            try:
                data = json.loads(response.text)
                print(json.dumps(data, indent=4))  # Pretty print the JSON data
            except json.JSONDecodeError as e:
                print(f"Error decoding JSON: {e}")
        else:
            self.logger.error(f"Failed to retrieve data: {response.status} - {response.text[:100]}")  # Log the status code and part of the response

# Function to run the spider
def run_spider():
    process = CrawlerProcess()
    process.crawl(CheapflightsSpider)
    process.start()

# Run the spider
run_spider()

