//variabel sistem game (grid/area game, menu popup, tombol main lagi, score)
let grid = document.querySelector(".grid")
let popUp = document.querySelector(".popUpmenu")
let playA = document.querySelector(".playAgain")
let score = document.querySelector(".scoreBoard")

//button
let top = document.querySelector(".top")
let bottom = document.querySelector(".bottom")
let leteft = document.querySelector(".left")
let right = document.querySelector(".right")

//variabel game (ular, apple, posisi, dll)
let width = 10 //lebar grid nya
let currentIndex = 0 //index sekarang
let appleIndex = 0 //index apple
let currentSnake = [ 2, 1, 0 ] //menggunakan array untuk posisi ular
let direction = 1 //arah ular
let scoreDsp = 0 //score duh?
let speed = 0.8 //kecepatan ularnya
let intervalTime = 0 // ?
let interval = 0 // ?


//ada event listener dengan objek DOMContentLoaded yg akan berjalan saat html semua ter render dan mengaktifkan function function game saat ada tombol yg di pencet
document.addEventListener("DOMContentLoaded", function() {
 document.addEventListener("keyup", control)
 createBoard()
 startUp()
 playA.addEventListener("click", replay)
})



//membuat board, 10 by 10 grid
function createBoard() {
 popUp.style.display = "none"
 for (let i = 0; i <= 100; i++) {
  let div = document.createElement("div")
  grid.appendChild(div)
 }
}


/* The startGame function first gets all the divs (since we are creating the divs at runtime, we can not get them at the top of the code).

Next we select a spot for our apple. We will do that below in the randomApple function. The direction refers to where the snake is headed – 1 for right, -1 for left, and so on.

intervalTime sets the time it takes for the snake to move around, while currentSnake defines where exactly on the grid the snake will be (note that the snake is basically a couple of divs given a particular type of color).

To display our snake on the screen, we will loop over currentSnake with forEach. With each value we get, we will use it with squares. Remember that we accessed the grid divs with querySelectorAll, and we can then access them like an array, that is using numbers. In our case, these are the values of currentSnake.

After this, we simply append a setInterval call (with function move Outcome and a time of intervalTime, which we set above) to the variable interval. This is so that we can easily call clearInterval on that variable.

The moveOutcome runs every 1000ms (1s) and basically defines what happens when you move the snake. */

function startGame() {
 let squares = document.querySelectorAll(".grid div")
 randomApple(squares)
 //random apple
 direction = 1
 scoreDsp.innerHTML = score
 intervalTime = 1000
 currentSnake = [ 2, 1, 0 ]
 currentIndex = 0
 currentSnake.forEach((index) => squeres[ index ].classList.add("snake"))
 interval = setInterval(moveOutcome, intervalTime)
}


//mengambil div grid, setelah itu menjalankan function dimana mengecek apakah kita hit sesuatu bila iy akan muncul popUp. else snake jalan
function moveOutcome() {
 let squeres = document.querySelectorAll(".grid div")
 if (checkForHits(squeres)) {
  alert("You hit something!!!")
  popUp.style.display = "flex"
  return clearInterval(interval)
 } else {
  moveSnake(squeres)
 }
}


/*function menerima argumen squeres jadi gausah ngambil si div nya..
Hal pertama yang harus kita lakuin adalah *hapus elemen terakhir dari array `currentSnake` pake `pop`* (ini adalah ekornya, dan elemen pertama selalu adalah kepala).

Intinya ularnya bergerak satu langkah ke depan, ninggalin posisi sebelumnya yang udah dia tempati. Setelah itu kita tinggal nambahin value baru ke awal array pake `unshift`.

Anggap aja ular kita baru mulai gerak dan lagi ngadep ke kanan (artinya, `direction = 1`). Direction itu bakal ditambahin ke kepala `currentSnake` dan hasil jumlahnya bakal dimasukin sebagai `snakeHead` baru.

Contohnya, kalau ularnya lagi di posisi `[2,1,0]`, kita hapus elemen terakhirnya jadi sisanya `[2,1]`. Terus kita ambil kepalanya yang nilainya `2` dan kita tambah pake direction yang nilainya `1`, hasilnya kita jadiin value baru jadi `[3,2,1]` yang artinya ular kita maju satu langkah ke kanan setelah satu detik.

Kalau kita mau gerakin ularnya ke bawah, direction nya bakal di-set ke width (yang nilainya 10) dan ditambahin ke elemen pertama (misalnya 12, terus dimasukin) jadi `[12,2,1]`.

Setelah itu kita tinggal cek aja apakah ularnya udah makan apel dan tampilin `snakeHead` baru itu ke DOM.
*/
function moveSnake(squeres) {
 let tail = currentSnake.pop()
 squares[ tail ].classList.remove("snake")
 currentSnake.unshift(currentSnake[ 0 ] + direction)
 //movement cuman sampai sini
 eatApple(squeres, tail)
 squares[ currentSnake[ 0 ] ].classList.add("snake")
}

