document.addEventListener("click", mouseClicked);
document.addEventListener("mousedown", mousePressed);
document.addEventListener("mouseup", mouseReleased);
document.addEventListener("keypress", keyTyped);
document.addEventListener("keydown", keyPressed);
document.addEventListener("keyup", keyReleased);
function loop () {
	draw();
	window.setTimeout(loop, 1000/__env__.fps);
}
loop();