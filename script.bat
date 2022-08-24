@echo off
start Chrome "127.0.0.1:5000"
python -m flask run
pause