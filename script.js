const gameboard = $('.gameboard')

let images = ['karta2.png','karta3.png','karta4.png','karta5.png','karta6.png','karta7.png']

let picks = []

let block = false

$("button").on('click',()=>{
    $("button").remove()
    let remove = []
    for(let i=0;i<=11;i++){
        if(images.length == 0){
            images = remove
            remove = []
        }
        const image = random_word()
        remove.push(image)
        
        picks.push({"nr":i,"image":image})

        if(i % 4 == 0){
            gameboard.append('<div style="clear:both" />')
            
        }
        gameboard.append('<div id="card'+i+'" class="card"/>')
        $(`#card${i}`).on('click',()=>{
            if(!block){
                $(`#card${i}`).removeClass('card').addClass('cardA').css('background-image','url("'+image+'")')
                engine(i)
            }
           
        })
    }
    console.log(picks)
    
})


let turns = 0
let clicks = 0
let clicked_number 


function engine(nr){
   
    if(clicks==0){
        clicked_number = nr
        clicks = 1
    }
       else{
        if(nr == clicked_number){
            return 0
        }

        clicks = 0
        block = true
       
        setTimeout(()=>{
            if(picks[nr].image == picks[clicked_number].image){
                $(`#card${nr}`).css('opacity',0)
                $(`#card${clicked_number}`).css('opacity',0)
                turns += 1
                $('p').html("Liczba tur " + turns)
                block = false
            }
            else{
                $(`#card${nr}`).css('background-image','').addClass('card')
                $(`#card${clicked_number}`).css('background-image','').addClass('card')
                turns += 1
                $('p').html("Liczba tur " + turns)
                block = false
            }
        },1000)
        
    }
   
   
}



function random_word(){
    const number = Math.floor(Math.random()*images.length)
    const image = images[number]
    images.splice(number,1)
    return image
}
