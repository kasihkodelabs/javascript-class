// ES6 Class

class Book {
  constructor(title, author, year) {
    this.year = year;
    this.author = author;
    this.title = title;
  }

  getSummary() {
    return `${this.title} ditulis oleh ${this.author} dan terbit pada tahun ${this.year} `
  }

  static getStoreLocation() {
    return "Jl. Diponegoro 281, Jombang."
  }
}

const book3 = new Book("Ronggeng Dukuh Paruk", "Ahmad Tohari", 1982)

const ronggengDukuhParuk = new Book("Ronggeng Dukuh Paruk", "Ahmad Tohari", 1982);



class Magazine extends Book {
  constructor(title, author, year, month) {
    super(title, author, year);
    this.month = month;
  }
}

const kartini0822 = new Magazine("Kartini", "Majalah Kartini", 2018, "Juni");


console.log(kartini.getSummary());
