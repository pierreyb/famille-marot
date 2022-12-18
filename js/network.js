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

const linkStroke = "#999"; // link stroke color
const linkStrokeOpacity = 0.6; // link stroke opacity
const linkStrokeWidth = 1.5; // given d in links, returns a stroke width in pixels
const linkStrokeLinecap = "round"; // link stroke linecap

let div = document.querySelector('#FamilyChart');
let width = div.offsetWidth ;
let height = div.offsetHeight ;



const simulation = d3.forceSimulation()
.nodes(nodes)
.force('collide', d3.forceCollide().radius(100))
// Get the node in the center of the graph
.force("center", d3.forceCenter(width / 2, height / 2))
// Set the spouses together
.force("link", d3.forceLink(links.filter(el => el.type === "spouses")).id(function(d) { return d.id; }))
// Move the node based on the familyLevel
.force("y",d3.forceY().y(function(d) {
    return (d.familyLevel * height)/(maxFamilyLevel + 1) ;
}))
.on("tick", tick);

// Set the size of the svg to the size of the container div
const svg = d3.select('#FamilyChart').selectChild()
.attr("width", width)
.attr("height", height);

// Select the default g view use for zoom purpuse
const gview = d3.select(".familyView") ;

const link = gview.append("g")
.attr("stroke", typeof linkStroke !== "function" ? linkStroke : null)
.attr("stroke-opacity", linkStrokeOpacity)
.attr("stroke-width", typeof linkStrokeWidth !== "function" ? linkStrokeWidth : null)
.attr("stroke-linecap", linkStrokeLinecap)
.selectAll("line")
.data(links)
.join("line");


// Retrieve the default familyCard definition
const familyCard = d3.select(".familyCard");
familyCard.remove();

const node = gview.selectAll(".familyCard")
.data(nodes)
.enter()
.append(() => familyCard.clone(true).node())
.each(card.Card)
;

// zoom implementation
svg.call(d3.zoom()
.scaleExtent([.05, 1])  // This control how much you can unzoom (x0.5) and zoom (x20)
.on("zoom", zoomed));

function zoomed({transform}) {
    gview
    .attr("transform", transform);
}

function tick() {
    link
    .attr("x1", d => d.source.x)
    .attr("y1", d => d.source.y)
    .attr("x2", d => d.target.x)
    .attr("y2", d => d.target.y);

    const translate = function(d) { return "translate(" + d.x + "," + d.y + ")"};
    node
    .attr("transform", translate) ;
}

