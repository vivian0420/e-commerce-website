window.addEventListener("load", function() {
    this.document.getElementById("footer").innerHTML = "Today is: " + new Date().toLocaleDateString();
})