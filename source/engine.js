var canvas = document.getElementById("gameCanvas")
var ctx = canvas.getContext("2d")
window.setInterval(update, 1/60)

function update()
{
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	gameloop(ctx)
}