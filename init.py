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
#     SITE_ROOT = os.path.realpath(os.path.dirname(__file__))
#     json_url = os.path.join(SITE_ROOT, "static/json", "blogs.json")
#     data = json.load(open(json_url))
#     site += render_template("blogList.html", blogs=data)
#     site += render_template("footer.html")
#     return site

# @app.route('/blog/<b>')
# def blog(b = None):
#     site = render_template("header.html")
#     site += render_template("blog.html", blog=b)
#     site += render_template("footer.html")
#     return site

@app.after_request
def add_header(r):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also to cache the rendered page for 10 minutes.
    """
    r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    r.headers["Pragma"] = "no-cache"
    r.headers["Expires"] = "0"
    r.headers['Cache-Control'] = 'public, max-age=0'
    return r

if __name__ == "__main__":
    app.run(host='0.0.0.0')
