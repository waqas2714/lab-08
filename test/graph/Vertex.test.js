// Vertex.test.js
const Vertex = require('../../src/graph/Vertex.js');

// Test for creating a Vertex and updating its label
test('creates a Vertex and updates label', () => {
  // Create a new vertex 'A'
  const vertex = new Vertex('A');
  
  // Verify that the label of the vertex is initially set to 'A'
  expect(vertex.label).toBe('A');
  
  // Update the label of the vertex to 'B'
  vertex.updateLabel('B');
  
  // Verify that the label is successfully updated to 'B'
  expect(vertex.label).toBe('B');
});

// Test for Vertex toString() method providing readable output
test('Vertex toString() provides readable output', () => {
  // Create a new vertex 'A'
  const vertex = new Vertex('A');
  
  // Verify that the string representation of the vertex is 'Vertex(A)'
  expect(vertex.toString()).toBe('Vertex(A)');
});
