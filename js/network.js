import * as fetchData from './data/fetch-data.js';
import * as familyNetwork from './data/family-network.js';
import * as card from './view/cards.js';

// read the json with failly date
let data_url = './data/data_marot.json';
let familyData = await fetchData.fetchfamilyData(data_url);

// Put parents together
familyData.forEach(familyNetwork.setParents) ;

// Add a level for each member
familyData.forEach(familyNetwork.setFamilyLevel) ;
const maxFamilyLevel = Math.max.apply(null,familyData.map(x => x.familyLevel));


// Build the family link based on the relation
let familyLink = fetchData.createFamilyLinks(familyData);


// Drawing part
let nodes = familyData ;
let links = familyLink ;

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
.force("center", d3.forceCenter(width / 2, height / 2))
.force("y",d3.forceY().y(function(d) {
    return (d.familyLevel * height)/(maxFamilyLevel + 1) ;
}))
//.force("link", d3.forceLink(links).id(function(d) { return d.id; }))
.on("tick", tick);

// Set the size of the svg to the size of the container div
const svg = d3.select('#FamilyChart').selectChild()
.attr("width", width)
.attr("height", height);

const link = svg.append("g")
.attr("stroke", typeof linkStroke !== "function" ? linkStroke : null)
.attr("stroke-opacity", linkStrokeOpacity)
.attr("stroke-width", typeof linkStrokeWidth !== "function" ? linkStrokeWidth : null)
.attr("stroke-linecap", linkStrokeLinecap)
.selectAll("line")
.data(links)
.join("line");


// Set the parameter of the node
const familyCard = d3.selectAll(".familyCard");
familyCard.remove();

//const node = svg.selectAll("g")
const node = svg
.selectAll("g")
.data(nodes)
.enter()
.append("g")
.each(card.Card) ;



function tick() {
    link
    .attr("x1", d => d.source.x)
    .attr("y1", d => d.source.y)
    .attr("x2", d => d.target.x)
    .attr("y2", d => d.target.y);

    const translate = function(d) { return "translate(" + d.x + "," + d.y + ")"};
    node
    .attr("transform", translate);
}

