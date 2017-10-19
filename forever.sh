#!/bin/sh
if [ "$1" = "start" ];
then
        forever start target/server.js
elif [ "$1" = "stop" ];
then
        forever stop target/server.js
elif [ "$1" = "restart" ];
then
        forever restart target/server.js
elif [ "$1" = "status" ];
then
        forever restart target/server.js
else
        echo "sh forever.sh start|stop|restart|status"
fi
