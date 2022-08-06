/***
 * 
 * 
 * 
 * This is where most of the mechanics of this engine are kept.
 * If you wish to use this engine without changing the mechanics, go to ../action.js
 * 
 * 
*/
class PVector {
	x = 0;
	y = 0;
	constructor (x, y) {
		this.x = x;
		this.y = y;
	};

	// Methods (These change the PVector itself)
	sub (pv) {
		if (typeof(pv.x) === 'number' && typeof(pv.y) === 'number') {
			this.x -= pv.x;
			this.y -= pv.y;
		} else {
			throw new TypeError('PVectors can only subtract other PVectors.');
		}
	};
	add (pv) {
		if (typeof (pv.x) === 'number' && typeof (pv.y) === 'number') {
			this.x += pv.x;
			this.y += pv.y;
		} else {
			throw new TypeError('PVectors can only add other PVectors.');
		}
	};
	mult (num) {
		this.x *= num;
		this.y *= num;
	};
	div (num) {
		this.x /= num;
		this.y /= num;
	};
	mod (num) {
		this.x %= num;
		this.y %= num;
	};
	mag () {
		return Math.sqrt((this.x * this.x) + (this.y * this.y));
	};
	normalize () {
		this.x /= this.mag();
		this.y /= this.mag();
	};

	// Getter Methods
	get mag () {
		return Math.sqrt((this.x*this.x) + (this.y*this.y));
	};

	// Static Methods
	static sub (pva, pvb) {
		return new PVector(pva.x - pvb.x, pva.y - pvb.y);
	};
	static add (pva, pvb) {
		return new PVector(pva.x + pvb.x, pva.y + pvb.y);
	};
	static mult (pva, pvb) {
		return new PVector(pva.x * pvb.x, pva.y * pvb.y);
	};
	static div (pva, pvb) {
		return new PVector(pva.x / pvb.x, pva.y / pvb.y);
	};
	static mod (pva, pvb) {
		return new PVector(pva.x % pvb.x, pva.y % pvb.y);
	};
}

let __env__ = {
	fps: 30,
	_angleMode: "deg",
	rectMode: "center",
	matrix: {
		x: 0,
		y: 0,
		s: 0,
		r: 0,
	},
	matrix_o: {
		x: 0,
		y: 0,
		s: 0,
		r: 0,
	},
	shape: {
		begun: false,
		pathStart: {
			x: 0,
			y: 0,
		},
		prevPoint: {
			x: 0,
			y: 0,
		},
		path: "",
	},
	strokeProp: {
		r: 0,
		g: 0,
		b: 0,
		a: 255,
		w: 1,
	},
	fillColor: {
		r: 255,
		g: 255,
		b: 255,
		a: 255,
	},
	curveTightness: 0,
	get angleMode () {
		return this._angleMode;
	},
	set angleMode (newMode) {
		if (newMode.toLowerCase() === 'deg' || newMode.toLowerCase() === 'rad') {
			this._angleMode = newMode;
		}
	},
};
let UP = 38, DOWN = 40, LEFT = 37, RIGHT = 39, DEGREES = 'deg', RADIANS = 'rad', CLOSE = 'close';
let width = 600;
let height = 500;
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

function pushMatrix () {
	__env__.matrix_o = __env__.matrix;
}

function popMatrix () {
	__env__.matrix = __env__.matrix_o;
}

function translate (x, y) {
	__env__.matrix.x += x;
	__env__.matrix.y += y;
}

function rotate (theta) {
	__env__.matrix.r += theta;
}

function scale (num) {
	__env__.matrix.s *= num;
}

function angleMode (n) {
	__env__._angleMode = n;
}

function curveTightness (n) {
	__env__.curveTightness = -1 * (n - 100)/100;
}

function fill (r, g, b, a = 255) {
	if (b === undefined && g !== undefined) {
		__env__.fillColor = {
			r, g:r, b:r, a:g
		};
	} else if (b === undefined && g === undefined) {
		__env__.fillColor = {
			r, g:r, b:r, a:255
		};
	} else if (r !== undefined && g !== undefined && b !== undefined) {
		__env__.fillColor = {
			r, g, b, a
		};
	}
}

