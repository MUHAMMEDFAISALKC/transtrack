from flask import redirect, session
from functools import  wraps


def login_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if session.get("user_id") is None: 
            return redirect("/login")
        return f(*args, **kwargs) 
    return decorated

