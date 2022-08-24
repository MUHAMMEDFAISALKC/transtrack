from pydoc import cli
import re
import webbrowser
from flask import Flask, redirect, render_template, request, session, url_for
from flask_session import Session
from cs50 import SQL
from tempfile import mkdtemp
from helpers import login_required

app=Flask(__name__)

#Ensure templates are auto-reloaded
app.config["TEMPLATES_AUTO_RELOAD"] = True

# ensure response aren't cached
@app.after_request
def after_request(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response 

# configure session to use filesystem (instead of signed cookies)
app.config["SESSION_FILE_DIR"] = mkdtemp()
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)


db= SQL("sqlite:///gabbro.db")


@app.route("/")
@login_required
def home():
    id = session["user_id"]
    rows = db.execute("SELECT * FROM users WHERE staff_Id = ?", id)
    user = rows[0]["name"]

    invoiceNo = 1
    rows = db.execute("SELECT * FROM bricks")
    return render_template("entry.html", rows=rows, invoiceNo=invoiceNo)


@app.route("/login", methods=["GET", "POST"])
def login():

    # clear all users
    session.clear()
    
    # user reached route via POST
    if request.method == "POST":
        
        staff = request.form.get("user")
        if not request.form.get("user"):
            return render_template("apology.html", apologytext="Please provide User Name")
        elif not request.form.get("password"):
            return render_template("apology.html", apologytext="Please provide password")
        rows = db.execute("SELECT * FROM users WHERE name = ?", staff)

        if len(rows) != 1 or not rows[0]["password"]== request.form.get("password"):
            return render_template("apology.html", apologytext="Invalid user name and/or password")
        # Remember which user has logged in
        session["user_id"] = rows[0]["staff_Id"]
        return redirect("/")

    else:
        try:
            return render_template("login.html")
        except:
            return render_template("apology.html")

@app.route("/logout")
def logout():
    session.clear()
    return redirect("/")

@app.route("/bricks")
def bricks():
    rows= db.execute('SELECT * FROM bricks')
    return render_template("bricks.html", rows=rows)

@app.route("/entry", methods=["GET", "POST"])
def entry():

    if request.method == 'POST':

        
        #variables from form
        invoiceNo = request.form.get("invoiceNo")
        address2 = request.form.get("address2").title()
        billDate = request.form.get("billDate")
        client = request.form.get("client").title()
        address1 = request.form.get("address1").title()
        shipLoad = request.form.get("shipLoad")
        clientGst = request.form.get("clientGst")
        phone = request.form.get("cPhone").split(",")
        cPhone2=""
        if len(phone) >= 2:
            cPhone1 = phone[0]
            cPhone2 = phone[1]
        if len(phone) == 1:
            cPhone1 = phone[0] 

        paymentMode = request.form.get("paymentMode").capitalize()  
        vehicleNo = request.form.get("vehicleNo")
        site = request.form.get("site")
    
        item = request.form.get("particular")
        if item:
            item = item.split("|")
            itemCode = item[1]
            itemName = item[2]
            itemMuseare = item[3] 
            itemNames = itemName+" "+ itemMuseare

        quantity = request.form.get("quantity")
        rate = request.form.get("rate")
        price = request.form.get("price")
        cgst = request.form.get("cgst")
        sgst = request.form.get("sgst")
        igst = request.form.get("igst")
        totalGst = request.form.get("totalGst")
        totalPrice = request.form.get("totalPrice")
        actMenu = request.form.get("actMenu")
        return render_template("bill.html", 
        invoiceNo = invoiceNo, address2 = address2, billDate=billDate , client = client, address1 = address1, shipLoad=shipLoad, clientGst = clientGst, cPhone1 = cPhone1, cPhone2 = cPhone2, paymentMode =paymentMode, vehicleNo = vehicleNo, site = site,
        itemNames = itemNames, quantity = quantity, rate = rate, price = price, cgst = cgst, sgst = sgst, igst = igst, totalGst = totalGst, totalPrice = totalPrice, actMenu = actMenu)

    else:
        invoiceNo = 1
        rows = db.execute("SELECT * FROM bricks")
        return render_template("entry.html", rows=rows, invoiceNo=invoiceNo)