import "./App.css";
import { useState } from "react";
import Band from "./utils/graphs/Band";
import Graph from "./utils/graphs/Graph";
import Node from "./utils/graphs/Node";
import Artist from "./utils/graphs/Artist";
import dave_picture from "./assets/dave-mustaine.jpeg";
import james_picture from "./assets/james-hetfield.jpeg";
import kirk_picture from "./assets/kirk-hemmet.jpeg";
import robert_picture from "./assets/robert-trujillo.jpeg";
import jason_becker from "./assets/jason-becker.jpeg";
import metallica_picture from "./assets/metallica.jpg";
import frank_zappa_picture from "./assets/frank-zappa.jpg";
import GraphRender from "./components/renderGraph";

const mapaDeArtistas = new Map();
const mapaDeBandas = new Map();
const tabelaHash = new Map();
const artistsData = [
  {
    id: "a_1",
    name: "Renato Russo",
    bands: ["Legião Urbana"],
    musical_class: "Vocalista",
  },
  {
    id: "a_3",
    name: "James Hetfield",
    bands: ["Metallica"],
    musical_class: "vocalist",
    picture: james_picture,
  },
  {
    id: "a_4",
    name: "Kirk Hemmet",
    bands: ["Metallica"],
    musical_class: "Solo guitarrist",
    picture: kirk_picture,
  },
  {
    id: "a_5",
    name: "Lars Ulrich",
    bands: ["Metallica"],
    musical_class: "Drummer",
  },
  {
    id: "a_6",
    name: "Robert Trujillo",
    bands: ["Metallica"],
    musical_class: "Bassist",
    picture: robert_picture,
  },
  {
    id: "a_7",
    name: "Dave Mustaine",
    bands: ["Metallica", "Megadeth"],
    musical_class: "Vocalist",
    picture: dave_picture,
  },
  {
    id: "a_8",
    name: "Marty Friedman",
    bands: ["Metallica", "Cacophony"],
    musical_class: "Lead guitarrist",
  },
  {
    id: "a_9",
    name: "Jason Becker",
    bands: ["Cacophony"],
    musical_class: "Solo guitarrist",
    picture: jason_becker,
  },
  {
    id: "a_10",
    name: "David Lee Roth",
    bands: ["David Lee Roth Band", "Van Halen"],
    musical_class: "Vocalist",
    picture: null,
  },
  {
    id: "a_11",
    name: "Eddie Van Halen",
    bands: ["Van Halen"],
    musical_class: "Lead Guitarrist",
    picture: null,
  },
  {
    id: "a_12",
    name: "Steve Vai",
    bands: ["David Lee Roth Band", "Frank Zappa"],
    musical_class: "Lead Guitarrist",
    picture: null,
  },
  {
    id: "a_13",
    name: "Frank Zappa",
    bands: ["Frank Zappa"],
    musical_class: "Vocalist",
    picture: frank_zappa_picture,
  },
];
const bandsData = [
  {
    id: "b_1",
    name: "Legião Urbana",
    genre: "Rock",
    members: ["Renato Russo"],
  },
  {
    id: "b_2",
    name: "Metallica",
    genre: "Thrash Metal",
    members: [
      "James Hetfield",
      "Kirk Hemmet",
      "Robert Trujillo",
      "Lars Ulrich",
      "Dave Mustaine",
    ],
    picture: metallica_picture,
  },
  {
    id: "b_4",
    name: "Megadeth",
    genre: "Thrash Metal",
    members: ["Dave Mustaine", "Marty Friedman"],
  },
  {
    id: "b_5",
    name: "Cacophony",
    genre: "Neoclassical Metal",
    members: ["Jason Becker", "Marty Friedman"],
  },
  {
    id: "b_6",
    name: "Van Halen",
    genre: "Hard Rock",
    members: ["Eddie Van Halen", "David Lee Roth"],
  },
  {
    id: "b_7",
    name: "Frank Zappa",
    genre: "Jazz Fusion",
    members: ["Steve Vai", "Frank Zappa"],
  },
  {
    id: "b_8",
    name: "David Lee Roth Band",
    genre: "Hard Rock",
    members: ["Steve Vai", "Jason Becker", "David Lee Roth"],
  },
];

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
    mapaDeArtistas.set(node.artist.name, node);
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
    mapaDeBandas.set(node.band.name, node);
    graph.addVertex(node);
    for (let member of band.members) {
      graph.addEdge(node, mapaDeArtistas.get(member));
    }
  }
  graph.noOfVertices = graph.AdjList.size;
  return graph;
}

function bfs(graph, artist1, artist2) {
  let lista_de_arestas = [];
  let indice = -1;
  mapaDeArtistas.get(artist1.name).setVisited(true);
  lista_de_arestas.push([null, mapaDeArtistas.get(artist1.name)]);
  while (indice < lista_de_arestas.length) {
    indice++;
    if (indice === lista_de_arestas.length) {
      break;
    }
    for (let node1 of graph.AdjList.get(lista_de_arestas[indice][1])) {
      if (node1.type === "artist") {
        if (!mapaDeArtistas.get(node1.getArtist().getName()).getVisited()) {
          lista_de_arestas.push([lista_de_arestas[indice][1], node1]);
          tabelaHash.set(node1, lista_de_arestas.length - 1);
          mapaDeArtistas.get(node1.getArtist().getName()).setVisited(true);
          if (node1.getArtist() === artist2) {
            return lista_de_arestas;
          }
        }
      } else if (node1.type === "band") {
        if (!mapaDeBandas.get(node1.getBand().getName()).getVisited()) {
          lista_de_arestas.push([lista_de_arestas[indice][1], node1]);
          tabelaHash.set(node1, lista_de_arestas.length - 1);
          mapaDeBandas.get(node1.getBand().getName()).setVisited(true);
        }
      }
    }
  }
  return false;
}

function chooseBranch(lista_de_arestas) {
  let listaFinal = [];
  listaFinal.push(lista_de_arestas[lista_de_arestas.length - 1][1]);
  let element = lista_de_arestas[lista_de_arestas.length - 1][0];
  while (tabelaHash.get(element)) {
    listaFinal.push(element);
    if (tabelaHash.get(element)) {
      element = lista_de_arestas[tabelaHash.get(element)][0];
    }
  }
  listaFinal.push(element);
  return listaFinal.reverse();
}

function formatBranch(nodeList) {
  const yPos = 300;
  let xPos = 0;
  let finalGraph = [];
  nodeList.forEach((node) => {
    xPos += 250;
    const data1 = {
      data: {
        id: node.getId(),
        label: node.getName(),
      },
      position: {
        x: xPos,
        y: yPos,
      },
      style: {
        backgroundSize: "200px",
        backgroundImage: node.getPicture(),
        width: "300px",
        height: "300px",
        fontSize: "20px",
        shape: "circle",
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
  const [art2, setArt2] = useState("Kirk Hemmet");
  const [finalGraph, setFinalGraph] = useState([]);
  let graph;
  let tree;
  let branch;
  function handler(e) {
    e.preventDefault();
    graph = buildGraph();

    tree = bfs(
      graph,
      mapaDeArtistas.get(art1).getArtist(),
      mapaDeArtistas.get(art2).getArtist()
    );
    console.log(tree);
    if (tree) {
      branch = chooseBranch(tree);
      setFinalGraph(formatBranch(branch));
    } else {
      alert("Não há ligação entre esses artistas!");
    }
  }
  return (
    <>
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
          disabled={art1 == art2}
          type="submit"
          value="Submit"
          onClick={handler}
        />
      </div>
      <GraphRender elements={finalGraph} />;
    </>
  );
}

export default App;
