let __env__ = {
	fps: 30,
};
let fillColor = {
	r: 255,
	g: 255,
	b: 255,
	a: 255,
};
let strokeProp = {
	r: 0,
	g: 0,
	b: 0,
	a: 255,
	w: 1,
};
function $ (el) {
	return document.querySelector(el);
}
function bi (el) {
	return document.getElementById(el);
}
var mouseClicked = function () {};
var mousePressed = function () {};
var mouseReleased = function () {};
var keyTyped = function (k) {};
var keyPressed = function (k) {};
var keyReleased = function (k) {};
function fill (r, g, b, a = 255) {
	if (b === undefined && g !== undefined) {
		fillColor = {
			r, g:r, b:r, a:g
		};
	} else if (b === undefined && g === undefined) {
		fillColor = {
			r, g:r, b:r, a:255
		};
	} else if (r !== undefined && g !== undefined && b !== undefined) {
		fillColor = {
			r, g, b, a
		};
	}
}
function stroke (r, g, b, a = 255) {
	strokeProp = {
		r, g, b, a
	};
}
function noStroke () {
	strokeProp.r = 0;
	strokeProp.g = 0;
	strokeProp.b = 0;
	strokeProp.a = 0;
}
function noFill () {
	fillColor = {
		r: 0,
		g: 0,
		b: 0,
		a: 0,
	};
}
function ellipse (x, y, w, h) {
	bi("game").innerHTML += `<ellipse cx = "${x}px" cy = "${y}px" rx = "${w/2}px" ry = "${h/2}px" fill = "rgba(${fillColor.r}, ${fillColor.g}, ${fillColor.b}, ${fillColor.a/255})" stroke = "rgba(${strokeProp.r}, ${strokeProp.g}, ${strokeProp.b}, ${strokeProp.a/255})" strokeWidth = "${strokeProp.w}"/>`;
}
function rect (x, y, w, h) {
	bi("game").innerHTML += `<rect x = "${x}px" y = "${y}px" width = "${w}px" height = "${h}px" fill = "rgba(${fillColor.r}, ${fillColor.g}, ${fillColor.b}, ${fillColor.a/255})" stroke = "rgba(${strokeProp.r}, ${strokeProp.g}, ${strokeProp.b}, ${strokeProp.a/255})" strokeWidth = "${strokeProp.w}"/>`;
}
function circle (x, y, s) {
	ellipse(x, y, s, s);
}
function background (r = 255, g = 255, b = 255, a = 255) {
	bi("game").innerHTML = "";
	bi("game").style.background = `rgba(${r}, ${g}, ${b}, ${a})`;
}
function constrain (val, low, high) {
	if (val > high) {
		return high;
	} else if (val < low) {
		return low;
	} else {
		return val;
	}
}
var draw = () => {};