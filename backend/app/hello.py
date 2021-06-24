from flask import Flask, json, jsonify, request
import os
app = Flask(__name__)

@app.route('/')  # landing page
def home():
    ans = jsonify("Home")
    ans.headers.add('Access-Control-Allow-Origin', '*')
    return ans

@app.route('/pythonText', methods=['POST'])
def pythonText():
    # 1 get text from frontend
    ans = request.get_json()['text']

    # 2 write text to python file
    text_file = open("text.py", "w")

    # 2.2 wrap text inside a function
    lines = '''def temp():\n    ''' # WARN: default indentation to 4 spaces

    for i in ans:
        if i == '\n':
            lines += '\n    '
        else:
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


