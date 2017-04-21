/*
File Description
----------------
About: Clock file, this file contains everything about the clock
*/
// Main function called from speechRecognition.js
function createClock() {
    var hub = $("#hub");
    var clockContainer = $("<div id='clock-container'></div>");
    var timeSpanHours = $("<span class='time' id='H'></span>");
    var deliminatorSpan1 = $("<span class='delim'>:</span>");
    var timeSpanMinutes = $("<span class='time' id='M'></span>");
    var deliminatorSpan2 = $("<span class='delim'>:</span>");
    var timeSpanSeconds = $("<span class='time' id='S'></span>");
    clockContainer.append(timeSpanHours)
    clockContainer.append(deliminatorSpan1);
    clockContainer.append(timeSpanMinutes);
    clockContainer.append(deliminatorSpan2);
    clockContainer.append(timeSpanSeconds);
    hub.append(clockContainer);
    // slideIntoHub(clockContainer);
    var c = document.getElementById("hub").appendChild(document.createElement("canvas")),
    	w = innerWidth,
    	h = innerHeight;

    c.width = w;
    c.height = h;

    var ctx = c.getContext("2d"),
    	//degrees to radians conversion function
    	deg2rad = d => (Math.PI / 180) * d;

    //constructor for the circles
    function radialBar(x, y, r, max, value) {
    	var self = this;
    	self.X = x || 0;
    	self.Y = y || 0;
    	self.R = r || 0;
    	self.MAX = max || 1;
    	self.value = value || 0;
    	self.target = value || 0;

    	self.update = function(v) {
    		//lerp
    		self.target = v > 0 ? v : 0.1;
    		self.value += (self.target - self.value) * 0.05;

    		ctx.arc(
    			this.X,
    			this.Y,
    			this.R,
    			//move starting point to top
    			deg2rad(-90),
    			deg2rad(-90) + (deg2rad(360) * (self.value / self.MAX))
    		);
    	}
    }

    ctx.lineWidth = 2;
    ctx.lineCap = "round";

    var spacing = 10,
    	radius = 200,
    	//contains values for hours, minutes, seconds
    	times,
    	//create circles
    	circles = {
    		H: new radialBar(w / 2, h / 2, radius, 24, 0),
    		M: new radialBar(w / 2, h / 2, radius - spacing, 60, 0),
    		S: new radialBar(w / 2, h / 2, radius - spacing - spacing, 60, 0)
    	},
    	//text elements
    	elements = {
    		H: document.getElementById("H"),
    		M: document.getElementById("M"),
    		S: document.getElementById("S")
    	};

    //set text colors
    Object.keys(elements).forEach((k, i) =>
    	elements[k].style.color =
    	"hsl(0, 0%, 100%)");

    //update time values and text once per second
    function updateTime() {
    	var time = new Date();
    	times = {
    		H: ((time.getHours() + 24) % 12 || 12) + "",
    		M: (time.getMinutes() + ""),
    		S: (time.getSeconds() + "")
    	};

    	//update text
    	Object.keys(times).forEach(k =>
    		elements[k].innerHTML = (String(times[k]).length > 1) ? times[k] : times[k] = "0" + times[k] //pad with 0s if needed
    	);

    	setTimeout(updateTime, 1000);
    }

    function draw() {
    	ctx.clearRect(0, 0, w, h);

    	//ctx.fillText(times.H + ":" + times.M + ":" + times.S, w / 2, h / 2 + 56 / 2);

    	//update circles, set their color, draw
    	Object.keys(circles).forEach((k, i) => {
    		ctx.beginPath();
    		circles[k].update(times[k]);
    		ctx.strokeStyle = "hsl(0, 0%, 100%)";
    		ctx.stroke();
    	});

    	requestAnimationFrame(draw);
    }
    //start
    updateTime();
    draw();
}
