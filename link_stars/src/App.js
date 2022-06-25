import "./App.css";
import Band from "./utils/graphs/Band";
import Graph from "./utils/graphs/Graph";
import Node from "./utils/graphs/Node";
import Artist from "./utils/graphs/Artist";

const mapaDeArtistas = new Map();
const mapaDeBandas = new Map();
const tabelaHash = new Map();
const artistsData = [
  {
    id: 1,
    name: "Sandy",
    bands: ["Sandy e Junior", "Sandy"],
    musical_class: "singer",
  },
  {
    id: 2,
    name: "Junior",
    bands: ["Sandy e Junior"],
    musical_class: "guitar player",
  },
  {
    id: 3,
    name: "James Hetfield",
    bands: ["Metallica"],
    musical_class: "vocalist",
  },
  {
    id: 4,
    name: "Kirk Hemmet",
    bands: ["Metallica"],
    musical_class: "Solo guitarrist",
  },
  {
    id: 5,
    name: "Lars Ulrich",
    bands: ["Metallica"],
    musical_class: "Drummer",
  },
  {
    id: 6,
    name: "Robert Trujillo",
    bands: ["Metallica"],
    musical_class: "Bassist",
  },
  {
    id: 7,
    name: "Dave Mustaine",
    bands: ["Metallica", "Megadeth"],
    musical_class: "Vocalist",
  },
  {
    id: 8,
    name: "Marty Friedman",
    bands: ["Metallica", "Cacophony"],
    musical_class: "Solo guitarrist",
  },
  {
    id: 9,
    name: "Jason Becker",
    bands: ["Cacophony"],
    musical_class: "Solo guitarrist",
  },
];
const bandsData = [
  {
    id: 1,
    name: "Sandy e Junior",
    genre: "pop",
    members: ["Sandy", "Junior"],
  },
  {
    id: 2,
    name: "Metallica",
    genre: "Thrash Metal",
    members: [
      "James Hetfield",
      "Kirk Hemmet",
      "Robert Trujillo",
      "Lars Ulrich",
      "Dave Mustaine",
    ],
  },
  {
    id: 3,
    name: "arroz",
    genre: "asdf",
    members: ["Junior", "Robert Trujillo"],
  },
  {
    id: 4,
    name: "Megadeth",
    genre: "Thrash Metal",
    members: ["Dave Mustaine", "Marty Friedman"],
  },
  {
    id: 5,
    name: "Cacophony",
    genre: "Neoclassical Metal",
    members: ["Jason Becker", "Marty Friedman"],
  },
];

function buildGraph() {
  let graph = new Graph();
  for (let artist of artistsData) {
    const artistClass = new Artist(
      artist.id,
      artist.name,
      artist.bands,
      artist.musical_class
    );
    const node = new Node(artistClass, null);
    mapaDeArtistas.set(node.artist.name, node);
    graph.addVertex(node);
  }

  for (let band of bandsData) {
    const bandClass = new Band(band.id, band.name, band.members, band.genre);
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

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
    </div>
  );
}

export default App;
