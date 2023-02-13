//no animation / interaction chart
//if you want to use animation or create a loading state look at the cat fact example from last week 
// use a boolean to control when your data is loaded

let breakfast, links;
let theta = 0;

function setup() {
  createCanvas(500, 500);

  //no animation / interaction chart
  noLoop();

  fetch("./json/DataRetrieval.json").then(function(response) {
    return response.json();
  }).then(function(data) {

    console.log(data);
    
    //breakfast = data.breakfast;
    links = data.content.links;
    console.log(links.length);


    //using no Loop? you can just call your function once the data is loaded
    drawChart();
  
  }).catch(function(err) {
    console.log(`Something went wrong: ${err}`);
  });

}

function draw() {
  background(200);
  
  drawChart();
  //theta+= 2;
  /* stroke(255);
  text (theta, 20, 20, 100, 100); */
  console.log(theta);
}

function drawChart(){

  let total = 0; 
  for (let i= 0 ; i<links.length; i++) {
    total += links[i].images.length;
  }
  console.log(total);

  let centreX = width/2;
  let centreY = height/2; 
  let diam = 200;
  let angleStart = TWO_PI*0.75+theta; 

  for (let i=0; i<links.length; i++) {

    let item = links[i];

    let itemFraction = item.images.length/total;
    let itemAngle = itemFraction * TWO_PI; 
    let angleEnd = angleStart + itemAngle;

    //normal pie
    // fill(item.color);
    fill(random(255), random(120, 170));
    stroke(0, 20); 
    strokeWeight(1); 
    strokeJoin(ROUND); 
    arc(centreX, centreY, diam, diam, angleStart, angleEnd, PIE); //PIE creates closed slices the the center


    noStroke();
    fill(0, random(40,100)); 
    push();
    translate(centreX, centreY); 
    rotate(angleEnd+theta); 
    textAlign(LEFT, BOTTOM); 
    //normal pie
    text(links[i].text, diam/2/* diam/2 - 20 */, -8); 

    pop();

    //update the angle start before the next iteration
    angleStart += (itemAngle);
  }

}