// Prototype

function Book(title, author, year) {
  this.title = title;
  this.author = author;
  this.year = year;

}

Book.prototype.getSummary = function() {
  return `${this.title} ditulis oleh ${this.author} dan terbit pada tahun ${this.year}`
}

const ronggengDukuhParuk = new Book("Ronggeng Dukuh Paruk", "Ahmad Tohari", 1982);
const boemiManusia = new Book("Bumi Manusia", "Pramoedya Ananta Toer", 1980);

