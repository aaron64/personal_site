import os
from flask import Flask
from flask import render_template, json
from flask import request
from flaskext.markdown import Markdown

app = Flask(__name__)
Markdown(app)

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

@app.route('/resume/')
def resume():
    site = render_template("header.html")
    site += render_template("resume.html")
    site += render_template("footer.html")
    return site

@app.route('/projects/')
def projects_empty():
    site = render_template("header.html")
    site += render_template("projects.html")
    site += render_template("footer.html")
    return site

@app.route('/projects/<p>')
def projects(p = None):
    site = render_template("header.html")
    SITE_ROOT = os.path.realpath(os.path.dirname(__file__))
    json_url = os.path.join(SITE_ROOT, "static/json", "projects.json")
    data = json.load(open(json_url))
    site += render_template("projects.html", projects=data)
    site += render_template("footer.html")
    return site

@app.route('/contact/')
def contact():
    site = render_template("header.html")
    site += render_template("contact.html")
    site += render_template("footer.html")
    return site

# @app.route('/blog/')
# def blog_list():
#     site = render_template("header.html")
#     site += render_template("blog.html", blog='')
#     site += render_template("footer.html")
#     return site

# @app.route('/blog/<b>')
# def blog(b = None):
#     site = render_template("header.html")
#     site += render_template("blog.html", blog=b)
#     site += render_template("footer.html")
#     return site


if __name__ == "__main__":
    app.run(host='0.0.0.0')
