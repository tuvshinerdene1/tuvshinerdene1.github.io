const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

console.log("hello")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

class Boundary{
    static width = 40
    static height  =40
    constructor({position}){
        this.position = position
        this.width = 40
        this.height = 40
    }
    draw(){
        c.fillStyle = 'blue'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

class Player{
    constructor({position, velocity} ){
        this.position = position
        this.velocity = velocity
        this.radius = 15
    }
    
    draw(){
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0 , Math.PI*2)
        c.fillStyle = 'yellow'
        c.fill()
        c.closePath()
    }

    update(){
        this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
    }
}


const boundaries = []
const player = new Player({
    position:{
       x: Boundary.width + Boundary.width / 2,
        y: Boundary.height + Boundary.height / 2
    },
    velocity:{
        x:0,
        y:0
    }
})

const keys = {
    up: {
        pressed: false
    },
    left: {
        pressed: false
    },
    down: {
        pressed: false
    },
    right: {
        pressed: false
    },
}

const map = [
    ['-','-','-','-','-','-'],
    ['-',' ',' ',' ',' ','-'],
    ['-',' ','-','-',' ','-'],
    ['-',' ',' ',' ',' ','-'],
    ['-','-','-','-','-','-'],
]

map.forEach((row, i) => {
    row.forEach((symbol, j) => {
        switch(symbol){
            case '-':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width*j,
                            y:Boundary.height*i
                        }
                    })
                )
                break
        }
    })
})
    
 
function animate(){
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    boundaries.forEach((boundary) => {
        boundary.draw()
    })

    player.update()
    player.velocity.y = 0
    player.velocity.x = 0

    if(keys.up.pressed){
        player.velocity.y = -5
    }
    else if(keys.down.pressed){
        player.velocity.y = 5
    }
    else if(keys.right.pressed){
        player.velocity.x = 5
    }
    else if(keys.left.pressed){
        player.velocity.x = -5
    }
    else{
        console.log("Invalid input")
    }
}
animate()

addEventListener('keydown', ({key}) => {
    
    switch(key){
        case 'ArrowUp':
            keys.up.pressed = true
            break
        case 'ArrowDown':
            keys.down.pressed = true
            break
        case 'ArrowRight':
            keys.right.pressed = true
            break
        case 'ArrowLeft':
            keys.left.pressed = true
            break   
    }
    console.log(keys.up.pressed)
})

addEventListener('keyup', ({key}) => {
    
    switch(key){
        case 'ArrowUp':
            keys.up.pressed = false
            break
        case 'ArrowDown':
            keys.down.pressed = false
            break
        case 'ArrowRight':
            keys.right.pressed = false
            break
        case 'ArrowLeft':
            keys.left.pressed = false
            break   
    }
    console.log(keys.up.pressed)
})