// ConcreteVerticesGraph.test.js
const ConcreteVerticesGraph = require('../../src/graph/ConcreteVerticesGraph.js');

let graph;

// Before each test, a new instance of ConcreteVerticesGraph is created to ensure isolated test cases
beforeEach(() => {
  graph = new ConcreteVerticesGraph();
});

// Test for removing a vertex
test('removes a vertex', () => {
  // Adding vertex 'A' to the graph
  graph.add('A');
  
  // Removing vertex 'A', should return true as it was added
  expect(graph.remove('A')).toBe(true);
  
  // Attempting to remove vertex 'A' again, should return false as it no longer exists
  expect(graph.remove('A')).toBe(false);
  
  // Ensure that no vertices remain in the graph after removing 'A'
  expect(graph.vertices()).toEqual([]); // No vertices left
});

// Test for toString() method, which provides a readable output of the vertices
test('toString() returns readable output', () => {
  // Adding two vertices 'A' and 'B'
  graph.add('A');
  graph.add('B');
  
  // Verify that the string representation of the graph lists the added vertices
  expect(graph.toString()).toBe('Vertices: Vertex(A), Vertex(B)');
});
