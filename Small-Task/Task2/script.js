var btn = document.querySelector('button')
var main = document.querySelector('main')

var arr = [
  "I love exploring new places when I travel.",
  "I enjoy long drives with good music.",
  "I dream of visiting every beautiful country.",
  "I feel happiest when I am traveling freely.",
  "I love sunsets on beaches and mountains.",
  "I believe true love feels peaceful.",
  "I trust love that grows slowly and stays forever.",
  "I think love makes life more meaningful.",
  "I enjoy small romantic moments the most.",
  "I love with honesty and a pure heart.",
  "I value friendships that feel like family.",
  "I enjoy late-night talks with my best friends.",
  "I trust friends who stay even in tough times.",
  "I laugh the most when I am with my friends.",
  "I feel lucky to have loyal friends in my life.",
  "I study every day to become a better version of myself.",
  "I believe studying is the first step toward success.",
  "I enjoy learning new subjects and skills.",
  "I study hard because my dreams depend on it.",
  "I feel proud when I understand a new concept.",
  "I think life is a mix of smiles and struggles.",
  "I choose to stay positive even on tough days.",
  "I enjoy the little moments that make life special.",
  "I believe everything happens for a reason.",
  "I learn something new from life every day.",
  "I stay motivated no matter how slow the progress.",
  "I push myself even when I feel tired.",
  "I believe consistency beats talent.",
  "I motivate myself by remembering my goals.",
  "I know that one day my hard work will pay off.",
  "I enjoy making people laugh.",
  "I laugh at my own jokes more than anyone else.",
  "I think life becomes better when we add humor.",
  "I find funny memes more relaxing than therapy.",
  "I believe laughing is the best stress relief.",
  "I love planning last-minute trips.",
  "I enjoy capturing travel memories in photos.",
  "I feel alive when I visit new cultures.",
  "I love sharing food with my friends.",
  "I value honesty in all relationships.",
  "I enjoy studying in peaceful places.",
  "I believe life is too short to be unhappy.",
  "I love motivating others with my words.",
  "I enjoy silly conversations with friends.",
  "I love celebrating small achievements.",
  "I push myself to never give up.",
  "I enjoy learning from failures.",
  "I love moments that turn into memories.",
  "I believe laughter, love, and travel make life beautiful."
];

btn.addEventListener('click' , function(){
    var h1 = document.createElement('h1')

    var x = Math.random()*80
    var y= Math.random()*80
    var rot= Math.random()*360
    var scl= Math.random()*360
    var a = Math.floor(Math.random()*arr.length)
    var c1 = Math.floor(Math.random()*256)
    var c2 = Math.floor(Math.random()*256)
    var c3 = Math.floor(Math.random()*256)

    h1.innerHTML = arr[a]
    h1.style.position ='absolute'
    h1.style.left= x+'%'
    h1.style.top= y+'%'
    h1.style.rotate= rot+'deg'
    h1.style.scale= scl
    h1.style.color=`rgb(${c1},${c2},${c3})`
    main.appendChild(h1)
})