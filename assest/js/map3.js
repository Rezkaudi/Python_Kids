

// Sample data representing the tasks and their connections
const data = [
  { id: 1, name: '1', links: [2] },
  { id: 2, name: '2', links: [3] },
  { id: 3, name: '3', links: [4] },
  { id: 4, name: '4', links: [5] },
  { id: 5, name: '5', links: [] },


];


// Assign specific coordinates for each task


var screenWidth = window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

var inc = screenWidth / 6
// console.log(inc)

const nodeCoordinates = [
  { id: 1, x: inc, y: 325 },
  { id: 2, x: 2 * inc, y: 325 },
  { id: 3, x: 3 * inc, y: 325 },
  { id: 4, x: 4 * inc, y: 325 },
  { id: 5, x: 5 * inc, y: 325 },
];

// Combine task data with coordinates
const nodes = data.map(d => ({
  ...d,
  ...nodeCoordinates.find(nc => nc.id === d.id)
}));

// Calculate the links between tasks
const links = [];
data.forEach(d => {
  d.links.forEach(link => {
    links.push({ source: d.id, target: link });
  });
});

// Create the SVG container
const svg = d3.select('svg');

// Draw the links between tasks
svg.selectAll('.link')
  .data(links)
  .enter()
  .append('line')
  .attr('class', 'link')
  .attr('x1', d => nodes.find(n => n.id === d.source).x)
  .attr('y1', d => nodes.find(n => n.id === d.source).y)
  .attr('x2', d => nodes.find(n => n.id === d.target).x)
  .attr('y2', d => nodes.find(n => n.id === d.target).y);

// Draw the circles representing each task
const nodeGroup = svg.selectAll('.node')
  .data(nodes)
  .enter()
  .append('g')
  .attr('class', 'node')
  .attr('transform', d => `translate(${d.x},${d.y})`);

const da = [
  { id: 1, href: a1, c: null },
  { id: 2, href: a2, c: null },
  { id: 3, href: a3, c: null },
  { id: 4, href: a4, c: null },
  { id: 5, href: a5, c: null },
];

for (let x in da) {
  if (da[x].href == null) {
    da[x].c = 'off';
  }

}

nodeGroup.append('a')
  .data(da)
  .attr('href', d => d.href)
  .append('circle')
  .attr('id', d => d.c)
  .attr('class', 'circ')
  .attr('r', 40)
  .on('mouseover', function () {
    d3.select(this).transition().attr('r', 60);
  })
  .on('mouseout', function () {
    d3.select(this).transition().attr('r', 40);
  });




// Add labels to the circles
nodeGroup.append('text')
  .attr('dy', '0.35em')
  .attr('text-anchor', 'middle')
  .text(d => d.name);

// node.style('fill', 'red');