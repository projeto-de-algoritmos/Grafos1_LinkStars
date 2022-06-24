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
//    console.log(artist);
    const artistClass = new Artist(artist.id, artist.name, artist.bands, artist.musical_class);
    const node = new Node(artistClass, null);
    mapaDeArtistas.set(node.artist.name, node);
    graph.addVertex(node);
  }

  for (let band of bandsData){
    const bandClass = new Band(band.id , band.name, band.members, band.genre);
    const node = new Node(null, bandClass);
    mapaDeArtistas.set(node.band.name, node);
    graph.addVertex(node);
    for (let member of band.members){
      graph.addEdge(node, mapaDeArtistas.get(member));
    }
  }
  //A partir daqui o grafo está completo
  return [graph, mapaDeArtistas];
} 

function bfs(graph, artist1, artist2, mapaDeArtistas){
  let lista_de_vertices = [];
  mapaDeArtistas.get(artist1.name).visited = true;

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
