from flask import redirect, session
from functools import  wraps
import os
import qrcode
import os.path



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

    newPath = filenaming()
    
    img.save(newPath, "PNG")
    os.system("open qr.png")
    return newPath

def filenaming():
    newPath = "./static/img/payqr/qr0.png"
    for i in range(10):
        if os.path.exists(newPath):
            count= str(i+1)
            newPath = "./static/img/payqr/qr"+count+".png"
        else:
            return newPath
        return newPath