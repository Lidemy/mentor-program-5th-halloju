#!/bin/bash

curl "https://api.github.com/users/$1"|grep "login\|bio\|location\|blog"|awk -F: '{print $2}'|sed 's/"//g;s/"//g;s/,//g'
