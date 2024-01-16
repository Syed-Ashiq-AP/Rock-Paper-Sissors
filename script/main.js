
var choices = ["rock", "paper", "scissors"];
var map = {};
var s = localStorage.getItem("score");
if (s == null) {
    s = 0;

}
document.querySelector("#score").children[1].innerHTML = s;
var codes = { "tpl": "paper", "tpr": "scissors", "tpb": "rock" }
var ccodes = { "paper": "bl", "scissors": 'yl', "rock": "rd" }
var mbl = false
function bring_front(x, id) {
    if (!mbl) {
        x.style.left = '-55%';
        x.style.top = '26%';
        x.style.right = 'auto';
        x.style.transform = 'scale(2)';
    } else {
        x.style.left = '5%';
        x.style.top = '-19%';
        x.style.right = 'auto';
    }
    x.style.pointerEvents = "none";
    x.style.zIndex = "2";
    var y = document.querySelector(".black");
    y.style.opacity = "1";
    document.querySelector(".picks").style.opacity = "1";
    var z = document.querySelectorAll(".c");
    document.querySelector(".cline").style.opacity = "0";
    console.log(z);
    for (var i = 0; i < z.length; i++) {
        if (z[i].id != id) {
            z[i].style.opacity = "0";
        }

    }
    let data = choose(codes[id])
    let choice = data[1], code = ccodes[choice];
    document.querySelector(".black").insertAdjacentHTML("beforeend", `
    <section id="ccs" style="pointer-events: none;opacity:0;z-index:2" class="c `+ code + `">
      <section class="cro"><img src="./images/icon-`+ choice + `.svg"></section>
    </section>`)
    document.querySelector(".btnsz").insertAdjacentHTML("beforeend", `
    <section class="winc">
      <div class="c1"></div>
      <div class="c2"></div>
      <div class="c3"></div>
    </section>`)
    if (!mbl) {

        if (data[0] == "You lose") {
            document.querySelector(".winc").style.left = "47%";
            document.querySelector(".winc").style.top = "-73%";
        } else if (data[0] == "You win") {
            document.querySelector(".winc").style.right = " 60%";
            document.querySelector(".winc").style.top = "-70%";

        }
    } else {
        if (data[0] == "You lose") {
            document.querySelector(".winc").style.left = "42%";
            document.querySelector(".winc").style.top = "-31.5%";
        } else if (data[0] == "You win") {
            document.querySelector(".winc").style.left = " -13.5%";
            document.querySelector(".winc").style.top = "-29.5%";

        }
    }
    setTimeout(() => {

        document.getElementById("ccs").style.opacity = '1';
        if (!mbl) {
            document.getElementById("ccs").style.transform = 'scale(1.2)';
        }
    }, 1000)
    setTimeout(() => {
        if (!mbl) {
            document.querySelector(".picks").style.width = "2000px";
            x.style.left = '-95%';
            y.style.transform = 'scale(1.5) translateX(95%) translateX(60%)';
        }
        document.querySelector(".result").children[0].innerHTML = data[0];
        document.querySelector(".result").style.opacity = "1";
        document.querySelector("#score").children[1].innerHTML = s;
    }, 2500)
    setTimeout(() => {
        if (data[0] != "Was a tie") {
            document.querySelector(".winc").style.opacity = "1";
        }
    }, 2700)
    if (data[0] == "You lose") {
        document.querySelector(".result").children[1].style.color = "red";
    }
}
function compare(choice1, choice2) {
    if (choice1 == choice2) {
        return "Was a tie"
    } else if (choice1 == "rock") {
        if (choice2 == "paper") {
            return choice2
        } else {
            return choice1
        }
    } else if (choice1 == "paper") {
        if (choice2 == "scissors") {
            return choice2
        } else {
            return choice1
        }
    } else if (choice1 == "scissors") {
        if (choice2 == "rock") {
            return choice2
        } else {
            return choice1
        }
    }
}

function choose(userchoice) {
    var computerChoice = Math.random();

    if (computerChoice <= 0.34) {
        computerChoice = "rock"
    } else if (computerChoice >= 0.65) {
        computerChoice = "scissors"
    } else {
        computerChoice = "paper"
    }
    let result = compare(userchoice, computerChoice);
    if (userchoice == result) {
        s++
        result = "You win"
    } else if (computerChoice == result) {
        if (s != 0) {
            s--
        }
        result = "You lose"
    }
    return [result, computerChoice];
}

function pg() {
    localStorage.setItem("score", s);
    location.reload();
}

function tgl_dlg() {
    document.querySelector(".dlg").classList.toggle("vis");
}

function chk(x) {
    if (x.matches) {
        mbl = true
    } else {
        mbl = false
    }
}

var x = window.matchMedia("(max-width: 450px)")

chk(x);

x.addEventListener("change", function () {
    chk(x);
});