const startBtn = document.getElementById("start-button");
const detailShow = document.getElementsByClassName("details-container")[0];
const dfsbfsShow = document.getElementsByClassName("parse-container")[0];

// Variabels for display nodes
let conContainer = document.getElementsByClassName("con-container")[0];
let nodeContainer = document.getElementsByClassName("node-container")[0];
let nodesName = document.getElementById("nodes");
let connectionsName = document.getElementById("connections");
let bfsContainer = document.getElementsByClassName("bfs-container")[0];
let dfsContainer = document.getElementsByClassName("dfs-container")[0];

// Main functionality

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

function refreshValue() {
    detailShow.style.opacity = "0";
    dfsbfsShow.style.opacity = "0";
    setTimeout(()=>{
        detailShow.style.display = "none";
        dfsbfsShow.style.display = "none";
    },450);

    Array.from(
        conContainer
        .getElementsByTagName("span"))
        .forEach(el => el.remove());
    
    Array.from(
        bfsContainer
        .getElementsByTagName("span"))
        .forEach(el => el.remove());

    Array.from(
        dfsContainer
        .getElementsByTagName("span"))
        .forEach(el => el.remove());
        
    Array.from(
        nodeContainer
        .getElementsByTagName("span"))
        .forEach(el => el.remove());

    nodesName.value = '';
    connectionsName.value = '';
    startBtn.classList.remove("correct", "wrong");

}

function parseVars(nodesToParse, connecsToParse) {
    let parseNReg = /(\w+)/gi;
    let parseCReg = /(\w+\s*\-\>\s*\w+)/gi;
    let nodes = nodesToParse.match(parseNReg);
    let conns = connecsToParse
                .match(parseCReg)
                .map(item => {
                    let parse = item.match(parseNReg);
                     return [parse[0], parse[1]];
                });

    let pp = true;

    conns.forEach(con => {
        // Checking conns
        if(nodes.includes(con[0]) === false || nodes.includes(con[1]) === false){
            pp = false;
        }
        return;
    });

    if(pp === false){
        // If nodes and connections doesn't match warning message
        let warningDisplay = document.getElementsByClassName("problem-section")[0];
        warningDisplay.style.opacity = "1";
        setTimeout(()=>{
            refreshValue(); 
            warningDisplay.style.opacity = "0";
        }, 5000);
    }else{
        //Going further
        showDetails(nodes, conns);
    }
}

function showDetails(nodes, conns){
    const adjancencyList = new Map();
    let dataBFS = {
        nodes: [],
        links: []
    };
    let dataDFS = {
        nodes: [],
        links: []
    };

    nodes.forEach(item => {
        // Adding nodes to adjancencyList
        addNode(item, adjancencyList);

        // Showing the nodes
        let node = document.createElement("span");
        node.appendChild(document.createTextNode(item));
        nodeContainer.appendChild(node);
        return;
    });

    conns.forEach(item => {
        // Adding connections to adjancencyList
        addLink(...item, adjancencyList);

        // Showing connections
        let startPoint = item[0];
        let endPoint = item[1];
        let con = document.createElement("span");
        con.appendChild(document.createTextNode(startPoint + " \-\> " + endPoint));
        conContainer.appendChild(con);
        return;
    })

    // Finding BFS and DFS starting from node with most connections
    nodes.sort((a, b) => adjancencyList.get(b).length - adjancencyList.get(a).length)[0];

    const bfs = BFS(adjancencyList, nodes[0]);
    const dfs = DFS(adjancencyList, nodes[0], new Set());

    bfs.forEach((value, index) => {
        if(index > 0){
            dataBFS.links.push({'source':bfs[index-1], 'target':value})
        }
        dataBFS.nodes.push({'name':value});
        return;
    });

    dfs.forEach((value, index) => {
        if(index > 0){
            dataDFS.links.push({'source':dfs[index-1], 'target':value})
        }
        dataDFS.nodes.push({'name':value});
        return;
    })

    //Transition 
    bdfsTransition();
    //Span to HTML
    bdfsDisplay(bfs, dfs);
    //Span to D3
    drawBDFS(dataBFS, dataDFS);    
}

function bdfsTransition(){
    detailShow.style.display = "flex";
    dfsbfsShow.style.display = "flex";
    setTimeout(()=>{
        detailShow.style.opacity = "1";
        dfsbfsShow.style.opacity = "1";
    },450);
    
}

function bdfsDisplay(bfs, dfs){
    let bfsS = "";
    bfs.forEach(item => {
        bfsS = bfsS + item + ', ';
        return;
    })
    bfsS = bfsS.slice(0, bfsS.length - 2);

    let dfsS = "";
    dfs.forEach(item => {
        dfsS = dfsS + item + ', ';
        return;
    })
    dfsS = dfsS.slice(0, dfsS.length - 2);

    let bfsSpan = document.createElement("span");
    bfsSpan.appendChild(document.createTextNode(bfsS));
    bfsContainer.appendChild(bfsSpan);

    
    let dfsSpan = document.createElement("span");
    dfsSpan.appendChild(document.createTextNode(dfsS));
    dfsContainer.appendChild(dfsSpan);
}

// Calculation
function addNode(node, adjancencyList){
    adjancencyList.set(node, []);
}

function addLink(nodeStart, nodeEnd, adjancencyList){
    adjancencyList.get(nodeStart).push(nodeEnd);
}


function BFS(adjancencyList, nodeStart){
    const queue = [nodeStart];
    const visited = new Set();
    visited.add(nodeStart);

    while(queue.length > 0) {
        const currentNode = queue.shift(); // getting next node
        const nextNodes = adjancencyList.get(currentNode); //finding posibilities of nextNodes

        for(const nextNode of nextNodes){
            if(!visited.has(nextNode)){
                visited.add(nextNode);
                queue.push(nextNode);
            }
        }
    }
    return Array.from(visited);
}

function DFS(adjancencyList, nodeStart, visited = new Set()){
    visited.add(nodeStart);

    const nextNodes = adjancencyList.get(nodeStart);

    for(const nextNode of nextNodes) {
        if(!visited.has(nextNode)){
            DFS(adjancencyList, nextNode, visited);
        }
    }
    return Array.from(visited);
}

