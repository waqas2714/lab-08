const Edge = require('../../src/graph/Edge.js');

test('creates an Edge and validates immutability', () => {
  // Create an edge from 'A' to 'B' with weight 10
  const edge = new Edge('A', 'B', 10);

  // Check that the edge's source, target, and weight are correctly assigned
  expect(edge.source).toBe('A');
  expect(edge.target).toBe('B');
  expect(edge.weight).toBe(10);
});

test('throws an error for non-positive weight', () => {
  // Attempt to create an edge with weight 0, expecting an error to be thrown
  expect(() => new Edge('A', 'B', 0)).toThrow("Edge weight must be positive");
});

test('Edge toString() provides readable output', () => {
  // Create an edge from 'A' to 'B' with weight 10
  const edge = new Edge('A', 'B', 10);

  // Check that toString() returns the expected string representation
  expect(edge.toString()).toBe('A -> B [weight=10]');
});
