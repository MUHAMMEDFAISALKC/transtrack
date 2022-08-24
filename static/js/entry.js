
async function entrying() {
    if (document.getElementById("particular").value) {
        if (document.getElementById("quantity").value) {
            autoEntry()
        }
    }
}

async function autoEntry() {
    let location = document.getElementById("state").value
    if (location=="kerala") {
        document.getElementById("igst").value = ""
        document.getElementById("slno").value = 1
        particularCopy()
        await autoRating()
        await pricing()
        await mult9()
        await totalGsting()
        totalPricing()
    } else if (location=="outofstate") {
        document.getElementById("cgst").value = ""
        document.getElementById("sgst").value = ""
        document.getElementById("slno").value = 1
        particularCopy()
        await autoRating()
        await pricing()
        await mult18()
        await totalGsting()
        totalPricing()
    } else {
        alert("Please select delivery state")
    }
}

async function autoRating() {

    if (document.getElementById("particular").value) {
        if (document.getElementById("rate").disabled) {
            let rate = document.getElementById("particular").value
            rate = rate.split("|")
            rate = rate[1]
            rate = (+rate)
            console.log(typeof(rate))
            rate = rate.toFixed(2)
            document.getElementById("rate").value = parseFloat(rate)
        } else {

            document.getElementById("rate").value = document.getElementById("rate").value 
        }
    }
}

async function pricing() {
    let a = document.getElementById("rate").value
    let b = document.getElementById("quantity").value
    a = (+a)
    b = (+b)
    var price = a*b
    price = price.toFixed(2)
    document.getElementById("price").value = await parseFloat(price)
}

// for IGST
async function mult18() {
    let a = document.getElementById("price").value
    var igst = (18/100)*a
    igst = (+igst)
    igst = igst.toFixed(2)
    document.getElementById("igst").value = parseFloat(igst)
}

// for CGST and SGST
async function mult9() {
    let a = document.getElementById("price").value
    var gst= (9/100)*a
    gst = (+gst)
    gst = gst.toFixed(2)
    document.getElementById("cgst").value = parseFloat(gst)
    document.getElementById("sgst").value = parseFloat(gst)
}

// total GST and total price
async function totalGsting() {
    let a = await document.getElementById("cgst").value
    let b = await document.getElementById("sgst").value
    let igst = document.getElementById("igst").value
    if (igst) {
        igst = (+igst)
        igst = igst.toFixed(2)
        document.getElementById("totalGst").value = parseFloat(igst)
        
    } else {
        a = (+a)
        b = (+b)
        a=a.toFixed(2)
        b=b.toFixed(2)
        console.log(typeof(a) + typeof(b))
        let result = parseFloat(a) + parseFloat(b)
        document.getElementById("totalGst").value = result
    }
}


function totalPricing() {
    let a = document.getElementById("price").value
    let b = document.getElementById("totalGst").value
    let c = 0
    if (document.getElementById("shipLoad").value) {
        c = document.getElementById("shipLoad").value
    }
    a = (+a)
    b = (+b)
    c = (+c)
    let result = parseFloat(a) + parseFloat(b) +parseFloat(c)
    result = result.toFixed(2)
    document.getElementById("totalPrice").value = result
}

function cancelEntry() {
    document.getElementById("slno").value=""
    document.getElementById("particular").value= ""
    document.getElementById("quantity").value=""
    document.getElementById("rate").value=""
    document.getElementById("price").value=""
    document.getElementById("cgst").value=""
    document.getElementById("sgst").value=""
    document.getElementById("igst").value=""
    document.getElementById("totalGst").value=""
    document.getElementById("totalPrice").value=""
    entrying() 
}


// name of particular copying due to we have use particular id to get price 
function particularCopy() {
    if (document.getElementById("particular")) {
        let cp =  document.getElementById("particular").text
         //document.getElementById("nameCopy").value
        console.log(cp)
    }
}

// calling edit Entry
function editEntrying() {
    if (document.getElementById("rate").readonly) {
        document.getElementById("rate").readonly= false
    } 
    if (document.getElementById("rate").disabled) {
        document.getElementById("rate").disabled= false
    }
    document.getElementById("price").readonly= false
    document.getElementById("cgst").readonly= false
    document.getElementById("sgst").readonly= false
    document.getElementById("igst").readonly= false
    document.getElementById("totalGst").readonly= false
    document.getElementById("totalPrice").readonly= false
}

// calling cancelEntry

console.log(document.getElementById("actMenu"))
function toggleAction () {
    if (document.getElementById("actMenu")) {
        console.log(document.getElementById("actMenu"))
        if (document.getElementById("actMenu").value == "cancel") {
            cancelEntry()
        } else if (document.getElementById("actMenu").value == "edit") {
            editEntrying()
        }
    }
}

// 
function invoiceNoEdit() {
    document.getElementById("invoiceNo").removeAttribute("readonly");
}


// changing inpute properties of rate for carry value in form response

function rateStatusing() {
    document.getElementById("rate").readonly = true
    document.getElementById("rate").disabled = false
    console.log(document.getElementById("rate"))
}

// billing page
 function billready() {
    console.log("bill-page")
    let d = new Date()
    // for date 
    let dd = d.getDate()
    let dm = d.getMonth() + 1
    let dy = d.getFullYear()
    let date = dd+"-"+dm+"-"+dy
    //for time
    let th = d.getHours();
    let tm = d.getMinutes();
    let ts = d.getSeconds();
    let time = th +":"+tm+":"+ts
    //for due date
    let ddm = d.getMonth() + 2
    let dueDate = dd+"-"+ddm+"-"+dy

    if (document.getElementById("timeArea") ) {
        document.getElementById("timeArea").innerHTML = time
    }
    if (document.getElementById('billDate1')) {
        document.getElementById('billDate1').innerHTML = date
    }
    document.getElementById('dueDate').innerHTML = dueDate
    console.log(date)
}

// print billing page 
function printdiv(tagname) {
    var printContent = document.getElementById(tagname).innerHTML
        console.log(printContent)
    
    w = window.open()
    w.document.write(printContent);
    w.print();
    w.close();
}
// validate form of entry, is it in entry mode
function validateEntry() {
    if (document.getElementById("actMenu").value == "empty") {
        alert("please don't leave anction empty, change to 'Entry' for submission")
        return false;
    } else if (document.getElementById("actMenu").value == "cancel") {
        alert("please change anction (Cancel) to 'Entry' for submission")
        return false;
    } else if (document.getElementById("actMenu").value == "edit") {
        alert("please change anction (Edit) to 'Entry' for submission")
        return false;
    } else if (document.getElementById("actMenu").value == "entry") {
        return true
    }   
}