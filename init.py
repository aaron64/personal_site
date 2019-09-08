from flask import Flask
from flask import render_template
from flask import request
from flaskext.markdown import Markdown

app = Flask(__name__)
Markdown(app)

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

@app.route('/blog/')
def blog_list():
    site = render_template("header.html")
    site += render_template("blog.html", blog='')
    site += render_template("footer.html")
    return site

@app.route('/blog/<b>')
def blog(b = None):
    site = render_template("header.html")
    site += render_template("blog.html", blog=b)
    site += render_template("footer.html")
    return site