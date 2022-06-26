import Artist from "./Artist";
import Band from "./Band";

export default class Node {
  constructor(artist, band) {
    if (artist) {
      const {
        id: artistId,
        name: artistName,
        bands: artistBands,
        musical_class: artistMusical_class,
        picture: artistPicture,
      } = artist;
      this.artist = new Artist(
        artistId,
        artistName,
        artistBands,
        artistMusical_class,
        artistPicture
      );
    }

    if (band) {
      const { id: bandId, name: bandName, members, genre, picture } = band;
      this.band = new Band(bandId, bandName, members, genre, picture);
    }

    this.visited = false;
    this.type = artist ? "artist" : "band";
  }

  getVisited() {
    return this.visited;
  }
  setVisited(visited) {
    this.visited = visited;
  }
  getBand() {
    return this.band;
  }
  getArtist() {
    return this.artist;
  }
  getType() {
    return this.type;
  }
  getName() {
    const type = this.getType();
    return type === "artist"
      ? this.getArtist().getName()
      : this.getBand().getName();
  }
  getId() {
    const type = this.getType();
    return type === "artist"
      ? this.getArtist().getId()
      : this.getBand().getId();
  }
  getPicture() {
    const type = this.getType();
    return type === "artist"
      ? this.getArtist().getPicture()
      : this.getBand().getPicture();
  }
}
