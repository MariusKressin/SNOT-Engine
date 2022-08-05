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
	get angleMode () {
		return this._angleMode;
	},
	set angleMode (newMode) {
		if (newMode.toLowerCase() === 'deg' || newMode.toLowerCase() === 'rad') {
			this._angleMode = newMode;
		}
	},
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
function stroke(r, g, b, a = 255) {
	if (b === undefined && g !== undefined) {
		strokeProp = {
			r, g: r, b: r, a: g, w: strokeProp.w
		};
	} else if (b === undefined && g === undefined) {
		strokeProp = {
			r, g: r, b: r, a: 255, w: strokeProp.w
		};
	} else if (r !== undefined && g !== undefined && b !== undefined) {
		strokeProp = {
			r, g, b, a, w: strokeProp.w
		};
	}
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
	bi("game").innerHTML += `<ellipse cx="${x}px" cy="${y}px" rx="${w/2}px" ry="${h/2}px" fill="rgba(${fillColor.r}, ${fillColor.g}, ${fillColor.b}, ${fillColor.a/255})" stroke="rgba(${strokeProp.r}, ${strokeProp.g}, ${strokeProp.b}, ${strokeProp.a/255})" strokeWidth="${strokeProp.w}" style="transform: translate(${__env__.matrix.x}px, ${__env__.matrix.y}px), scale(${__env__.matrix.s}), rotate(${__env__.matrix.r}${__env__._angleMode});"/>`;
}
function rect (x, y, w, h) {
	bi("game").innerHTML += `<rect x="${x}px" y="${y}px" width="${w}px" height="${h}px" fill="rgba(${fillColor.r}, ${fillColor.g}, ${fillColor.b}, ${fillColor.a/255})" stroke="rgba(${strokeProp.r}, ${strokeProp.g}, ${strokeProp.b}, ${strokeProp.a/255})" strokeWidth="${strokeProp.w}" style="transform: translate(${__env__.matrix.x}px, ${__env__.matrix.y}px), scale(${__env__.matrix.s}), rotate(${__env__.matrix.r}${__env__._angleMode});"/>`;
}
function line(x1, y1, x2, y2) {
	bi("game").innerHTML += `<line x1="${x1}px" y1="${y1}px" x2="${x2}px" y2="${y2}px" stroke="rgba(${strokeProp.r}, ${strokeProp.g}, ${strokeProp.b}, ${strokeProp.a / 255})" strokeWidth="${strokeProp.w}" style="transform: translate(${__env__.matrix.x}px, ${__env__.matrix.y}px), scale(${__env__.matrix.s}), rotate(${__env__.matrix.r}${__env__._angleMode});"/>`;
}
function circle (x, y, s) {
	ellipse(x, y, s, s);
}
function point (x, y) {
	bi("game").innerHTML += `<circle cx="${x}px" cy="${y}px" rx="${0}px" ry="${0}px" fill="rgba(${fillColor.r}, ${fillColor.g}, ${fillColor.b}, ${fillColor.a / 255})" stroke="rgba(${strokeProp.r}, ${strokeProp.g}, ${strokeProp.b}, ${strokeProp.a / 255})" strokeWidth="${strokeProp.w}" style="transform: translate(${__env__.matrix.x}px, ${__env__.matrix.y}px), scale(${__env__.matrix.s}), rotate(${__env__.matrix.r}${__env__._angleMode});"/>`;
}
function background (r, g, b, a = 255) {
	let R, G, B, A;
	let rgba = {};
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
	R, G, B, A = {rgba};
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
var draw = () => {};