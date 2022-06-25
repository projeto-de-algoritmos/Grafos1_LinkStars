import './App.css';
import Band from './utils/graphs/Band';
import Graph from './utils/graphs/Graph';
import Node from './utils/graphs/Node';
import Artist from './utils/graphs/Artist';

function buildGraph(){
  let graph = new Graph();
  const mapaDeArtistas = new Map();
  const mapaDeBandas = new Map();
  //const artistsData = require('./artists.json');
  //const bandsData = require('./bands.json'); 
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
    }
  ];
  const bandsData = [
    {
      id: 1,
      name: "Sandy e Junior", 
      genre: "pop",
      members:["Sandy", "Junior"]
    }
  ];
  
  for (let artist of artistsData){
    const artistClass = new Artist(artist.id, artist.name, artist.bands, artist.musical_class);
    const node = new Node(artistClass, null);
    mapaDeArtistas.set(node.artist.name, node);
    graph.addVertex(node);
  }

  for (let band of bandsData){
    const bandClass = new Band(band.id , band.name, band.members, band.genre);
    const node = new Node(null, bandClass);
    mapaDeBandas.set(node.band.name, node);
    graph.addVertex(node);
    for (let member of band.members){
      graph.addEdge(node, mapaDeArtistas.get(member));
    }
  }
  return [graph, mapaDeArtistas, mapaDeBandas];
} 

function bfs(graph, artist1, artist2, mapaDeArtistas, mapaDeBandas){
  let lista_de_arestas = [];
  let indice = -1;
  mapaDeArtistas.get(artist1.name).setVisited(true);
  lista_de_arestas.push([null, mapaDeArtistas.get(artist1.name)])
  while (indice < lista_de_arestas.length){
    indice++;
    if (indice === lista_de_arestas.length){
      break;
    }
    for (let node1 of graph.AdjList.get(lista_de_arestas[indice][1])){
      if(node1.type == "artist"){
        if (!mapaDeArtistas.get(node1.getArtist().getName()).getVisited()){
          lista_de_arestas.push([lista_de_arestas[indice][1], node1]);
          mapaDeArtistas.get(node1.getArtist().getName()).setVisited(true);
          if (node1.getArtist() == artist2){
            return lista_de_arestas;
          }
        }
      }
      else if(node1.type == "band"){
        if (!mapaDeBandas.get(node1.getBand().getName()).getVisited()){
          lista_de_arestas.push([lista_de_arestas[indice][1], node1]);
          mapaDeBandas.get(node1.getBand().getName()).setVisited(true);
        }
      }
    } 
  }
  return lista_de_arestas
} 

function App() {
  buildGraph()
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
