// Edge.js
class Edge {
    /**
     * Creates an Edge with source, target, and weight.
     * @param {string} source - The starting vertex
     * @param {string} target - The ending vertex
     * @param {number} weight - Weight of the edge, must be positive
     */
    constructor(source, target, weight) {
      if (weight <= 0) throw new Error("Edge weight must be positive");
      this.source = source;
      this.target = target;
      this.weight = weight;
    }
  
    /**
     * Checks if this edge is equal to another edge.
     * @param {Edge} edge - Another edge to compare with
     * @return {boolean} - True if edges are equal
     */
    isEqualTo(edge) {
      return this.source === edge.source &&
             this.target === edge.target &&
             this.weight === edge.weight;
    }
  
    /**
     * @return {string} - String representation of the edge.
     */
    toString() {
      return `${this.source} -> ${this.target} [weight=${this.weight}]`;
    }
  }
  
  module.exports = Edge;
  