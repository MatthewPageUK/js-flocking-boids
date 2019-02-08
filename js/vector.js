/**
 * A 2D Vector class.
 * Based on the x, y model where mag and heading are calculated
 *
 * @property {Float} x - The x value
 * @property {Float} y - The y value
 * @property {Float} mag - The magnitude of the vector (length)
 * @property {Float} magSq - The magnitude of the vector (length) squared
 * @property {Float} heading - The heading / direction in Radians
 * @property {Float} headingAngle - The heading / direction in degrees
 * @author Matthew Page <work@mjp.co>
 * @version 0.1
 */
class Vector {
	/**
	 * Make a new Vector
	 *
	 * @param {Float} x - The starting x value
	 * @param {Float} y - The starting y value
	 */
	constructor(x, y) {
		this.x = parseFloat(x);
		this.y = parseFloat(y);
	}
	/**
	 * Get - The magnitude squared of this vector
	 *
	 * @returns {Float} The magnitude of the vector squared
	 */
	get magSq() {
		return this.x * this.x + this.y * this.y;
	}	
	/**
	 * Get - The magnitude of the Vector ||v||
	 *
	 * @returns {Float} The magnitude of the vector
	 */
	get mag() {
		return Math.sqrt(this.magSq);	
	}
	/**
	 * Get - The heading of this vector in Radians
	 *
	 * return {Float} Heading in Radians
	 */
	get heading() {
		return Math.atan2(this.y, this.x);
	}
	/**
	 * Get - The heading of this vector in degress
	 *
	 * return {Float} Heading in degress
	 */
	get headingDegrees() {
		return this.toDegrees(this.heading);
	}
	/**
	 * Maths - Add another Vector or Scalar value to this vector.
	 *
	 * @param {Vector} v - The Vector or Scalar value to add.
	 */
	add(v) {
		if(v instanceof Vector) {
			this.x += v.x;
			this.y += v.y;
		} else {
			this.x += parseFloat(v);
			this.y += parseFloat(v);
		}
	}
	/**
	 * Static - Maths - Add two Vectors (or one Vector and one Scalar) and 
	 * return the resulting Vector.
	 *
	 * @example myVector = Vector.add(v1, 10);
	 * @param {Vector} v1 - The Vector to add to.
	 * @param {Vector||Number} v2 - The Vector or Scalar being added.
	 * @returns {Vector} The resulting Vector
	 */
	static add(v1, v2) {
		let result = v1.copy();
		result.add(v2);
		return result;
	}
	/**
	 * Maths - Subtract another Vector or Scalar from this Vector
	 *
	 * @param {Vector||Scalar} v - Vector or Scalar to subtract from 'this'
	 */
	sub(v) {
		if(v instanceof Vector) {
			this.x -= v.x;
			this.y -= v.y;
		} else {
			this.x -= parseFloat(v);
			this.y -= parseFloat(v);
		}
		return this;
	}
	/**
	 * Static - Maths - Subtract two Vectors (or one Vector and one Scalar)
	 * and return the resulting Vector.
	 *
	 * @example myVector = Vector.sub(v1, 10);
	 * @param {Vector} v1 - The Vector to subtract from.
	 * @param {Vector||Number} v2 - The Vector or Scalar being subtracted.
	 * @returns {Vector} The resulting Vector
	 */
	static sub(v1, v2) {
		let result = v1.copy();
		result.sub(v2);
		return result;
	}	
	/**
	 * Multiply this Vector by another Vector or Scalar
	 *
	 * @param {Vector||Number} v - The Vector or Scalar to multiply with 'this'
	 */
	mul(v) {
		if(v instanceof Vector) {
			this.x *= v.x;
			this.y *= v.y;
		} else {
			this.x *= v;
			this.y *= v;	
		}
		return this;
	}
	/**
	 * Static - Maths - Multiply two Vectors (or one Vector and one Scalar) and 
	 * return the resulting Vector.
	 *
	 * @example myVector = Vector.mul(v1, 10);
	 * @param {Vector} v1 - The Vector to multiply with.
	 * @param {Vector||Number} v2 - The Vector or Scalar multiplied by.
	 * @returns {Vector} The resulting Vector
	 */
	static mul(v1, v2) {
		let result = v1.copy();
		result.mul(v2);
		return result;
	}	
	/**
	 * Maths - Divide this Vector by another Vector or Scalar
	 *
	 * @param {Vector||Number} v - The Vector or Scalar to divide this one by
	 */
	div(v) {
		if(v instanceof Vector) {
			this.x /= v.x;
			this.y /= v.y;
		} else {
			this.x /= v;
			this.y /= v;
		}
		return this;
	}		
	/**
	 * Static - Maths - Divide two Vectors (or one Vector and one Scalar) and 
	 * return the resulting Vector.
	 *
	 * @example myVector = Vector.div(v1, 10);
	 * @param {Vector} v1 - The Vector to be divided.
	 * @param {Vector||Number} v2 - The Vector or Scalar to divide by.
	 * @returns {Vector} The resulting Vector
	 */
	static div(v1, v2) {
		let result = v1.copy();
		result.div(v2);
		return result;
	}	
	/**
	 * Maths - Distance to another position vector. Is calculated
	 * by subtracting this Vector from new Vector, the Magnitude of this
	 * Vector is returned as the distance.
	 *
	 * @param {Vector} v - The second vector
	 * @returns {Float} The distance to the second vector
	 */
	dist(v) {		
		let d = new Vector(v.x, v.y);
		d.sub(this);
		return d.mag;
	}	
	/**
	 * Static - Maths - Distance between two Vectors.
	 *
	 * @example let distance = Vector.dist(vec1, vec2);
	 * @param {Vector} v1 - The first vector
	 * @param {Vector} v2 - The second vector
	 * @returns {Float} The distance to the second vector
	 */
	static dist(v1, v2) {	
		let from = new Vector(v1.x, v1.y);
		let to = new Vector(v2.x, v2.y);
		to.sub(from);
		return to.mag;
	}	
		
	
	/**
	 * Maths - Dot
	
p5.Vector.prototype.dot = function dot(x, y, z) {
  if (x instanceof p5.Vector) {
    return this.dot(x.x, x.y, x.z);
  }
  return this.x * (x || 0) + this.y * (y || 0) + this.z * (z || 0);
};
	
	*/
	
	/**
	 * Tools - convert radians to degress
	 *
	 * @param {Float} Angle in radians
	 * @returns {Float} Angle in degrees
	 */
	toDegrees(r) {
		return r * (180 / Math.PI);
	}
	/**
	 * Tools - Make a copy of this vector and return it
	 *
	 * @returns {Vector} The new copy of this Vector
	 */
	copy() {
		return new Vector(this.x, this.y);	
	}
	/**
	 * Tools - Limit - limit the magnitude of this Vector to n
	 *
	 * @param {Number} max - The maximum value the Magnitude can be
	 */
	limit(max) {
		if(this.mag > max) {
			this.setMag(max);
		}
	}
	/**
	 * Tools - Normalise this vector - mag = 1
	 * Divide by its own Magnitude ( 3/3 = 1 )
	 */
	normalise() {
		this.div(this.mag);	
		return this;
	}	
	/**
	 * Tools - Set the magnitude of this Vector without changing the direction
	 * value.
	 *
	 * @param {Float} m - The new magnitude
	 */
	setMag(m) {
		this.normalise();
		this.mul(m);
	}	

}