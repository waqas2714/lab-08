// Graph.test.js
const Graph = require('../../src/graph/Graph');

describe('Graph', () => {
    let graph;

    // Before each test, create a new empty Graph instance to ensure isolated test cases
    beforeEach(() => {
        graph = Graph.empty();
    });

    // Test for the initial state of the vertices set being empty
    test('initial vertices set is empty', () => {
        // Verify that the graph starts with an empty set of vertices
        expect(graph.vertices().size).toBe(0);
    });

    // Test for adding a vertex
    test('adding a vertex', () => {
        // Adding a new vertex 'A' should return true
        expect(graph.add('A')).toBe(true);
        
        // Verify that the graph now contains vertex 'A'
        expect(graph.vertices()).toEqual(new Set(['A']));
        
        // Attempting to add the same vertex 'A' again should return false
        expect(graph.add('A')).toBe(false); // Adding same vertex should return false
    });

    // Test for setting an edge between two vertices
    test('setting an edge between vertices', () => {
        // Adding vertices 'A' and 'B'
        graph.add('A');
        graph.add('B');
        
        // Set an edge from 'A' to 'B' with a weight of 5, should return 0 (no previous weight)
        expect(graph.set('A', 'B', 5)).toBe(0);
        
        // Verify that the edge from 'A' to 'B' is now in the targets of 'A' with weight 5
        expect(graph.targets('A')).toEqual(new Map([['B', 5]]));
        
        // Update the edge weight from 'A' to 'B' to 3, should return 5 (old weight)
        expect(graph.set('A', 'B', 3)).toBe(5);
        
        // Verify that the edge from 'A' to 'B' is updated to weight 3
        expect(graph.targets('A')).toEqual(new Map([['B', 3]]));
    });

    // Test for removing an edge by setting its weight to zero
    test('removing an edge by setting weight to zero', () => {
        // Set an edge from 'A' to 'B' with a weight of 5
        graph.set('A', 'B', 5);
        
        // Set the weight to 0 to remove the edge, should return 5 (previous weight)
        expect(graph.set('A', 'B', 0)).toBe(5);
        
        // Verify that 'A' has no targets (edges) after removal
        expect(graph.targets('A').size).toBe(0);
    });

    // Test for removing a vertex and its associated edges
    test('removing a vertex and its edges', () => {
        // Set edges from 'A' to 'B' and from 'B' to 'C'
        graph.set('A', 'B', 3);
        graph.set('B', 'C', 4);
        
        // Remove vertex 'B', should return true indicating successful removal
        expect(graph.remove('B')).toBe(true);
        
        // Verify that the vertices now are 'A' and 'C'
        expect(graph.vertices()).toEqual(new Set(['A', 'C']));
        
        // Verify that there are no edges from 'A' to 'B' after removing 'B'
        expect(graph.targets('A').size).toBe(0);
        
        // Verify that there are no edges from 'B' to 'C' after removing 'B'
        expect(graph.sources('C').size).toBe(0);
    });

    // Test for fetching sources and targets
    test('fetching sources and targets', () => {
        // Set edges from 'A' to 'B' and from 'C' to 'B'
        graph.set('A', 'B', 3);
        graph.set('C', 'B', 4);
        
        // Verify that sources of 'B' include 'A' with weight 3 and 'C' with weight 4
        expect(graph.sources('B')).toEqual(new Map([['A', 3], ['C', 4]]));
        
        // Verify that targets of 'A' include 'B' with weight 3
        expect(graph.targets('A')).toEqual(new Map([['B', 3]]));
    });

    // Test for empty maps when no edges exist
    test('sources and targets return empty maps if no edges exist', () => {
        // Add vertices 'A' and 'B' without setting any edges
        graph.add('A');
        graph.add('B');
        
        // Verify that there are no sources for 'A' since no edges exist
        expect(graph.sources('A').size).toBe(0);
        
        // Verify that there are no targets for 'B' since no edges exist
        expect(graph.targets('B').size).toBe(0);
    });
});
