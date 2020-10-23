const startBtn = document.getElementById("start-button");
const refresh = document.getElementsByClassName("details-container")[0];
let conContainer = document.getElementsByClassName("con-container")[0];
let nodeContainer = document.getElementsByClassName("node-container")[0];
let nodesName = document.getElementById("nodes");
let connectionsName = document.getElementById("connections");

function refreshValue() {
    refresh.style.display = "none"; 

    Array.from(
        document.getElementsByClassName("con-container")[0]
        .getElementsByTagName("span"))
        .forEach(el => el.remove());
        
    Array.from(
        document.getElementsByClassName("node-container")[0].getElementsByTagName("span"))
        .forEach(el => el.remove());

    nodesName.value = '';
    connectionsName.value = '';
    startBtn.classList.remove("correct", "wrong");

}

function startGraph() {
    nodesName.value = document.getElementById("nodes").value;
    connectionsName.value = document.getElementById("connections").value;  

    let pred = true;
    let regNode = /^\[\w+\,(\s+\w+\,|\w+\s+\,|\w+\,)*\s*\w+\]$/gi;
    let regConn = /^\[(\s*\w+\s*\-\>\s*\w+\s*\,)*(\s*\w+\s*\-\>\s*\w+\s*)\]$/gi;

    if(nodesName.value.match(regNode) && connectionsName.value.match(regConn) ){
        if(startBtn.classList.contains("wrong")) startBtn.classList.remove("wrong");
        startBtn.classList.add("correct");
    } else{
        if(startBtn.classList.contains("correct")) startBtn.classList.remove("correct");
        startBtn.classList.add("wrong")
        pred = false;
    }

    if(pred){
        parseVars(nodes.value, connectionsName.value)
    }

}

function parseVars(nodesToParse, connecsToParse) {
    let parseNReg = /(\w+)/gi;
    let parseCReg = /(\w+\s*\-\>\s*\w+)/gi;
    let nodes = nodesToParse.match(parseNReg);
    let conns = connecsToParse
                .match(parseCReg)
                .map(item => {
                    let parse = item.match(parseNReg);
                     return {[parse[0]] : parse[1]};
                });
                // .reduce((obj, item) => 
                // (obj[Object.keys(item)[0]] = Object.values(item)[0], obj), {});
    
    console.log(nodes);
    console.log(conns);
    showDetails(nodes, conns);
}

function showDetails(nodes, conns){
    refresh.style.display = "flex";

    nodes.forEach(item => {
        let node = document.createElement("span");
        node.appendChild(document.createTextNode(item));
        nodeContainer.appendChild(node);
        return;
    });

    conns.forEach(item => {
        let startPoint = Object.keys(item)[0];
        let endPoint = Object.values(item)[0];
        let con = document.createElement("span");
        con.appendChild(document.createTextNode(startPoint + " \-\> " + endPoint));
        conContainer.appendChild(con);
        return;
    })
}