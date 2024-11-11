class Graph {
    constructor() {
        this.adjacencyMap = new Map();
    }

    /**
     * Static method to create an empty graph.
     * @returns {Graph} - A new, empty Graph instance
     */
    static empty() {
        return new Graph();
    }

    /**
     * Adds a vertex to the graph if it does not already exist.
     * @param {*} vertex - The vertex to be added
     * @returns {boolean} - True if the vertex was added, false if it already existed
     */
    add(vertex) {
        if (!this.adjacencyMap.has(vertex)) {
            // Add the vertex with an empty Map to represent its edges
            this.adjacencyMap.set(vertex, new Map());
            return true;
        }
        return false; // Vertex already exists
    }

    /**
     * Sets the weight of an edge from source to target.
     * If the weight is zero, it removes the edge.
     * @param {*} source - The source vertex
     * @param {*} target - The target vertex
     * @param {number} weight - The weight of the edge
     * @returns {number} - The previous weight of the edge, or 0 if it didn't exist
     * @throws {Error} - If the weight is negative
     */
    set(source, target, weight) {
        if (weight < 0) {
            throw new Error("Edge weight must be nonnegative");
        }
        if (weight === 0) {
            // Remove the edge if weight is zero
            return this.removeEdge(source, target);
        }
        // Ensure both vertices exist in the graph
        this.add(source);
        this.add(target);

        // Get the map of edges from the source vertex
        const sourceEdges = this.adjacencyMap.get(source);
        const previousWeight = sourceEdges.has(target) ? sourceEdges.get(target) : 0;
        sourceEdges.set(target, weight); // Set the new weight for the edge
        return previousWeight; // Return the previous weight, if any
    }

    /**
     * Removes a vertex and all associated edges from the graph.
     * @param {*} vertex - The vertex to be removed
     * @returns {boolean} - True if the vertex was removed, false if it didn't exist
     */
    remove(vertex) {
        if (!this.adjacencyMap.has(vertex)) {
            return false; // Vertex doesn't exist
        }
        // Remove the vertex and all its edges
        this.adjacencyMap.delete(vertex);

        // Remove any edges pointing to this vertex from other vertices
        for (let [, edges] of this.adjacencyMap) {
            edges.delete(vertex);
        }
        return true;
    }

    /**
     * Retrieves a set of all vertices in the graph.
     * @returns {Set} - A set containing all vertices
     */
    vertices() {
        return new Set(this.adjacencyMap.keys());
    }

    /**
     * Finds all vertices that have edges leading to the specified target vertex,
     * along with the weights of those edges.
     * @param {*} target - The target vertex
     * @returns {Map} - A map with source vertices as keys and edge weights as values
     */
    sources(target) {
        const sources = new Map();
        for (let [vertex, edges] of this.adjacencyMap) {
            if (edges.has(target)) {
                // If an edge to the target exists, add it to the sources map
                sources.set(vertex, edges.get(target));
            }
        }
        return sources;
    }

    /**
     * Finds all vertices that the specified source vertex has edges leading to,
     * along with the weights of those edges.
     * @param {*} source - The source vertex
     * @returns {Map} - A map with target vertices as keys and edge weights as values
     */
    targets(source) {
        // Return a copy of the map of target vertices and weights if source exists, otherwise return an empty map
        return this.adjacencyMap.has(source) ? new Map(this.adjacencyMap.get(source)) : new Map();
    }

    /**
     * Removes an edge from source to target.
     * @param {*} source - The source vertex of the edge to remove
     * @param {*} target - The target vertex of the edge to remove
     * @returns {number} - The previous weight of the edge, or 0 if it didn't exist
     */
    removeEdge(source, target) {
        if (!this.adjacencyMap.has(source) || !this.adjacencyMap.get(source).has(target)) {
            return 0; // Edge doesn't exist
        }
        // Retrieve the previous weight, delete the edge, and return the previous weight
        const previousWeight = this.adjacencyMap.get(source).get(target);
        this.adjacencyMap.get(source).delete(target);
        return previousWeight;
    }
}

module.exports = Graph;
