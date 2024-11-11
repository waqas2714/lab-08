const Vertex = require('./Vertex');

class ConcreteVerticesGraph {
  constructor() {
    this.verticesList = []; // Using a list to store Vertex objects; renamed to avoid confusion with method 'vertices'
  }

  /**
   * Adds a new vertex with the specified label to the graph if it doesn't already exist.
   * @param {*} vertexLabel - The label of the vertex to be added
   * @returns {boolean} - True if the vertex was added, false if it already existed
   */
  add(vertexLabel) {
    // Create a new Vertex object with the given label
    const vertex = new Vertex(vertexLabel);

    // Check if a vertex with this label already exists in verticesList
    if (!this.verticesList.some(v => v.label === vertexLabel)) {
      // If it doesn't exist, add the vertex to verticesList
      this.verticesList.push(vertex);
      return true;
    }
    return false; // Vertex with this label already exists
  }

  /**
   * Removes a vertex with the specified label from the graph.
   * @param {*} vertexLabel - The label of the vertex to be removed
   * @returns {boolean} - True if the vertex was removed, false if it didn't exist
   */
  remove(vertexLabel) {
    // Find the index of the vertex with the given label
    const index = this.verticesList.findIndex(v => v.label === vertexLabel);

    if (index !== -1) {
      // If found, remove the vertex from verticesList
      this.verticesList.splice(index, 1);
      return true;
    }
    return false; // Vertex didn't exist
  }

  /**
   * Retrieves a list of labels of all vertices in the graph.
   * @returns {Array} - An array of vertex labels
   */
  vertices() {
    // Return an array containing the labels of all vertices in the graph
    return this.verticesList.map(v => v.label);
  }

  /**
   * Returns a string representation of the graph, showing all vertex labels.
   * @returns {string} - A string describing the vertices in the graph
   */
  toString() {
    return `Vertices: ${this.verticesList.map(v => v.toString()).join(', ')}`;
  }
}

// Export the ConcreteVerticesGraph class for use in other modules
module.exports = ConcreteVerticesGraph;
