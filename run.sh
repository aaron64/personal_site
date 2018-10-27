#!/bin/sh

export FLASK_APP=init.py
export FLASK_DEBUG=1
python3 -m flask run --host=0.0.0.0
