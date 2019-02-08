/**
 * A flock of boids
 *
 * @property {BoidWorld} world - The world this flock exists in
 * @property {Number} max - The maximum number of boids in this flock
 * @property {Boid[]} boids - Array of boids in this flock
 * @property {Number} pRadius - The perception radius of the boids
 * @property {Number} pAngle - The perception angle of the boids
 * @property {Number} cohesion - The cohesion weight of the boids
 * @property {Number} alignment - The alignment weight of the boids
 * @property {Number} separation - The separation weight of the boids
 * @author Matthew Page <work@mjp.co>
 * @version 0.1
 */
class BoidFlock {
	/**
	 * Make a new flock 
	 * @param {Number} n - Number of boids
	 * @param {BoidWorld} world - The boid world
	 */
	constructor(n, world) {
		this.world = world;
		this.max = n;
		this.boids = [];
		this.pRadius = 465;
		this.pAngle = 2.8;
		this.cohesion = 0.18;
		this.alignment = 0.01;
		this.separation = 0.13;
	}
	/**
	 * Populate the flock with random boids 
	 * new Boid(flock, world, x, y, vx, vy, index)
	 */
	populate() {
		for(let b=0; b<this.max; b+=1) {
			this.boids.push(
				new Boid(this, this.world, 
						Math.random()*this.world.width, 
						Math.random()*this.world.height, 
						(Math.random()*3)-1, 
						(Math.random()*3)-1,
						this.boids.length)
			);	
		}
	}
	/**
	 * Update the flock by updating each boid
	 */
	update() {
		this.boids.forEach((boid)=>{
			boid.move();
		});
	}
}