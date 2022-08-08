bi("canvas").addEventListener("click", mouseClicked);
bi("canvas").addEventListener("keypress", keyTyped);
bi("canvas").addEventListener("mousedown", e => {
	mousePressed(e);
	mouseIsPressed = true;
});
bi("canvas").addEventListener("mousemove", e => {
	mouseMoved(e);
	__env__.mouseX = e.clientX - bi("canvas").getBoundingClientRect().x;
	__env__.mouseY = e.clientY - bi("canvas").getBoundingClientRect().y;
	if (mouseIsPressed) {
		mouseDragged(e);
	}
});
bi("canvas").addEventListener("mouseup", e => {
	mouseReleased(e);
	mouseIsPressed = false;
});
bi("canvas").addEventListener("keydown", e => {
	keyPressed(e);
	keyIsPressed = true;
});
bi("canvas").addEventListener("keyup", e => {
	keyReleased(e);
	keyIsPressed = false;
});
function loop () {
	draw();
	pmouseX = mouseX;
	pmouseY = mouseY;
	mouseX = __env__.mouseX;
	mouseY = __env__.mouseY;
	window.setTimeout(loop, 1000/__env__.fps);
}

loop();