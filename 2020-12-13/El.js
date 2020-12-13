function El ({velocityLimit = 5, accelerationLimit = 0.1, size = 8} = {}) {
    this.location = new p5.Vector(canvasWidth/16, canvasHeight/4);
    this.velocity = new p5.Vector(-1, 1);
    this.acceleration = new p5.Vector(0, 0);
    this.variance = 0.15;
    //this.color = color(random(255),random(255),random(255))
    this.color = color(0,random(255),random(255))
    this.tick = () => {
      this.velocity.add(this.acceleration);
      this.velocity.limit(velocityLimit);
      this.location.add(this.velocity);
  
      // check bounce
      if (this.location.x < 0  || this.location.x > canvasWidth) {
        this.location.x = Math.min(canvasWidth, this.location.x);
        this.location.x = Math.max(0, this.location.x);
        this.velocity.x *= -1 * random(1-this.variance, 1/(1-this.variance));
      }
      if (this.location.y < 0  || this.location.y > canvasHeight) {
        this.location.y = Math.min(canvasHeight, this.location.y);
        this.location.y = Math.max(0, this.location.y);
        this.velocity.y *= -1 * random(1-this.variance, 1/(1-this.variance));
      }
    }
    this.render = () => {
      fill(this.color);
      //pg.noStroke();
      ellipse(this.location.x, this.location.y, size, size);
    }
    this.chase = (el) => {
      let diff = p5.Vector.sub(el.location, this.location);
      //this.velocity.rotate((diff.heading()- this.velocity.heading()) *0.1);
      diff.mult(0.001);
      
      this.acceleration.add(diff);
      this.acceleration.limit(accelerationLimit);
    }
  }