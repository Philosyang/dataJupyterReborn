from flask import Flask, json, jsonify, request
import requests
from bs4 import BeautifulSoup
import time

app = Flask(__name__)


@app.route('/')  # landing page
def home():
    ans = jsonify("Home")
    ans.headers.add('Access-Control-Allow-Origin', '*')
    return ans

# @app.route('/time')
# def get_current_time():
#     return {'time': time.time()}

# @app.route('/test')
# def test2():  # name doesn't matter much
#     return jsonify("testtest")

@app.route('/aba', methods=['POST'])
def aba():
    ans = request.get_json()
    print("-------------------------------------------")
    print("here:", ans['name'], ans['institution'])
    print("--------------------------------------------")
    print(type(ans))
    print("--------------------------------------------")
    print(type(ans['name']['name']))
    search = ans['name']['name'] + " "+ ans['institution']['institution'] + " " + "main page"
    link = get_google_res(search)
    print("--------------------------------------------")
    print(link)
    print("--------------------------------------------")
    print(type(link))
    ##link.headers.add('Access-Control-Allow-Origin', '*')
    return {'urls': link}

def get_google_res(key):

    URL = f"https://google.com/search?q={key}"
    USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:65.0) Gecko/20100101 Firefox/65.0"
    headers = {"user-agent": USER_AGENT}

    r = requests.get(URL, headers=headers)

    if r.status_code == 200:
        soup = BeautifulSoup(r.content, "html.parser")

    results = []
    for section in soup.find_all('div', attrs={'class': 'g'}):
        link = section.find_all('a')
        if link:
            link = link[0]['href']
            try:
                title = section.find('h3').text
            except:
                title = 'NULL'
            
            item = {
                "title": title,
                "link": link
            }
            results.append(item)        
    print("--------------------------------------------")
    print("start to print items")
    print("--------------------------------------------")
    for item in results:
        print(item)
    print("--------------------------------------------")
    print("print items finished")
    return results


# Test researcher
# Michael Bailey    Abdussalam Alawini    Sarita V Adve   Vikram Adve

def abaaba(faculty_name):
        found = 0
        name_dict = faculty_name['name']
        name = name_dict['name']
        query = name + " main page"
        google_res = get_google_res(query)
        ##print(google_res)
        candidates = []
        for res in google_res:
            url = res['link']
            r = requests.get(url)
            html = r.content
            soup = BeautifulSoup(html, 'html.parser')
            head = soup.head
            tab_title = head.find('title')
            if tab_title:
                tab_title = tab_title.get_text()
                res['tab'] = tab_title

                if "Google Scholar Citations" in tab_title:
                    homepage = soup.find(
                        'a', attrs={'class': 'gsc_prf_ila', 'rel': 'nofollow'})
                    if homepage:
                        homepage = homepage['href']
                        print("Found homepage from Google Scholar for",
                              name, ":", homepage)
                        found = 1
                        break
                    else:
                        print("Home page not found from Google Scholar")

                i = 0
                if found == 0:
                    name_strip = name.lower().split(' ')
                    for word in name_strip:
                        if word in tab_title.lower():
                            i += 1
                    if i == len(name_strip):
                        item = {'tab': tab_title,
                                'url': url
                                }
                        candidates.append(item)

        if found == 0:
            if not candidates:
                # print("Cannot found home page")
                print("Nothing@hello.py")
                return "Nothing"
            else:
                # print("Found possible home page:", candidates)
                print("candidates@hello.py")
                return candidates
