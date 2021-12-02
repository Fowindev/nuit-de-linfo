import requests
from bs4 import BeautifulSoup
import re
import json

lstPagesAScrap = [
    'https://sauveteurdudunkerquois.fr/1900-1909/', 
    'https://sauveteurdudunkerquois.fr/1980-1989/', 
    'https://sauveteurdudunkerquois.fr/1890-1899/', 
    'https://sauveteurdudunkerquois.fr/1960-1969/', 
    'https://sauveteurdudunkerquois.fr/1930-1939/', 
    'https://sauveteurdudunkerquois.fr/2691-2/', 
    'https://sauveteurdudunkerquois.fr/1910-1919/', 
    'https://sauveteurdudunkerquois.fr/1940-1949/', 
    'https://sauveteurdudunkerquois.fr/1920-1929/', 
    'https://sauveteurdudunkerquois.fr/18eme-siecle/', 
    'https://sauveteurdudunkerquois.fr/1870-1879/', 
    'https://sauveteurdudunkerquois.fr/1970-1979/', 
    'https://sauveteurdudunkerquois.fr/1990-1999/', 
    'https://sauveteurdudunkerquois.fr/1950-1959/', 
    'https://sauveteurdudunkerquois.fr/1850-1859/', 
    'https://sauveteurdudunkerquois.fr/1880-1889/', 
    'https://sauveteurdudunkerquois.fr/1800-1824/', 
    'https://sauveteurdudunkerquois.fr/1825-1849/'
]

listeLiensSauvetages = []

for strPageAScrap in lstPagesAScrap:
    intRequestDone = 0

    print(strPageAScrap)

    while intRequestDone <= 10 and intRequestDone >= 0:
        objRequests = requests.get(strPageAScrap)

        if objRequests.status_code == 200:
            intRequestDone = -1
            objSoup = BeautifulSoup(objRequests.text, 'html.parser')
            for objLinkA in objSoup.find_all("a"):
                if re.match(".*-[0-9][0-9][0-9][0-9]b\/$", objLinkA.get("href")) or re.match(".*[a-z][0-9][0-9][0-9][0-9]\/$", objLinkA.get("href")):
                    listeLiensSauvetages.append(objLinkA.get("href"))
        else:
            intRequestDone += 1
    
    if intRequestDone > 10:
        print("erreur scrap")

with open("./listeLiensSauvetage.json", "w") as ficJson:
    json.dump(listeLiensSauvetages, ficJson)