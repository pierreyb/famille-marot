async function fetchFamillyData() {
    let data_url = './data/data_marot.json';
    try {
        let res = await fetch(data_url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

function listFamilly(item) {
    function createFamillyLink(source, target, type) {
        for (let i=0;i < target.length;i++) {
            famillyLink.push(new Object({source: source, target: target[i], type: type}));
        }
    }

    // For each rels type we create a link of this type
    for (const [key, value] of Object.entries(item.rels)) {
        let target = value;
        if (typeof value === 'string') {
            target = [value];
        }
        createFamillyLink(item.id,target,key) ;
    }
}

// read the json with failly date
let famillyData = await fetchFamillyData();

// Build the familly link based on the relation
let famillyLink = [];
famillyData.forEach(listFamilly) ;


// Drawing part
let nodes = famillyData ;
let links = famillyLink ;

const nodeFill = "currentColor"; // node stroke fill (if not using a group color encoding)
const nodeStroke = "#fff"; // node stroke color
const nodeStrokeWidth = 1.5; // node stroke width, in pixels
const nodeStrokeOpacity = 1; // node stroke opacity
const nodeRadius = 5; // node radius, in pixels
const linkStroke = "#999"; // link stroke color
const linkStrokeOpacity = 0.6; // link stroke opacity
const linkStrokeWidth = 1.5; // given d in links, returns a stroke width in pixels
const linkStrokeLinecap = "round"; // link stroke linecap

let div = document.querySelector('#FamilyChart');
let width = div.offsetWidth ;
let height = div.offsetHeight ;



const simulation = d3.forceSimulation()
.nodes(nodes)
//.force("link", d3.forceLink(links).id(function(d) { return d.id; }))
.force("center", d3.forceCenter(width / 2, height / 2))
.on("tick", tick);

const svg = d3.create("svg")
.attr("width", width)
.attr("height", height)
.attr("style", "max-width: 100%; height: auto; height: intrinsic;");

const link = svg.append("g")
.attr("stroke", typeof linkStroke !== "function" ? linkStroke : null)
.attr("stroke-opacity", linkStrokeOpacity)
.attr("stroke-width", typeof linkStrokeWidth !== "function" ? linkStrokeWidth : null)
.attr("stroke-linecap", linkStrokeLinecap)
.selectAll("line")
.data(links)
.join("line");

const node = svg.append("g")
.attr("fill", nodeFill)
.attr("stroke", nodeStroke)
.attr("stroke-opacity", nodeStrokeOpacity)
.attr("stroke-width", nodeStrokeWidth)
.selectAll("circle")
.data(nodes)
.join("circle")
.attr("r", nodeRadius) ;


function tick() {
    link
    .attr("x1", d => d.source.x)
    .attr("y1", d => d.source.y)
    .attr("x2", d => d.target.x)
    .attr("y2", d => d.target.y);
    node
    .attr("cx", d => d.x)
    .attr("cy", d => d.y);
}

d3.select('#FamilyChart').append(() => svg.node());
