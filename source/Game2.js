

class Game2 {
  constructor(ctx){
    this.ctx = ctx
    this.author = 'Drew'
    this.title = 'Whatever'
    this.count = 0
    this.shouldFire = false
    this.ctx.font = "30px Arial";
    this.ctx.fillStyle = "red"
    this.ctx.textAlign = "center"
  }
  gameloop()
  {
    this.count++
    this.ctx.fillText(this.shouldFire,100,50);
    this.countToFireOn = 500
    if(this.count >= this.countToFireOn)
    {
      this.ctx.fillText("Two!!!!", canvas.width/2, canvas.height/2);
    }
  }
}

classmap['Game2'] = Game2