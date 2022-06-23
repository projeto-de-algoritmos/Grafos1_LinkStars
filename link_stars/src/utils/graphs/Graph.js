export default class Graph {
    // defining vertex array and
    // adjacent list
    constructor(noOfVertices)
    {
        this.noOfVertices = noOfVertices;
        this.AdjList = new Map();
    }
 
    // functions to be implemented
 
    // addVertex(v)
    // addEdge(v, w)
    // printGraph()
 
    // bfs(v)
    // dfs(v)

    //-----------------------------
    // add vertex to the graph
    addVertex(node)
    {
        // initialize the adjacent list with a
        // null array
        this.AdjList.set(node, []);
        this.noOfVertices = this.noOfVertices+1;
    }

    //------------------------

    addEdge(node1, node2){
        // get the list for vertex node1 and put the
        // vertex node2 denoting edge between node1 and node2
        this.AdjList.get(node1).push(node2);
 
        // Since graph is undirected,
        // add an edge from node2 to node1 also
        this.AdjList.get(node2).push(node1);
    }

}

