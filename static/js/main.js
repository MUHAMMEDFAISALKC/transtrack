function initialize() {
    console.log("application started")
}

const toggleShowPassword = () => {
    if (document.getElementById("showPassword").checked) {
        document.getElementById("passSecurity").type = "text"
    } else {
        document.getElementById("passSecurity").type = "password"
    }
}

