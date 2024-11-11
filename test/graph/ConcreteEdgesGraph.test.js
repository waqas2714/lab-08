// ConcreteEdgesGraph.test.js
const ConcreteEdgesGraph = require('../../src/graph/ConcreteEdgesGraph.js');

let graph;

// Before each test, a new instance of ConcreteEdgesGraph is created to ensure isolated test cases
beforeEach(() => {
  graph = new ConcreteEdgesGraph();
});

// Test for adding vertices to the graph
test('adds vertices to the graph', () => {
  // Adding a new vertex 'A', should return true
  expect(graph.add('A')).toBe(true);
  
  // Attempting to add the same vertex 'A' again, should return false (vertex already exists)
  expect(graph.add('A')).toBe(false);
  
  // Ensure vertex 'A' is present in the graph's vertices collection
  expect(graph.vertices.has('A')).toBe(true);
});

// Test for setting edges and updating their weights
test('sets edges and updates weight', () => {
  // Setting an edge from 'A' to 'B' with a weight of 5
  graph.set('A', 'B', 5);
  
  // Verify that 'A' -> 'B' has weight 5 in the sources collection of 'B'
  expect(graph.sources('B')['A']).toBe(5);
  
  // Verify that 'A' -> 'B' has weight 5 in the targets collection of 'A'
  expect(graph.targets('A')['B']).toBe(5);
  
  // Updating the edge weight from 'A' to 'B' to 10
  graph.set('A', 'B', 10);
  
  // Verify that the edge weight from 'A' to 'B' is now updated to 10
  expect(graph.targets('A')['B']).toBe(10);
});

// Test for removing a vertex and its associated edges
test('removes a vertex and its edges', () => {
  // Setting an edge from 'A' to 'B' with a weight of 5
  graph.set('A', 'B', 5);
  
  // Removing vertex 'A', which should also remove associated edges
  graph.remove('A');
  
  // Ensure that vertex 'A' is no longer in the graph's vertices collection
  expect(graph.vertices.has('A')).toBe(false);
  
  // Verify that the edge from 'A' to 'B' has been removed from 'B's sources
  expect(graph.sources('B')['A']).toBeUndefined();
});

// Test for toString() method, which provides a readable output of the graph
test('toString() returns readable output', () => {
  // Setting an edge from 'A' to 'B' with a weight of 5
  graph.set('A', 'B', 5);
  
  // Verify that the string representation of the graph contains the vertices
  expect(graph.toString()).toContain('Vertices: A, B');
  
  // Verify that the string representation of the graph contains the edge and its weight
  expect(graph.toString()).toContain('A -> B [weight=5]');
});
