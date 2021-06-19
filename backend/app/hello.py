from flask import Flask, json, jsonify, request

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
    return 'a'
