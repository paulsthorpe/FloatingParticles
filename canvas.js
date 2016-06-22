//create object for canvas element
var canvas = document.getElementById("canvasElement");

//if canvas object exist in html
if (canvas && canvas.getContext) {
    var context = canvas.getContext("2d");
    startCanvas();
}

function startCanvas() {
    //add eventlistener to the canvas
    canvas.addEventListener("mousemove", MouseMove, false);
    //call animate every fraction of a second, this controls motion speed
    setInterval(animate, 30);
    canvasSize();
}

//create empty array for the animated stars
var stars = [];
//assigns total number of dots derived from window width
var thisMany = Math.floor(window.innerWidth / 35);

//populate stars array with an object for each star containing its properties
for (var i = 0; i < thisMany ; i++) {
    stars.push({
        //randomn x and value inside window width and height
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        xAnimateBy: (Math.random()*3),
        //animation up multiplier
        yAnimateBy: (Math.random()*-3),
        size: 2,
        color: "rgba("+Math.round(Math.random()*150)+",210,202,1)"
    });

}

function animate() {
    //create canvas size properties, prevent trailing effect
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    //control animation for stars
    for (var n = 0; n < thisMany; n++) {
        //object x and y value + animation factor
        stars[n].x += stars[n].xAnimateBy;
        stars[n].y += stars[n].yAnimateBy;
        //if x value for dot make object hit right side,
        if (stars[n].x > window.innerWidth) {
            //send object left
            stars[n].xAnimateBy = -1 - Math.random();
            //if x value for object hits left side,
        } else if (stars[n].x < 0) {
            //send object right
            stars[n].xAnimateBy = 1 + Math.random();
        }

        //control y zxis animation
        //if x location is greater than window width
        if (stars[n].y > window.innerHeight) {
            stars[n].yAnimateBy = (-1 - Math.random());
            //if object x location is less than zero(top of page),
        } else if (stars[n].y < 0) {
            //send dot back to bottom by resetting the y coordinate to full height, and set anima
            stars[n].y = window.innerHeight;
            // stars[n].yAnimateBy = 1;
        }

        stars.forEach(function(secondObject) {
            //set maximun line distance
            var maxDistance = 10000;
            //check distance between two stars
            var checkedDistance = Math.pow(secondObject.x - stars[n].x, 2) + Math.pow(secondObject.y - stars[n].y, 2);
            //if checkedistance is < maxDistance, set max distance to checkeddistance, otherwise return maxDistance
            if (checkedDistance < maxDistance){
                maxDistance = checkedDistance;
            }
            if (checkedDistance > maxDistance){
                return maxDistance;
            }
            context.moveTo(stars[n].x, stars[n].y);
            context.quadraticCurveTo(stars[n].x, stars[n].y, secondObject.x, secondObject.y);
            context.strokeStyle = stars[n].color;
            context.stroke();
        });
        //distance between mouselocation and object
        var mouseProximity = DistanceBetween(mouseLocation, stars[n]);
        //set size of object dependent on mouse location
        var animationScale = Math.max(Math.min(25 - mouseProximity / 10, 10), 1);
        context.fillStyle = stars[n].color;
        context.beginPath();
        //draw circle, fill
        context.arc(stars[n].x, stars[n].y, stars[n].size * animationScale, 0, Math.PI * 2, true);
        context.fill();
    }//for loop
}//animate

//Helper functions
function canvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function DistanceBetween(client, object) {
    var xDistance = client.x - object.x;
    var yDistance = client.y - object.y;
    return Math.sqrt((xDistance * xDistance) + (yDistance * yDistance));
}

///////////////////////////////////////////////////////////////////////////////mouse events
//create mouse location object
var mouseLocation = {
    xLocation: 0,
    yLocation: 0
};
//set mouselocation dynamically
function MouseMove(client) {
    mouseLocation.x = client.layerX;
    mouseLocation.y = client.layerY;
}
