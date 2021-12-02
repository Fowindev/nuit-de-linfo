import requests
from bs4 import BeautifulSoup
import re
import json
from threading import Thread, Lock
import time

listeArticle = []
listeUrlPersonnes = []

lockData = Lock()

with open("./listeLiensSauvetage.json", "r") as ficLiens:
    listeLiensSauvetage = json.load(ficLiens)


class monThread(Thread):

    def __init__(self, lienArticle):
        Thread.__init__(self)
        self.lienArticle = lienArticle
        self.increment = 0
    
    def run(self):
        try:
            global lockData
            intRequestDone = 0
        
            while intRequestDone <= 50 and intRequestDone >= 0:
                objRequests = requests.get(self.lienArticle)

                if objRequests.status_code == 200:
                    intRequestDone = -1
                    objSoup = BeautifulSoup(objRequests.text, 'html.parser')

                    article = {}

                    strTitre = objSoup.article.h1.getText()
                    strTitre = strTitre.replace("*", "").strip()
                    article["titre"] = strTitre
                    print("Titre :", strTitre)

                    listeDates = []
                    for txtH2 in objSoup.article.find_all("h2"):
                        contentH2 = txtH2.getText().strip()
                        for mois in ["janvier", "février", "fevrier", "mars", "avril", "mai", "juin", "juillet", "aout", "août", "septembre", "octobre", "novembre", "decembre", "décembre"]:
                            if mois in contentH2:
                                listeDates.append(contentH2)
                                continue
                        article["state"] = contentH2
                    article["dates"] = listeDates

                    txtArticle = ""
                    for txtP in objSoup.article.find_all("p"):
                        txtArticle += txtP.getText().strip() + "\n"
                    txtArticle.strip()
                    article["texte"] = txtArticle
                    
                    with lockData:
                        with open("./listeArticles.json", "r") as ficArticles:
                            listeArticle = json.load(ficArticles)

                        with open("./listeLiensPersonnes.json", "r") as ficLiensPersonnes:
                            listeUrlPersonnes = json.load(ficLiensPersonnes)
                        listeArticle.append(article)

                        try :
                            for objLinkA in objSoup.article.find_all("a"):
                                print(objLinkA.get("href"))
                                if re.match(".*[0-9][0-9][0-9][0-9]h\/$", objLinkA.get("href")) or re.match(".*[0-9][0-9][0-9][0-9]h\/$", objLinkA.get("href")):
                                    listeUrlPersonnes.append(objLinkA.get("href"))
                        except :
                            print("erreur")

                        listeUrlPersonnes = list(set(listeUrlPersonnes))

                        with open("./listeLiensPersonnes.json", "w") as ficLiensPersonnes:
                            json.dump(listeUrlPersonnes, ficLiensPersonnes)

                        with open("./listeArticles.json", "w") as ficArticles:
                            json.dump(listeArticle, ficArticles)

                else:
                    intRequestDone += 1
        except:
            if self.increment <= 3:
                self.increment += 1
                self.run()
        
        if intRequestDone > 50:
            print(objRequests.status_code)
            print("erreur scrap", self.lienArticle)
            time.sleep(10)




indice = 0

listeThread = [monThread(lienSauvegarde) for lienSauvegarde in listeLiensSauvetage]

for thread in listeThread:
    thread.start()
    indice += 1
    print(f"{indice}/{len(listeLiensSauvetage)}")

indice = 0
for thread in listeThread:
    thread.join()
    indice += 1
    print(f"{indice}/{len(listeLiensSauvetage)}")

