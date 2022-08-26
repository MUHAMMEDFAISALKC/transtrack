import imp
from flask import redirect, session
from functools import  wraps
import os
import qrcode



def login_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        if session.get("user_id") is None: 
            return redirect("/login")
        return f(*args, **kwargs) 
    return decorated

def qrcodemaking(amount):
    qlink= "upi://pay?appid=com.infra.inb&tr=&mc=&pa=9447536992@indianbank&pn=MS%GABBRO%CEMENT%BRICKS%AND%PRODUCTS&tn=&am="+amount+"&cu=INR"
    img = qrcode.make(qlink)
    print(qlink)
    img.save("./static/img/qr.png", "PNG")
    os.system("open qr.png")