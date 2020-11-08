document.getElementById("statusButton").onclick = function() {sendStatus()};

function sendStatus() {
  document.getElementById("statusInfo").innerHTML = "YOU CLICKED ME! NO STATUS YET";
}
