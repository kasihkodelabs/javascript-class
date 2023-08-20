
// Inheritance
function Book(title, author, year) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.getSummary = function() {
    return `${this.title} ditulis oleh ${this.author} dan terbit pada tahun ${this.year}`
  }
}

function Magazine(title, author, year, month) {
  Book.call(this, title, author, year);

  this.month = month;
}

Magazine.prototype = Object.create(Book.protoype);


const kartini0822 = new Magazine("Kartini", "Majalah Kartini", 2022, "Agu");

kartini0822.getSummary();
