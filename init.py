from flask import Flask
from flask import render_template
from flask import request
#from flask_flatpages import FlatPages

app = Flask(__name__)

def prerender_jinja(text):
    prerendered_body = render_template_string(Markup(text))
    return pygmented_markdown(prerendered_body)
app.config['FLATPAGES_HTML_RENDERER'] = prerender_jinja

def render_header():
    return render_template("header.html")


@app.route('/')
def index():
    site = render_template("header.html")
    site += render_template("index.html")
    site += render_template("footer.html")
    return site

@app.route('/projects/')
def projects_empty():
    site = render_template("header.html")
    site += render_template("projects.html", project="ein")
    site += render_template("footer.html")
    return site

@app.route('/projects/<p>')
def projects(p = None):
    site = render_template("header.html")
    site += render_template("projects.html", project=p)
    site += render_template("footer.html")
    return site
