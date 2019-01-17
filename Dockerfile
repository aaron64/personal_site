FROM python:3

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
ENV FLASK_APP=init.py
ENV FLASK_DEBUG=1
EXPOSE 5000
CMD python3 -m flask run --host=0.0.0.0
