## Frontend

go to `.\frontend\data-jupyter\`

`npm install` if new dependencies  

`npm start`  

Running on http://localhost:3000/

***

## Backend

go to `.\backend\app\`

`pip install flask` if needed

citing from: https://flask.palletsprojects.com/en/rtd/cli/
### for bash / mac
```
export FLASK_APP=code_exec
export FLASK_ENV=development
flask run
```
### for powershell
```
$env:FLASK_APP = "code_exec"
$env:FLASK_ENV = "development"
python -m flask run
```

Running on http://127.0.0.1:5000/