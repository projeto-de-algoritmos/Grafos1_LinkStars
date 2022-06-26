export default class Band {
  constructor(id, name, members, genre, picture) {
    this.id = id;
    this.name = name;
    this.genre = genre;
    this.members = members;
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
  getMembers() {
    return this.members;
  }
  addMember(member) {
    return this.members.push(member);
  }
  getGenre() {
    return this.genre;
  }
  getPicture() {
    return this.picture;
  }
  setGenre(genre) {
    return (this.genre = genre);
  }
}
