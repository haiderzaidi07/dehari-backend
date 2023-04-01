let ad=document.getElementById('ad')
let adPopUp=document.getElementById('ad_pop_up')
let blackShade=document.getElementById('black_shade')
let makeBidPopUp=document.getElementById('make_bid_pop_up')
let confirmationPopUp=document.getElementById('confirmation_pop_up')
let congratulationsPopUp=document.getElementById('congratulations_pop_up')

function closePopUp(){
    if(!adPopUp.classList.contains('hidden'))
        adPopUp.classList.add('hidden')
    if(!blackShade.classList.contains('hidden'))
        blackShade.classList.toggle('hidden')
    if(!makeBidPopUp.classList.contains('hidden'))
        makeBidPopUp.classList.add('hidden')


}
function makeBid(){
makeBidPopUp.classList.toggle('hidden')
adPopUp.classList.toggle('hidden')

}

function placeBid(){
    confirmationPopUp.classList.toggle('hidden')
    makeBidPopUp.classList.toggle('hidden')

}

function confirmBid(){
congratulationsPopUp.classList.toggle('hidden')

}
function cancelBid(){
confirmationPopUp.classList.toggle('hidden')
blackShade.classList.toggle('hidden')


}
function doneBid(){
    blackShade.classList.toggle('hidden')
    confirmationPopUp.classList.toggle('hidden')
    congratulationsPopUp.classList.toggle('hidden')
    // adPopUp.classList.toggle('hidden')
    // makeBidPopUp.classList.toggle('hidden')





}

ad.addEventListener('click',()=>{
    blackShade.classList.toggle('hidden')
    adPopUp.classList.toggle('hidden')

})