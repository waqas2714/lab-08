// Vertex.js
class Vertex {
    /**
     * Creates a vertex with the specified label.
     * @param {string} label - The label for the vertex
     */
    constructor(label) {
      this.label = label;
    }
  
    /**
     * Updates the label of the vertex.
     * @param {string} newLabel - The new label for the vertex
     */
    updateLabel(newLabel) {
      this.label = newLabel;
    }
  
    /**
     * @return {string} - String representation of the vertex.
     */
    toString() {
      return `Vertex(${this.label})`;
    }
  }
  
  module.exports = Vertex;
  