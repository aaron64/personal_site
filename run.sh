#!/bin/bash

PORT=8000
MODE="RUN"

for i in "$@" ; do
    if [ $i == "-p" ] ; then
        PORT=80
        break
	elif [ $i == "-b" ] ; then
		MODE="BUILD"
	fi
done

export FLASK_APP=init.py
export FLASK_DEBUG=1

if [ $MODE == "RUN" ] ; then
python3 -m flask run --host=0.0.0.0 --port=$PORT
elif [ $MODE == "BUILD" ] ; then
python3 app/init.py build
fi
