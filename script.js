let images = ['karta2.png','karta3.png','karta4.png','karta5.png','karta6.png','karta7.png']
let picks = []
let cards_number
let block = false

function endgame(){
    
}

$("button").on('click',()=>{
    $("button").remove()

    const level = $('#poziom').val()
    $('#poziom').remove()

    console.log(level)
    if(level=='latwy'){
        cards_number = 8 
    }
    else if(level=='sredni'){
        cards_number = 12
    }
    else if(level=='trudny'){
        cards_number = 16
    }

    $('.container').append('<div class="gameboard"/>')
    const gameboard = $('.gameboard')

    let remove = []
    for(let i=0;i<cards_number;i++){
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
                $(`#card${i}`).removeClass('card').addClass('cardA').css('background-image','url("images/'+image+'")')
                engine(i)
            }
           
        })
    }
    
})


let turns = 0
let clicks = 0
let clicked_number 
let good = 0

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
                good += 1
                $('p').html("Liczba tur " + turns)
                block = false
                picks[nr].blocked, picks[clicked_number].blocked = true
            }
            else{
                $(`#card${nr}`).css('background-image','').addClass('card')
                $(`#card${clicked_number}`).css('background-image','').addClass('card')
                turns += 1
                $('p').html("Liczba tur " + turns)
                block = false
            }
            
        },1000)

        if(good == cards_number / 2){
            $('.gameboard').remove()
            picks = []
            $('.container').append('<div class="endgame"></div>')
            $('.endgame').html('<p>KONIEC GRY</p>')
            $('.endgame').append('<button>Restart game!</button>')
        }
        
    }
   
   
}



function random_word(){
    const number = Math.floor(Math.random()*images.length)
    const image = images[number]
    images.splice(number,1)
    return image
}