function stroke(r, g, b, a = 255) {
	if (b === undefined && g !== undefined) {
		__env__.strokeProp = {
			r, g: r, b: r, a: g, w: __env__.strokeProp.w
		};
	} else if (b === undefined && g === undefined) {
		__env__.strokeProp = {
			r, g: r, b: r, a: 255, w: __env__.strokeProp.w
		};
	} else if (r !== undefined && g !== undefined && b !== undefined) {
		__env__.strokeProp = {
			r, g, b, a, w: __env__.strokeProp.w
		};
	}
}

function noStroke () {
	__env__.strokeProp.r = 0;
	__env__.strokeProp.g = 0;
	__env__.strokeProp.b = 0;
	__env__.strokeProp.a = 0;
}

function noFill () {
	__env__.fillColor = {
		r: 0,
		g: 0,
		b: 0,
		a: 0,
	};
}

function ellipse (x, y, w, h) {
	bi("game").innerHTML += `<ellipse cx="${x}px" cy="${y}px" rx="${w/2}px" ry="${h/2}px" fill="rgba(${__env__.fillColor.r}, ${__env__.fillColor.g}, ${__env__.fillColor.b}, ${__env__.fillColor.a/255})" stroke="rgba(${__env__.strokeProp.r}, ${__env__.strokeProp.g}, ${__env__.strokeProp.b}, ${__env__.strokeProp.a/255})" strokeWidth="${__env__.strokeProp.w}" style="transform: translate(${__env__.matrix.x}px, ${__env__.matrix.y}px), scale(${__env__.matrix.s}), rotate(${__env__.matrix.r}${__env__._angleMode});"/>`;
}

function rect (x, y, w, h) {
	bi("game").innerHTML += `<rect x="${__env__.rectMode === "corner" ? (x - (w / 2)) : x}px" y="${__env__.rectMode === "corner" ? (y - (h / 2)) : y}px" width="${w}px" height="${h}px" fill="rgba(${__env__.fillColor.r}, ${__env__.fillColor.g}, ${__env__.fillColor.b}, ${__env__.fillColor.a/255})" stroke="rgba(${__env__.strokeProp.r}, ${__env__.strokeProp.g}, ${__env__.strokeProp.b}, ${__env__.strokeProp.a/255})" strokeWidth="${__env__.strokeProp.w}" style="transform: translate(${__env__.matrix.x}px, ${__env__.matrix.y}px), scale(${__env__.matrix.s}), rotate(${__env__.matrix.r}${__env__._angleMode});"/>`;
}

function line (x1, y1, x2, y2) {
	bi("game").innerHTML += `<line x1="${x1}px" y1="${y1}px" x2="${x2}px" y2="${y2}px" stroke="rgba(${__env__.strokeProp.r}, ${__env__.strokeProp.g}, ${__env__.strokeProp.b}, ${__env__.strokeProp.a / 255})" strokeWidth="${__env__.strokeProp.w}" style="transform: translate(${__env__.matrix.x}px, ${__env__.matrix.y}px), scale(${__env__.matrix.s}), rotate(${__env__.matrix.r}${__env__._angleMode});"/>`;
}

function cubic (x1, y1, cx1, cy1, cx2, cy2, x2, y2) {
	bi("game").innerHTML += `<path d="M ${x1} ${y1} C ${cx1} ${cy1} ${cx2} ${cy2} ${x2} ${y2}" stroke="rgba(${__env__.strokeProp.r}, ${__env__.strokeProp.g}, ${__env__.strokeProp.b}, ${__env__.strokeProp.a / 255})" strokeWidth="${__env__.strokeProp.w}" style="transform: translate(${__env__.matrix.x}px, ${__env__.matrix.y}px), scale(${__env__.matrix.s}), rotate(${__env__.matrix.r}${__env__._angleMode});"/>`;
}

function quadratic (x1, y1, cx, cy, x2, y2) {
	bi("game").innerHTML += `<path d="M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}" stroke="rgba(${__env__.strokeProp.r}, ${__env__.strokeProp.g}, ${__env__.strokeProp.b}, ${__env__.strokeProp.a / 255})" strokeWidth="${__env__.strokeProp.w}" style="transform: translate(${__env__.matrix.x}px, ${__env__.matrix.y}px), scale(${__env__.matrix.s}), rotate(${__env__.matrix.r}${__env__._angleMode});"/>`;
}

function circle (x, y, s) {
	ellipse(x, y, s, s);
}

