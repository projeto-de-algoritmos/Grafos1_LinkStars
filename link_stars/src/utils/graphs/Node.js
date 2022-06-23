import Artist from "./Artist"

export default class Node{
  constructor(artist){
    const {id, name, bands, musical_class} = artist;
    this.artist = new Artist(id, name, bands, musical_class)   
    this.visited = false; 
  }
}