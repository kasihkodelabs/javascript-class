/*
---
title: "JavaScript Class"
description: "JavaScript Class"
date: 2023-08-10T04:10:55Z
image: "/images/posts/javascript-class.png"
categories: ["code"]
tags: ["javascript"," class"]
draft: false
---

Daftar Isi

1. [Object](#object)
2. [Pra ES6](#pra-es6)
    - [Constructor](#constructor)
    - [Prototypes](#prototypes)
    - [Inheritancce](#inheritance)
    - [Object Create](#object-create)
3. [ES6 Class](#es6-class)
4. [Referensi](#referensi)

## Object

Kita sudah sedikit singgung tentang object literal disini, namun rasanya bukanlah ide buruk untuk sedikit refresh.

Anggaplah kita sedang mengembangkan aplikasi untuk basis data perpustakaan atau toko buku, dan oleh karena itu kita akan menyimpan dan menata informasi tentang buku. 

```js
const book = {
    title: "Ronggeng Dukuh Paruk",
    author: "Ahmad Tohari",
    year: 1982,
}
```

Dalam object, kita juga bisa berikan properti berupa `function` yang akan berperan sebagai `method` dari `object` tersebut. 

Mari tambahkan sebuah `method` dengan nama `getSummary`,

```js
const book = {
    title: "Ronggeng Dukuh Paruk",
    author: "Ahmad Tohari",
    year: 1982,
    getSummary: function(){
        return `${this.title} ditulis oleh ${this.author} dan terbit pada tahun ${this.year}` 
    }
}
```

> Kata `this` dalam konteks ini merujuk pada `book` yang kita buat. 


Lalu bagaimana jika perlu menambahkan buku kedua? 

Mudah, tulis salin saja object yang kita punya dan ubah informasi sesuai kebutuhan. Gampang kan?

Seperti ini:

```js
const book2 = {
    title: "Bumi Manusia",
    author: "Pramoedya Ananta Toer",
    year: 1980,
    getSummary: function(){
        return `${this.title} ditulis oleh ${this.author} dan terbit pada tahun ${this.year}` 
    }
}
```

## Pra ES6

<!-- Pendekatan kita dalam menulis `object` di atas bukanlah cara -->
Salah satu prinsip yang secara luas diterapkan dalam dunia pengembangan perangkat lunak adalah DRY (do not repeat yourself), adalah prinsip untuk tidak mengulangi penulisan `function` atau logic dalam kode. Dan pendekatan terakhir kita untuk menulis ulang object yang sama, -meskipun tidak membawa masalah serius sejauh ini- bukanlah cara yang menyenangkan. Pada kenyataanya, sebuah toko atau perpustakaan tidak mungkin hanya menyimpan beberapa buku. Nah disinilah peran `constructor`, yang pada dasarnya hanyalah sebuah `function` yang kita bisa gunakan untuk menulis `object` yang memiliki struktur serupa.

### Constructor

```js
function Book (title, author, year){
    this.title = title;
    this.author = author;
    this.year = year;
}
```

dan jangan lupa dengan metode `getSummary` yang kita miliki di bagian sebelumnya.


```js
function Book(title, author, year){
    this.title = title;
    this.author = author;
    this.year = year;
    this.getSummary = function (){
        return `${this.title} ditulis oleh ${this.author} dan terbit pada tahun ${this.year}` 
    }
}
```

untuk membuat object buku seperti yang kita lakukan dengan `object` literal, kita gunakan kata kunci `new` dan diikuti oleh nama dari function `constructor` yang sudah kita tentukan dan memberikan `argument` sesuai yang kita tulis.

```js
const ronggengDukuhParuk = new Book("Ronggeng Dukuh Paruk", "Ahmad Tohari", 1982);
```

dan tentu saja kita bisa buat buku ketiga, keempat kedua belas ribu, dengan cara yang sama. Dan perhatikan kita hanya perlu menulis `getSummary` satu kali dan kita bisa menggunakannya sebanyak yang kita mau dalam aplikasi kita.

```js
const boemiManusia = new Book("Bumi Manusia", "Pramoedya Ananta Toer", 1980);
```

### Prototypes

Jika kita coba inspeksi bentuk dari Book constructor yang kita tulis sebelumnya di browser console, 

```js
function Book (title, author, year){
    this.title = title;
    this.author = author;
    this.year = year;
    this.getSummary = function (){
        return `${this.title} ditulis oleh ${this.author} dan terbit pada tahun ${this.year}` 
    }
}
```

![function-constructor](/images/posts/constructor-function.png)

kita melihat bahwa metode `getSummary` adalah salah satu dari properti-properti lainnya, yang sebenarnya, kita bisa saja membuanya terlihat lebih *bersih* dengan cara memisahkan antara metode dan properti yang berisi nilai primitif. 

kita akan hapus properti getSummary dari constructor di atas,

```js
function Book (title, author, year){
    this.title = title;
    this.author = author;
    this.year = year;
    
}
```

lalu pindahkan itu ke bawahnya dengan `Object.prototype`

```js
Book.prototype.getSummary = function (){
    return `${this.title} ditulis oleh ${this.author} dan terbit pada tahun ${this.year}` 
}
```

Kini, jika kita kembali melihatnya getSummary tidak akan lagi termasuk di dalam properti, melainkan ada di dalam `Prototype` (gambar kanan).

![prototype](/images/posts/prototype.png)

### Inheritance

Anggaplah kita juga memiliki kumpulan majalah di dalam koleksi kita. Yang pada dasarnya memiliki properti yang sama yaitu judul, penulis dan tahun terbit. Tapi kini ditambah dengan bulan terbitnya.    


```js
function Magazine (title, author, year, month){
  Book.call(this, title, author, year);

  this.month = month;
}

const kartini0822 = new Magazine("Kartini", "Majalah Kartini", 2022, "Agu");
```


Tapi jika coba untuk menggunakan metode `getSummary` pada magazine, javaScript akan komplain dan menyatakana bahwa function ini tidak tersedia.   



Inilah saat kita bisa gunakan `inheritance`, yang berarti kita menginginkan `Magazine` bisa juga mewarisi (inherit) metode yang dimiliki oleh `Book`

```js
Magazine.prototype = Object.create(Book.protoype);

const mag3 = new Magazine();

mag3.getSummary();
```


### Object Create

Seperti contoh yang kita juga sudah lihat sebelumnya, kita bisa gunakan `Object.create` 

```js
const bookProto = {
    getSummary: function (){
        return `${this.title} ditulis oleh ${this.author} dan terbit pada tahun ${this.year}` 
    } 
}
```

Kita lalu bisa ciptakan object dengan cara berikut,

```js
const ronggengDukuhParuk = Object.create(bookProto);
ronggengDukuhParuk.title = "Ronggeng Dukuk Paroek";
ronggengDukuhParuk.author = "Ahmad Tohari";
ronggengDukuhParuk.year = 1982;
```


Alternatif lain adalah dengan memberikan argumen kedua dalam `Object.create`

```js
const ronggengDukuhParuk = Object.create(bookProto, {
  title: {value: "Ronggeng Dukuk Paroek"},
  author: {value: "Ahmad Tohari"},
  year: {value: 1982};
});
```

## ES6 Class

Dalam ES6 kita bisa melakukan semua yang baru kita bahas di atas dengan jauh lebih mudah dan ringkas. 

```js
class Book {
    constructor(title, author, year){
        this.year = year;
        this.author = author;
        this.title = title;
    }
}
```

Untuk menggunakanannya, kita juga akan gunakan kata kunci `new`,

```js
const book3 = new Book("Ronggeng Dukuh Paruk", "Ahmad Tohari", 1982)
```

untuk menambahkan metode, caranya pun menjadi sangat sederhana kini.  
kita cukup tambahkan seperti berikut ini

```js
class Book {
    constructor(title, year, author){
      // sama dengan sebelumnya 
    }
    
    getSummary(){
        return `${this.title} ditulis oleh ${this.author} dan terbit pada tahun ${this.year}` 
    }


}
```

```js
const ronggengDukuhParuk = new Book("Ronggeng Dukuh Paruk", "Ahmad Tohari", 1982)
```

### Static

ES6 class juga dibekali dengan static method, sebuah metode (function) dalam object tersebut yang kita bisa gunakan tanpa terlebih dahulu membuat object dengan `new`. 


```js
class Book(title, author, year){
  constructor(title, author, year){
    // sama dengan sebelumnya
  }

  static getStoreLocation (){
    return "Jl. Diponegoro 281, Jombang."
 }
}

console.log(Book.getStoreLocation());

```

### Extends

Dalam hal kita ingin membuat `object` dengan struktur yang sama dengan `object` yang kita sudah ada dan ditambah properti dan metode lain misalnya, kita tidak perlu menulis `class`  baru. Sama dengan `inheritance`  di atas, JavaScript class dibekali dengan fitur `extends` yang memungkinkan kita mencapai tujuan ini. 

```javascript
class Magazine extends Book{
  constructor(title, author, year, month){
    super(title, author, year);
    this.month = month;
  }

}
```

Dan object Magazine ini akan sama persis dengan yang sebelumnya kita punya tanpa kita perlu gunakan `prototype` dan semacamnya. 

```js
const kartini0822 = new Magazine("Kartini", "Majalah Kartini", 2018, "Juni");

console.log(kartini.getSummary());
```

Class pada ES6 pada dasarnya melakukan hal yang sama dengan yang kita sudah bahas pada segmen-segment sebelumnya. Tapi dengan cara yang jauh lebih mudah. 

Pertanyaannya sekarang. Jika sudah ada fitur yang memudahkan segala hal terkait object dan class, lalu mengapa saya harus repot-repot menulis dan memaparkan pendekatan-pendekatan era ES5 yang jelas-jelas sudah bisa saja ditinggalkan? Pemahaman jawabannya, saat kita mengetahui apa yang terjadi di belakang layar, akan lebih mudah bagi kita dalam memahami suatu topik.   



Kode dari artikel ini bisa ditemukan pada [link ini](https://github.com/kasih-kode/javascript-class.git)

## Referensi
- [JavaScript OOP Crash Course \[ES5 & ES6\]](https://www.youtube.com/watch?v=vDJpGenyHaA&t=320s)
- [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

*/
