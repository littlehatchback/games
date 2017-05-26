{
	class Ball {
		constructor(){
			this.alive = true
			this.position = engine.GetPosition(50,50)
			this.color = 'green'
			this.size = 25
			this.gravity = -15
			this.velocity = new Vec2(0,0)
		}	

		jump(){
			this.velocity.y += Random.Range(1, 15)
		}

	    die(){
	    	this.alive = false
	    }

	    reset(){
	    	this.position = engine.GetPosition(50,50)
	    	this.alive = true
	    	this.velocity = new Vec2(0,0)
	    }

	    update(){
	    	if (!this.alive){
				engine.DrawText(50, 50, "dead")
			}
			else{
		    	this.position.x = engine.GetPosition(50,50).x
				//this.velocity.y += (engine.dt * this.gravity)
		    	//this.position.y += (engine.dt * this.velocity)
		    	this.velocity.y += engine.dt * this.gravity
		    	this.position.y -= this.velocity.y
				
				engine.DrawCircle(this.position, this.size, this.color, 0, 'black')

				if(this.velocity.y <= -25){
		    		this.velocity.y = -25
		    	}

		    	if(this.position.y > 750 || this.position.y < 50){
		    		this.alive = false
		    	}
	    	}
	    }
	  }

	class Game {
	    constructor(ctx, canvas, dt){
	      this.ctx = ctx
	      this.canvas = canvas
	      this.dt = dt
	      this.author = 'Steve'
	      this.title = 'jump'
	      this.ball = new Ball()

	      engine.MapKey(' ', () => this.ball.jump())
	      this.canvas.addEventListener("mousedown", () => this.ball.reset(), false)
	    }

	    gameloop() {

	      this.ctx.textAlign = "center"
	      this.ctx.fontFamily = "Courier New"
	      this.ctx.backgroundColor = "white"
	      this.ctx.fillStyle = "red"
	      this.ball.update()
	    }
	  }

	classmap['game3'] = Game
}