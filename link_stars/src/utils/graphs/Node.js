import Artist from "./Artist"
import Band from "./Band"

export default class Node{
  constructor(artist, band){
    if(artist){
      const {id: artistId, name: artistName, bands: artistBands, musical_class: artistMusical_class} = artist;
      this.artist = new Artist(artistId, artistName, artistBands, artistMusical_class)
    }
    
    if(band){
      const {id: bandId, name: bandName, members: members, genre: genre} = band;
      this.band = new Band(bandId, bandName, members, genre)   
    }

    this.visited = false;
    this.type = artist ? 'artist' : 'band'
  }

  getBand(){
    return this.band;
  }
  getArtist(){
    return this.artist
  }
}