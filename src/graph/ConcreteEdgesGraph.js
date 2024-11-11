const Edge = require('./Edge');

class ConcreteEdgesGraph {
  constructor() {
    // Initialize the set of vertices and the list of edges
    this.vertices = new Set();
    this.edges = [];
  }

  /**
   * Adds a new vertex to the graph if it doesn't already exist.
   * @param {*} vertex - The vertex to be added
   * @returns {boolean} - True if the vertex was added, false if it already existed
   */
  add(vertex) {
    if (!this.vertices.has(vertex)) {
      this.vertices.add(vertex);
      return true;
    }
    return false; // Vertex already exists
  }

  /**
   * Sets the weight of an edge from source to target.
   * If the weight is zero, it removes the edge if it exists.
   * Otherwise, it adds or updates the edge with the given weight.
   * @param {*} source - The source vertex of the edge
   * @param {*} target - The target vertex of the edge
   * @param {number} weight - The weight of the edge
   * @returns {number} - The previous weight of the edge, or 0 if it didn't exist
   */
  set(source, target, weight) {
    if (weight === 0) {
      // Remove the edge if weight is zero
      const index = this.edges.findIndex(e => e.source === source && e.target === target);
      if (index !== -1) {
        const removedWeight = this.edges[index].weight;
        this.edges.splice(index, 1); // Remove the edge from edges array
        return removedWeight;
      }
      return 0; // Edge didn't exist
    } else {
      // Ensure both source and target vertices are in the graph
      this.add(source);
      this.add(target);

      // Check if the edge already exists
      const edge = this.edges.find(e => e.source === source && e.target === target);
      if (edge) {
        // Update existing edge's weight
        const previousWeight = edge.weight;
        edge.weight = weight;
        return previousWeight;
      } else {
        // Create a new edge and add it to the edges list
        const newEdge = new Edge(source, target, weight);
        this.edges.push(newEdge);
        return 0; // No previous weight, as this is a new edge
      }
    }
  }

  /**
   * Removes a vertex and all associated edges from the graph.
   * @param {*} vertex - The vertex to be removed
   * @returns {boolean} - True if the vertex was removed, false if it didn't exist
   */
  remove(vertex) {
    if (this.vertices.has(vertex)) {
      this.vertices.delete(vertex); // Remove vertex from vertices set
      // Remove all edges that are connected to this vertex
      this.edges = this.edges.filter(e => e.source !== vertex && e.target !== vertex);
      return true;
    }
    return false; // Vertex didn't exist
  }

  /**
   * Retrieves a copy of the set of vertices in the graph.
   * @returns {Set} - A new set containing all vertices
   */
  vertices() {
    return new Set(this.vertices);
  }

  /**
   * Finds all vertices that have edges leading to the specified target vertex,
   * along with the weights of those edges.
   * @param {*} target - The target vertex to find sources for
   * @returns {Object} - An object with sources as keys and weights as values
   */
  sources(target) {
    const sources = {};
    // Filter edges by those that end at the target vertex and add to sources
    this.edges
      .filter(e => e.target === target)
      .forEach(e => {
        sources[e.source] = e.weight;
      });
    return sources;
  }

  /**
   * Finds all vertices that the specified source vertex has edges leading to,
   * along with the weights of those edges.
   * @param {*} source - The source vertex to find targets for
   * @returns {Object} - An object with targets as keys and weights as values
   */
  targets(source) {
    const targets = {};
    // Filter edges by those that start at the source vertex and add to targets
    this.edges
      .filter(e => e.source === source)
      .forEach(e => {
        targets[e.target] = e.weight;
      });
    return targets;
  }

  /**
   * Returns a string representation of the graph, showing all vertices and edges.
   * @returns {string} - A string describing the vertices and edges in the graph
   */
  toString() {
    return `Vertices: ${Array.from(this.vertices).join(', ')}\nEdges:\n` +
           this.edges.map(edge => edge.toString()).join('\n');
  }
}

// Export the ConcreteEdgesGraph class for use in other modules
module.exports = ConcreteEdgesGraph;
