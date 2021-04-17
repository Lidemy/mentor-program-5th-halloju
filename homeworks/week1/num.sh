#!/bin/bash

x=1; while [ $x -le "$1" ]; 
do 
    echo "create file $x.js"
    touch "$x.js" 
    x=$((x+1))
done
