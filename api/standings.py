import requests
from bs4 import BeautifulSoup
import json

def scrape_f1_standings():
    url = "https://www.bbc.co.uk/sport/formula1/standings#Drivers"
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')

    standings = []
    table = soup.find('table', {'class': 'ssrcss-jsg8ev-TableWrapper e1xoxfm62'})
    rows = table.find_all('tr')[1:]  # Skip the header row

    for row in rows:
        cols = row.find_all('td')
        rank = cols[0].text.strip()
        driver = cols[1].text.strip()
        team = cols[2].text.strip()
        wins = cols[3].text.strip()
        points = cols[4].text.strip()

        standings.append({
            'rank': rank,
            'driver': driver,
            'team': team,
            'wins': wins,
            'points': points
        })

    return standings

def handler(event, context):
    standings = scrape_f1_standings()
    return {
        "statusCode": 200,
        "body": json.dumps(standings),
        "headers": {
            "Content-Type": "application/json"
        }
    }
