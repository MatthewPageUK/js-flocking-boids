/**
 * A 2D Boid Class for Flocking Boids.
 * Craig Reynolds Algorithm - Alignment, Separation and Choesion
 *
 * @property {Float} index - Index number in the flock
 * @property {Vector} position - The position vector
 * @property {Vector} velocity - The velocity vector
 * @property {Vector} acceleration - The acceleration vector
 * @property {BoidFlock} flock - The flock
 * @property {BoidWorld} world - The boid world
 * @author Matthew Page <work@mjp.co>
 * @version 0.1
 */
class Boid {

	/**
	 * Make a new Boid 
	 *
	 * @param {BoidFlock} flock - xxx
	 * @param {BoidWorld} world - xxx
	 * @param {Number} x - X Position
	 * @param {Number} y - Y Position
	 * @param {Number} vx - Velocity X
	 * @param {Number} vy - Veloctiy Y
	 * @param {Number} i - index number in the flock
	 */
	constructor(flock, world, x, y, vx, vy, i) {
		this.index = i;
		this.position = new Vector(x, y);
		this.velocity = new Vector(vx, vy);
		this.acceleration = new Vector(0, 0);
		this.flock = flock;
		this.world = world;
	}
	/**
	 * Move the boid one step in time. Calculate the steering values for alignment, 
	 * cohesion and separation, add normalised and weighted values to the boids
	 * acceleration and then perform the standard p += v += a
	 */
	move() {
		
		let total = 0;
		let steering = { align: new Vector(0, 0), separation: new Vector(0, 0), cohesion: new Vector(0, 0) };		
		this.acceleration = new Vector(0,0);
		
		/**
		 * Get the boids within the perception range of this boid 
		 * @todo Optimise this 
		 * @todo Include the Angle calculation
		 */
		for ( let b of this.flock.boids ) {
			let dist = this.position.dist(b.position);
			if(dist > 0 && dist < this.flock.pRadius) {
	
				/* Align with this boid - based on its velocity, match it */
				steering.align.add(b.velocity);
				
				/* Cohesion with this boid - based on its position, move towards it */
				steering.cohesion.add(b.position);
				
				/* Separation with this boid - based on position, move away */
				let diff = this.position.copy().sub(b.position).div(dist);
				steering.separation.add(diff);
				
				total += 1;
			}
		}
		
		/**
		 * Got the boids, do the steering calculations 
		 */
		if(total > 0) {
			
			/* Align - average of boid velocities, normalise and multiply by weight */
			steering.align.div(total).normalise().mul(this.flock.alignment);
			this.acceleration.add(steering.align);
			
			/* Cohesion - average of boid poistions, normalise and multiply by weight */
			steering.cohesion.div(total).sub(this.position).normalise().mul(this.flock.cohesion);	
			this.acceleration.add(steering.cohesion);
			
			/* Separation - average of boid poistions, normalise and multiply by weight */
			steering.separation.div(total).normalise().mul(this.flock.separation);
			this.acceleration.add(steering.separation);
			
			this.velocity.limit(4);
			if(this.velocity.mag < 1) this.velocity.normalise();
		}
				
		this.velocity.add(this.acceleration);
		this.position.add(this.velocity);
		this.wrap();
		//this.bounce();
	}
	/**
	 * Wrap around the world if out of bounds 
	 */
	wrap() {
		if(this.position.x <= 0) this.position.x = this.world.width;
		if(this.position.x > this.world.width) this.position.x = 0;
		if(this.position.y <= 0) this.position.y = this.world.height;
		if(this.position.y > this.world.height) this.position.y = 0;		
	}
	/**
	 * Bounce off the edges if out of bounds
	 */
	bounce() {
		if(this.position.x < 0) this.velocity.x *= -1;
		if(this.position.x > this.world.width) this.velocity.x *= -1;
		if(this.position.y < 0) this.velocity.y *= -1;
		if(this.position.y > this.world.height) this.velocity.y *= -1;			
	}
	/**
	 * @todo Avoid the edges, steer away from them, avoid things, override the flocking behaviour.
	 */
}