from flask import Flask
from flask import render_template
from flask import request

from static.python.magichome import MagicHomeApi

app = Flask(__name__)
controller = MagicHomeApi('10.10.123.3', 0)

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/light')
def light():
    return render_template("light.html")

@app.route('/light_on')
def light_on():
    controller.turn_on()
    controller.update_device(255, 160, 45, 50)
    return render_template("index.html")

@app.route('/light_off')
def light_off():
    controller.turn_off()
    return (''), 204
