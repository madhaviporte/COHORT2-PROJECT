var aud = {
    KeyA: new Audio('./24.mp3'),
    KeyB: new Audio('./29.mp3'),
    KeyC: new Audio('./41.mp3'),
    KeyD: new Audio('./48.mp3'),
    KeyE: new Audio('./53.mp3'),
    KeyF: new Audio('./60.mp3'),
    KeyG: new Audio('./64.mp3'),
    KeyH: new Audio('./69.mp3'),
    KeyI: new Audio('./72.mp3'),
    KeyJ: new Audio('./77.mp3'),
    KeyK: new Audio('./79.mp3'),
    KeyL: new Audio('./84.mp3'),
    KeyM: new Audio('./96.mp3'),
    KeyN: new Audio('./24.mp3'),
    KeyO: new Audio('./29.mp3'),
    KeyP: new Audio('./36.mp3'),
    KeyQ: new Audio('./41.mp3'),
    KeyR: new Audio('./48.mp3'),
    KeyS: new Audio('./53.mp3'),
    KeyT: new Audio('./60.mp3'),
    KeyU: new Audio('./64.mp3'),
    KeyV: new Audio('./65.mp3'),
    KeyW: new Audio('./69.mp3'),
    KeyX: new Audio('./72.mp3'),
    KeyY: new Audio('./77.mp3'),
    KeyZ: new Audio('./79.mp3'),
}
// var piyano=document.querySelector('#piyano');

document.addEventListener('keydown',function(dets){
    if(aud[dets.code]){
        aud[dets.code].currentTime=0;
    aud[dets.code].play();
    }
    
});