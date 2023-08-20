// Object Create

const bookProto = {
  getSummary: function() {
    return `${this.title} ditulis oleh ${this.author} dan terbit pada tahun ${this.year}`
  }
}


const ronggengDukuhParuk = Object.create(bookProto);
ronggengDukuhParuk.title = "Ronggeng Dukuk Paroek";
ronggengDukuhParuk.author = "Ahmad Tohari";
ronggengDukuhParuk.year = 1982;


const boemiManusia = Object.create(bookProto, {
  title: { value: "Boemi Manoesia" },
  author: { value: "Pramoedya Ananta Toer" },
  year: { value: 1980 },
});


