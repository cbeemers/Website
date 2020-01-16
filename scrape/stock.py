import requests
from bs4 import BeautifulSoup
from csv import writer


def get_abbrev(company):

    web_search = "https://www.marketwatch.com/tools/quotes/lookup.asp?siteID=mktw&Lookup="+ company +"&Country=all&Type=All"
    response = requests.get(web_search)
    soup = BeautifulSoup(response.text, 'html.parser')

    # res = soup.find(class_='results')
    res = soup.find('td')

    logo = res.find('a')

    return logo.text

def get_data(abbrev):
    url = "https://finance.yahoo.com/quote/" + abbrev + "?p=" + abbrev + "&.tsrc=fin-srch"

    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    info = soup.find('div', {'class': 'My(6px) Pos(r) smartphone_Mt(6px)'}).find_all('span')

    price = info[0].text
    change = info[1].text

    # summary = soup.find_all('div', {'class': "Ta(end) Fw(600) Lh(14px)"}).find('span')
    headers = soup.find_all(class_="C($primaryColor) W(51%)")
    summary = soup.find_all(class_="Ta(end) Fw(600) Lh(14px)")

    head = []
    dat = []
    sentences = []

    for i in range(0, len(summary)):
        head.append(headers[i].find('span').text)
        s = headers[i].find('span').text + ": "

        span = summary[i].find('span')
        if (span):
            dat.append(summary[i].text)
            s += span.text
        else:
            dat.append(summary[i].text)
            s += summary[i].text

        sentences.append(s)

    data = {
        'price' : price,
        'change' : change,
        'headers' : head,
        'summary' : dat,
        'sentences' : sentences,
    }

    return data

# .find('span').text

    # print(price, change)

# company = input("Search for company ('q' to quit): ").lower()

# while company != 'q':

# company = "apple"

# abbrev = get_abbrev(company)
# get_data(abbrev)
#     company = input("Search for company ('q' to quit): ").lower()