var arr = [
    {
        team: 'CSK',
        primary:'yellow',
        secondary:'black',
        fullname:'Cennai Super Kings',
        trophies:'5',
        Caption:'Raturaj Galkwad'
    },
    {
team:'MI',
primary:'Blue',
secondary:'Gold',
fullname:'Mumbai Indians',
trophies:'5',
Caption:'Hardik pandaya'
    },
    {
team:'KKR',
primary:'Purple',
secondary:'Gold',
fullname:'Kolkata Knight Riders',
trophies:'3',
Caption:'Ajinkya Rahane'
    },
    {
team:'RCB',
primary:'Red',
secondary:'Black',
fullname:'Royal Challengers Bangaluru',
trophies:'1(2025)',
Caption:'Rajat Patidar'
    },
    {
team:'SRH',
primary:'Orange',
secondary:'Black',
fullname:'Sunrisers Hydrabad',
trophies:'1',
Caption:'Pat Cummins'
    },
    {
team:'GT',
primary:'Gujrat Titans',
secondary:'Blue',
fullname:'Gujrat Titans',
trophies:'2',
Caption:'----'
    },
    {
team:'LSG',
primary:'Blue',
secondary:'Orange',
fullname:'Lacknow Super Glants',
trophies:'0',
Caption:'Rishabh Pant'
    },
    {
team:'PBKS',
primary:'Red',
secondary:'Silver',
fullname:'Punjab Kings',
trophies:'0',
Caption:'Sheryans lyer'
    },
    {
team:'RR',
primary:'Pink',
secondary:'Blue',
fullname:'Rajasthan Royals',
trophies:'1(2008)',
Caption:'Sanju Samson'
    },
    {
team:'DC',
primary:'Blue',
secondary:'Red',
fullname:'Delhi Capitals',
trophies:'0',
Caption:'Axar Patel'
    },
]
var btn = document.querySelector('button')
var h1 = document.querySelector('h1')
var main = document.querySelector('main')

btn.addEventListener('click', function(){
    var winner = arr[Math.floor(Math.random()*arr.length)]
    h1.innerHTML= winner.team
    h1.style.backgroundColor=winner.secondary
    main.style.backgroundColor=winner.primary
})