count = 0
shouldFire = false
ctx.font = "30px Arial";
ctx.fillStyle = "red"
ctx.textAlign = "center"

function gameloop()
{
	count++
	ctx.fillText(shouldFire,100,50);
	countToFireOn = 500
	if(count >= countToFireOn)
	{
		ctx.fillText("FIRE!!!!", canvas.width/2, canvas.height/2);
	}
}