var textArea = document.getElementById("textarea");
var sentence = document.getElementById("sentence");
var words = document.getElementById("words");
var attach = document.getElementById("attach");
var undo = document.getElementById("undo");
var redo = document.getElementById("redo");
var deleted = document.getElementById("delete");
var web = document.getElementById("web");
var load = document.getElementById("loading");

var result = document.getElementById("result");

var plagScore = document.getElementById("plagScore");
var score = document.getElementById("score");

var reportResult = document.getElementById("reportResult");

var plagScoreValue = 0;

var scoreValue = 100

var isNotworking = true;

var cache = [];
var cachePosition = 0;
var change = true;
function addCache() {
     if (cache.length > cachePosition + 3) { cache = [];}
    if (change) {
        setTimeout(() => {
        if (cache[0] == undefined) {
            cache.push(textArea.value);
            change = true;
        } else {
            if ((cache[cache.length - 1]) != textArea.value) {
                cache.push(textArea.value);
                change = true;
            }
             
        }
            cachePosition = cache.length - 1;
            
        }, 1000);
        change = false;
    }

    sentence.innerText = textArea.value.split(".").length;
    words.innerText = textArea.value.split(" ").length;

}

function undoText() {
    if (isNotworking) {
         if (cachePosition > 0) {
        cachePosition--;
    }
    if (cache[cachePosition]!= undefined) {
        textArea.value = cache[cachePosition]
    }
    }
   
}

function redoText() {
    if (isNotworking) {
        if (cachePosition < cache.length) {
        cachePosition++;
    }
    if (cache[cachePosition] != undefined) {
        textArea.value = cache[cachePosition]
    } 
    }
    
}

function cleared() {
    if (isNotworking) {
        textArea.value = "";
    cache.push("");
    }
}

function copy() {
    if (isNotworking) {
        navigator.clipboard.writeText(textArea.value);
    }

}

function loading() {
    load.style.display = "flex";
    load.style.opacity = 0.55;
    textArea.disabled = true;
    isNotworking = false;
    document.querySelectorAll(".click,.btn, a").forEach(value => {
        value.style.cursor = "wait"
    });
}


function loadFinish() {
    load.style.display = "none";
    load.style.opacity = 0.55;
    textArea.disabled = false;
    isNotworking = true;
    document.querySelectorAll(".click,.btn, a").forEach(value => {
        value.style.cursor = "pointer"
    });
}

function basicSearch() {
    result.style.display = "block"
    loading();
    score.innerText = 100
     plagScore.innerText = 0
reportResult.innerHTML  = textArea.value
}

 function advanceSearch() {
    result.style.display = "block"
     loading();
     score.innerText = 100
     plagScore.innerText = 0
    reportResult.innerHTML = textArea.value.trim();
    let sentences = reportResult.innerText.split(".");
    getText(sentences, 0);
    
}
async function getText(sentences,position) {
    setTimeout(() => {
        if (sentences[position].length > 30) {
            sentences[position] = `<p class="text-danger">${sentences[position]}.</p>`
            reportResult.innerHTML = sentences.join(" ");
            plagScoreValue += scoreValue * Math.random(0,1);
            
            plagScore.innerText = Math.ceil(plagScoreValue / (position + 1));
            score.innerText = Math.ceil(scoreValue - (plagScoreValue / (position+1)))
        } else {
             sentences[position] = `<p>${sentences[position]}.</p>`
            reportResult.innerHTML = sentences.join(" ");

            plagScoreValue += scoreValue * Math.random(0,1);
            
            plagScore.innerText = Math.ceil(plagScoreValue / (position + 1));
            score.innerText = Math.ceil(scoreValue - (plagScoreValue / (position+1)))
        }
       

        if (sentences[position+1] != undefined ) {
            getText(sentences, position+1);
        } else {
            loadFinish();
        }
    }, 3000);
    }