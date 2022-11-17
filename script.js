let images = ['karta2.png','karta3.png','karta4.png','karta5.png','karta6.png','karta7.png']
let picks = []
let cards_number
let block = false
let randoms = 0
let pause = 4

function endgame(){
    playsound("sounds/mixkit-arcade-game-complete-or-approved-mission-205.wav")
    $('.gameboard').remove()
    $('.container').append('<div class="endgame"></div>')
    $('.endgame').html('<p>KONIEC GRY</p>')
    $('.endgame').append('<button onClick="window.location.reload()">Restart game!</button>')
}

function playsound(sound,volume=0.5,loop=false){
    const music = new Audio(sound)
    console.log(loop)
    music.volume = volume
    music.play()
    music.loop = loop
}

$("button").on('click',()=>{
    playsound("sounds/mixkit-game-level-music-689.wav",0.5,true)

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
        cards_number = 18
        pause = 6
    }

    $('.container').append('<div class="gameboard"/>')
    const gameboard = $('.gameboard')

    let remove = []
    for(let i=0;i<cards_number;i++){
        if(randoms == cards_number/2){
            images = remove
            remove = []
        }
        const image = random_word()
        remove.push(image)
        
        picks.push({"nr":i,"image":image})

        if(i % pause == 0){
            gameboard.append('<div style="clear:both" />')
            
        }
        gameboard.append('<div id="card'+i+'" class="card"/>')
            $(`#card${i}`).click(()=>{
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
    playsound("sounds/mixkit-arcade-retro-changing-tab-206.wav",volume=0.9)
    if($(`#card${nr}`).css('opacity')==0){
        return 0
    }

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
                $(`#card${nr}`).animate({opacity:'0'},200).addClass('cardH')
                $(`#card${clicked_number}`).animate({opacity:'0'},200).addClass('cardH')
                turns += 1
                good += 1
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

            if(good == cards_number / 2 ){
                endgame()    
                }
            
        },1000) 

        }
   
   
}



function random_word(){
    const number = Math.floor(Math.random()*images.length)
    const image = images[number]
    images.splice(number,1)
    randoms += 1
    return image
}

