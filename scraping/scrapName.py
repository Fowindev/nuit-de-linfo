import requests
from bs4 import BeautifulSoup
import re
import json

listePersonnes = []

with open("./listeLiensPersonnes.json", "r") as ficLiens:
    listePersonnesJson = json.load(ficLiens)

idx = 0

for personne in listePersonnesJson:
    intRequestDone = 0

    idx += 1
    print(f"{idx}/{len(listePersonnesJson)}")

    while intRequestDone <= 50 and intRequestDone >= 0:
        objReq = requests.get(personne)

        if objReq.status_code == 200:
            intRequestDone = -1
            try :
                objSoup = BeautifulSoup(objReq.text, 'html.parser')

                personne = {}

                textNom = objSoup.article.h1.get_text().strip().replace("\n", "")

                textArticle = objSoup.article.get_text()
                textArticle = textArticle.replace(textNom, "")
                textArticle = textArticle.replace('\u00a0', "")

                while textArticle.find("  ") != -1 and textArticle.find("\n\n") != -1 and textArticle.find("\n \n") != -1:
                    textArticle = textArticle.replace("  ", " ")
                    textArticle = textArticle.replace("\n\n", "\n")
                    textArticle = textArticle.replace("\n \n", "\n")
                textArticle.strip()

                listeImages = []
                for image in objSoup.article.find_all("img"):
                    listeImages.append(image.get("href"))
                
                personne["nom"] = textNom
                personne["content"] = textArticle
                personne["images"] = listeImages

                listePersonnes.append(personne)
            except:
                print("error")
        else:
            intRequestDone += 1

with open("listeInfoSauveurs.json", "w") as ficInfosSauveurs:
    json.dump(listePersonnes, ficInfosSauveurs)
