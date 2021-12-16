var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var audioBuffer, fuenteDeReproduccion;
var start = false;
var stop = true;

function solicitarAudio(url) {
  var request = new XMLHttpRequest();
  request.open("GET",url,true);
  request.responseType = "arraybuffer";
  request.onload = function() {
    audioCtx.decodeAudioData(request.response, function(buffer) {
      audioBuffer = buffer;
    });
  };
  request.send();
}

function reproducirAudio() {
    fuenteDeReproduccion = audioCtx.createBufferSource();
    fuenteDeReproduccion.buffer = audioBuffer;
    fuenteDeReproduccion.playbackRate.value = .97; //Ajusto la velocidad de reproduccion
    fuenteDeReproduccion.connect(audioCtx.destination);
    fuenteDeReproduccion.start(audioCtx.currentTime);	
}

function detenerAudio() {
    fuenteDeReproduccion.stop();
}

function audio(){
  if (stop) {// si el audio está parado
    start = true;
    stop = false;
    boton.innerHTML = "||";//detener
    reproducirAudio();
  }else{// de lo contrario
    stop = true;
    start = false;
    boton.innerHTML = "&#9655;";//reproducir
    detenerAudio()
  }
}
/*"https://s3-us-west-2.amazonaws.com/s.cdpn.io/222579/Kevin_MacLeod_-_Camille_Saint-Sans_Danse_Macabre_-_Finale.mp3"*/
solicitarAudio(
  "https://raw.githubusercontent.com/hitechStart/deporteExtremo/b34df4b7c084b12a8de9197f7d4cbf35665225e5/Radio.mp3"
);

// Utiliza el evento click para iniciar o detener la reproducción
boton.addEventListener("click", audio, false);
