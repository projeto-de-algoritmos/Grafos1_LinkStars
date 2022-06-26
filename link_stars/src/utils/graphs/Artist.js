export default class Artist {
  constructor(id, name, bands, musical_class, picture) {
    this.id = id;
    this.name = name;
    this.bands = bands;
    this.musical_class = musical_class;
    this.picture = picture;
  }

  getId() {
    return this.id;
  }
  getName() {
    return this.name;
  }
  setName(name) {
    return (this.name = name);
  }
  getBands() {
    return this.bands;
  }
  addBand(band) {
    return this.bands.push(band);
  }
  getMusicalClass() {
    return this.musical_class;
  }
  setMusicalClass(musical_class) {
    return (this.musical_class = musical_class);
  }
  getPicture() {
    return this.picture;
  }
}
