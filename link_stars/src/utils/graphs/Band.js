export default class Band {
  constructor(id, name, members, genre){
    this.id = id;
    this.name = name;
    this.genre = genre;
    this.members = members;   
  }

  getName(){
    return this.name;
  }
  setName(name){
    return this.name = name;
  }
  getMembers(){
    return this.members;
  }
  addMember(member){
    return this.members.push(member);
  }
  getGenre(){
    return this.genre;    
  } 
  setGenre(genre){
    return this.genre = genre;
  }
}