function point (x, y) {
	bi("game").innerHTML += `<circle cx="${x}px" cy="${y}px" rx="${0}px" ry="${0}px" fill="rgba(${__env__.fillColor.r}, ${__env__.fillColor.g}, ${__env__.fillColor.b}, ${__env__.fillColor.a / 255})" stroke="rgba(${__env__.strokeProp.r}, ${__env__.strokeProp.g}, ${__env__.strokeProp.b}, ${__env__.strokeProp.a / 255})" strokeWidth="${__env__.strokeProp.w}" style="transform: translate(${__env__.matrix.x}px, ${__env__.matrix.y}px), scale(${__env__.matrix.s}), rotate(${__env__.matrix.r}${__env__._angleMode});"/>`;
}

function beginShape () {
	__env__.shape.begun = true;
	__env__.shape.path = "";
	__env__.shape.pathStart.x = 0;
	__env__.shape.pathStart.y = 0;
}

function vertex (x, y) {
	if (__env__.shape.begun) {
		if (__env__.shape.path) {
			__env__.shape.path += ` L ${x} ${y}`;
		} else {
			__env__.shape.path = `M ${x} ${y}`;
			__env__.shape.pathStart.x = x;
			__env__.shape.pathStart.y = y;
		}
		__env__.shape.prevPoint.x = x;
		__env__.shape.prevPoint.y = y;
	}
}

function quadraticVertex (cx, cy, x, y) {
	if (__env__.shape.begun) {
		if (__env__.shape.path) {
			__env__.shape.path += ` Q ${cx} ${cy} ${x} ${y}`;
		} else {
			__env__.shape.path = `M ${x} ${y}`;
			__env__.shape.pathStart.x = x;
			__env__.shape.pathStart.y = y;
		}
		__env__.shape.prevPoint.x = x;
		__env__.shape.prevPoint.y = y;
	}
}

function cubicVertex (cx1, cx2, cy1, cy2, x, y) {
	if (__env__.shape.begun) {
		if (__env__.shape.path) {
			__env__.shape.path += ` C ${cx1} ${cy1} ${cx2} ${cy2} ${x} ${y}`;
		} else {
			__env__.shape.path = `M ${x} ${y}`;
			__env__.shape.pathStart.x = x;
			__env__.shape.pathStart.y = y;
		}
		__env__.shape.prevPoint.x = x;
		__env__.shape.prevPoint.y = y;
	}
}

function curveVertex (x, y) {
	quadraticVertex(__env__.shape.prevPoint.x + (__env__.curveTightness * (__env__.shape.prevPoint.x - x)), y + (__env__.curveTightness * (y - __env__.shape.prevPoint.y)), x, y)
}

function endShape (way = 'none') {
	if (way === CLOSE) {
		vertex(__env__.shape.pathStart.x, __env__.shape.pathStart.y);
	}
	bi("game").innerHTML += `<path d="${__env__.shape.path}" fill="rgba(${__env__.fillColor.r}, ${__env__.fillColor.g}, ${__env__.fillColor.b}, ${__env__.fillColor.a / 255})" stroke="rgba(${__env__.strokeProp.r}, ${__env__.strokeProp.g}, ${__env__.strokeProp.b}, ${__env__.strokeProp.a / 255})" strokeWidth="${__env__.strokeProp.w}" style="transform: translate(${__env__.matrix.x}px, ${__env__.matrix.y}px), scale(${__env__.matrix.s}), rotate(${__env__.matrix.r}${__env__._angleMode});"/>`;
}

function background (r, g, b, a = 255) {
	let R, G, B, A;
	let rgba;
	if (b === undefined && g !== undefined) {
		rgba = {
			r, g: r, b: r, a: g
		};
	} else if (b === undefined && g === undefined) {
		rgba = {
			r, g: r, b: r, a: 255
		};
	} else if (r !== undefined && g !== undefined && b !== undefined) {
		rgba = {
			r, g, b, a
		};
	}
	R = rgba.r;
	G = rgba.g;
	B = rgba.b;
	A = rgba.a;
	bi("game").innerHTML = "";
	bi("game").style.background = `rgba(${R}, ${G}, ${B}, ${A})`;
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

function size (w, h) {
	width = w;
	height = h;
	bi("game").setAttribute('width', `${w}px`);
	bi("game").setAttribute('height', `${h}px`);
}

var draw = () => {};