

// Sample data representing the tasks and their connections
const data = [
  { id: 1, name: '1', links: [2] },
  { id: 2, name: '2', links: [3] },
  { id: 3, name: '3', links: [4] },
  { id: 4, name: '4', links: [5] },
  { id: 5, name: '5', links: [6] },
  { id: 6, name: '6', links: [7] },
  { id: 7, name: '7', links: [8] },
  { id: 8, name: '8', links: [9] },
  { id: 9, name: '9', links: [10] },
  { id: 10, name: '10', links: [11] },
  { id: 11, name: '11', links: [12] },
  { id: 12, name: '12', links: [] }
];


// Assign specific coordinates for each task


var screenWidth = window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

var inc = screenWidth / 13
var uu = inc * 0.08
console.log(inc * 0.08)

let all_stars = document.querySelectorAll('.star')
let odd = 1

for (let i = 0; i < all_stars.length; i += 6) {
  all_stars[i].style.left = odd * inc + inc / 2 - 25 - 20 + 'px'
  all_stars[i + 1].style.left = odd * inc + inc / 2 - 25 + 'px'
  all_stars[i + 2].style.left = odd * inc + inc / 2 - 25 + 20 + 'px'


  all_stars[i + 3].style.left = odd * inc + inc / 2 - 25 - 20 + 'px'
  all_stars[i + 4].style.left = odd * inc + inc / 2 - 25 + 'px'
  all_stars[i + 5].style.left = odd * inc + inc / 2 - 25 + 20 + 'px'

  // console.log(odd * inc + 25)
  odd += 2
}





console.log(inc)
const nodeCoordinates = [
  { id: 1, x: 1 * inc + inc / 2, y: 200 },
  { id: 2, x: 1 * inc + inc / 2, y: 450 },
  { id: 3, x: 3 * inc + inc / 2, y: 450 },
  { id: 4, x: 3 * inc + inc / 2, y: 200 },
  { id: 5, x: 5 * inc + inc / 2, y: 200 },
  { id: 6, x: 5 * inc + inc / 2, y: 450 },
  { id: 7, x: 7 * inc + inc / 2, y: 450 },
  { id: 8, x: 7 * inc + inc / 2, y: 200 },
  { id: 9, x: 9 * inc + inc / 2, y: 200 },
  { id: 10, x: 9 * inc + inc / 2, y: 450 },
  { id: 11, x: 11 * inc + inc / 2, y: 450 },
  { id: 12, x: 11 * inc + inc / 2, y: 200 }
];

// const nodeCoordinates = [
//   { id: 1, x: 75, y: 200 },
//   { id: 2, x: 275, y: 200 },
//   { id: 3, x: 275, y: 450 },
//   { id: 4, x: 475, y: 450 },
//   { id: 5, x: 475, y: 200 },
//   { id: 6, x: 675, y: 200 },
//   { id: 7, x: 675, y: 450 },
//   { id: 8, x: 875, y: 450 },
//   { id: 9, x: 875, y: 200 },
//   { id: 10, x: 1075, y: 200 },
//   { id: 11, x: 1075, y: 450 },
//   { id: 12, x: 1275, y: 450 }
// ];

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
  { id: 6, href: a6, c: null },
  { id: 7, href: a7, c: null },
  { id: 8, href: a8, c: null },
  { id: 9, href: a9, c: null },
  { id: 10, href: a10, c: null },
  { id: 11, href: a11, c: null },
  { id: 12, href: a12, c: null },
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

