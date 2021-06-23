from flask import Flask, json, jsonify, request
import os
app = Flask(__name__)

spreads = []
develops = []
#def select(l, r):
 #   if len(spreads > 0) and (l < len(spreads)) and (l >= 0) and (r < len(spreads[0])) and (r >=0):
  #      develops = spreads[]
def add_rowssec(dic):
    field= []
    row = []
    for key in dic:
        field.append(key)
        row.append(dic[key])
    if (len(spreads) == 0):
        spreads.append(field)
    spreads.append(row)

def query(attr, value):
    if (len(spreads) == 0):
        return 'not'
    index_f = 0
    found = 0
    for count, a in enumerate(spreads[0]):
        if a == attr:
            index_f = count
    for i, row in enumerate(spreads[1:]):
        if row[index_f] == value:
            develops.append(i+1)
    if found == 1:
        return 'done'
    else:
        return 'not'
def pop_row(attr, value):
    if (len(spreads) == 0):
        return 'not'
    index_f = 0
    found = 0
    for count, a in enumerate(spreads[0]):
        if a == attr:
            index_f = count
    for i, row in enumerate(spreads[1:]):
        if row[index_f] == value:
            spreads.pop(i+1)
    if found == 1:
        return 'done'
    else:
        return 'not'
#####################################
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

@app.route('/pythonText', methods=['POST'])
def pythonText():
    # 1 get text from frontend
    ans = request.get_json()['text']
    # print(ans[10] == '\n')
    # print(ans[10])
    # print(ans['text'])
    # print(type(ans))

    # 2 write text to python file
    text_file = open("text.py", "w")

    # 2.2 wrap text inside a function
    lines = '''def temp():\n    ''' # WARN: default indentation to 4 spaces

    for i in ans:
        if i == '\n':
            # print('1:',i)
            lines += '\n    '
        else:
            # print('0:',i)
            lines += i

    print(lines)
    text_file.writelines(lines)
    text_file.close()

    # 3 execute python file
    exec(open("./text.py").read())

    # n return
    return "a"


@app.route('/aceValue', methods=['POST'])
def aceValue():
    ans = request.get_json()['text']
    print("-------------")
    funHeader = "def runScript():"
    entireScirpt = funHeader + "\n" + indentLines(ans)
    exec(entireScirpt, globals())
    resultFromScript = runScript()
    print(resultFromScript)
    return {'result':resultFromScript}



def indentLines(sample):
    segments = str.splitlines(sample)
    result = ""
    for each in segments:
        each = "    " + each + "\n"
        result = result + each
    return result


