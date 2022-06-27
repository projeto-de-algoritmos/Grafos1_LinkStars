import "./App.css";
import { useState } from "react";
import Band from "./utils/graphs/Band";
import Graph from "./utils/graphs/Graph";
import Node from "./utils/graphs/Node";
import Artist from "./utils/graphs/Artist";
import GraphRender from "./components/renderGraph";
import artistsData from "./data/artistData";
import bandsData from "./data/bandsData";

const mapOfArtists = new Map();
const mapOfBands = new Map();
const hashTable = new Map();

function buildGraph() {
  let graph = new Graph();
  for (let artist of artistsData) {
    const artistClass = new Artist(
      artist.id,
      artist.name,
      artist.bands,
      artist.musical_class,
      artist.picture
    );
    const node = new Node(artistClass, null);
    mapOfArtists.set(node.artist.name, node);
    graph.addVertex(node);
  }

  for (let band of bandsData) {
    const bandClass = new Band(
      band.id,
      band.name,
      band.members,
      band.genre,
      band.picture
    );
    const node = new Node(null, bandClass);
    mapOfBands.set(node.band.name, node);
    graph.addVertex(node);
    for (let member of band.members) {
      graph.addEdge(node, mapOfArtists.get(member));
    }
  }
  graph.noOfVertices = graph.AdjList.size;
  return graph;
}

function bfs(graph, artist1, artist2) {
  let ArrayOfEdge = [];
  let indice = -1;
  mapOfArtists.get(artist1.name).setVisited(true);
  ArrayOfEdge.push([null, mapOfArtists.get(artist1.name)]);
  while (indice < ArrayOfEdge.length) {
    indice++;
    if (indice === ArrayOfEdge.length) {
      break;
    }
    for (let node1 of graph.AdjList.get(ArrayOfEdge[indice][1])) {
      if (node1.type === "artist") {
        if (!mapOfArtists.get(node1.getArtist().getName()).getVisited()) {
          ArrayOfEdge.push([ArrayOfEdge[indice][1], node1]);
          hashTable.set(node1, ArrayOfEdge.length - 1);
          mapOfArtists.get(node1.getArtist().getName()).setVisited(true);
          if (node1.getArtist() === artist2) {
            return ArrayOfEdge;
          }
        }
      } else if (node1.type === "band") {
        if (!mapOfBands.get(node1.getBand().getName()).getVisited()) {
          ArrayOfEdge.push([ArrayOfEdge[indice][1], node1]);
          hashTable.set(node1, ArrayOfEdge.length - 1);
          mapOfBands.get(node1.getBand().getName()).setVisited(true);
        }
      }
    }
  }
  return false;
}

function chooseBranch(ArrayOfEdge) {
  let finalList = [];
  finalList.push(ArrayOfEdge[ArrayOfEdge.length - 1][1]);
  let element = ArrayOfEdge[ArrayOfEdge.length - 1][0];
  while (hashTable.get(element)) {
    finalList.push(element);
    if (hashTable.get(element)) {
      element = ArrayOfEdge[hashTable.get(element)][0];
    }
  }
  finalList.push(element);
  return finalList.reverse();
}

function formatGraph(nodeList) {
  const yPos = 300;
  let xPos = 0;
  let finalGraph = [];
  nodeList.forEach((node) => {
    xPos += 200;
    let data1;
    data1 = {
      data: {
        id: node.getId(),
        label: node.getName(),
      },
      position: {
        x: xPos,
        y: yPos,
      },
      style: {
        width: "40px",
        height: "40px",
        fontSize: "20px",
        "background-color": node.getType() === "artist" ? "crimson" : "#00008b",
      },
    };

    finalGraph.push(data1);
  });
  for (let i = 0; i < nodeList.length - 1; i++) {
    const data = {
      source: nodeList[i].getId(),
      target: nodeList[i + 1].getId(),
    };
    finalGraph.push({ data });
  }

  return finalGraph;
}

function App() {
  const [art1, setArt1] = useState("James Hetfield");
  const [art2, setArt2] = useState("Kirk Hemmett");
  const [finalGraph, setFinalGraph] = useState([]);
  let graph;
  let bfsTree;
  let branch;
  function handler(e) {
    e.preventDefault();
    graph = buildGraph();
    bfsTree = bfs(
      graph,
      mapOfArtists.get(art1).getArtist(),
      mapOfArtists.get(art2).getArtist()
    );
    if (bfsTree) {
      branch = chooseBranch(bfsTree);
      setFinalGraph(formatGraph(branch));
    } else {
      alert("Não há ligação entre esses artistas!");
    }
  }
  return (
    <>
      <div className="title div" align="center">
        <h1>Link Stars</h1>
      </div>
      <div className="select-container" align="center">
        <form>
          <label for="Artista 1">Artista 1</label>
          <select value={art1} onChange={(e) => setArt1(e.target.value)}>
            {artistsData.map((artist) => (
              <option value={artist.name}>{artist.name}</option>
            ))}
          </select>
        </form>
        <form>
          <label for="Artista 2">Artista 2</label>
          <select value={art2} onChange={(e) => setArt2(e.target.value)}>
            {artistsData.map((artist) => (
              <option value={artist.name}>{artist.name}</option>
            ))}
          </select>
        </form>
        <input
          disabled={art1 === art2}
          type="submit"
          value="Gerar conexão!"
          onClick={handler}
        />
      </div>
      <GraphRender elements={finalGraph} />
    </>
  );
}

export default App;
