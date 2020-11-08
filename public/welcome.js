document.getElementById("statusButton").onclick = function() {sendStatus()};
document.getElementById("favcolor").onsubmit = function() {alert("not ready yet")};


function sendStatus() {
  document.getElementById("statusInfo").innerHTML = "YOU CLICKED ME! NO STATUS YET";
}
