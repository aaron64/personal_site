from flask import Flask
from flask import render_template
from flask import request

from static.python.magichome import MagicHomeApi

app = Flask(__name__)
controller = MagicHomeApi('10.10.123.3', 0)

@app.route('/')
def index():
    site = render_template("header.html")
    site += render_template("index.html")
    site += render_template("footer.html")
    return site

@app.route('/light')
def light():
    site = render_template("header.html")
    site += render_template("light.html")
    site += render_template("footer.html")
    return site

@app.route('/light_on')
def light_on():
    controller.turn_on()
    controller.update_device(255, 160, 45, 50)
    return (''), 204

@app.route('/light_off')
def light_off():
    controller.turn_off()
    return (''), 204

@app.route('/light_color/<r>/<g>/<b>')
def light_color(r = None, g = None, b = None):
    controller.turn_on()
    controller.update_device(int(r), int(g), int(b), 50)
    return (''), 204
