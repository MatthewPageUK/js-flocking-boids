/**
 * The Boid world where they live. Can have one or more flocks
 *
 * @property {Number} width - The width of the world
 * @property {Number} height - The height of the world
 * @property {BoidFlock[]} flocks - All the flocks in this world
 * @author Matthew Page <work@mjp.co>
 * @version 0.1
 */
class BoidWorld {
	/**
	 * Make a new world
	 *
	 * @param {Number} w - The width of the world
	 * @param {Number} h - The height of the world
	 */
	constructor(w, h) {
		this.width = w;
		this.height = h;
		this.flocks = [];
	}
	/**
	 * Add a flock to the world
	 *
	 * @param {BoidFlock} flock - The flock to add
	 */
	addFlock(flock) {
		this.flocks.push(flock);	
	}
	/**
	 * Remove a flock from the world
	 *
	 * @param {Number} index - The flock index to remove
	 */
	removeFlock(index) {
		this.flocks.splice(index, 1);	
	}
	/**
	 * Update the entire world
	 */
	update() {
		this.flocks.forEach((flock)=>{
			flock.update();
		});
	}
}