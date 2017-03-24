if (!('webkitSpeechRecognition' in window)) {
  upgrade();
} else {



  var recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;

  //recognition.onstart = function() { ... }
  //recognition.onresult = function(event) { ... }
  recognition.onerror = function(event) {
  	//recognition.stop();
  }
  recognition.onend = function() {
  	recognizing = false;
  	recognition.stop();
  	console.log('stop')
  }

  $SCRIPT_ROOT = 'https://veppaf1khi.execute-api.us-east-1.amazonaws.com/jiange';

 function startButton(event) {
  
  final_transcript = '';
  old_transcript = '';
  recognition.lang = 'en-US'//select_dialect.value;
  recognition.start();

  }

  recognition.onresult = function(event) {
    var interim_transcript = '';

    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript = event.results[i][0].transcript;
      } else {
        interim_transcript += event.results[i][0].transcript;
      }
    }
    
    if(old_transcript != final_transcript){
    	old_transcript = final_transcript;
    	console.log(final_transcript);

    	
        $http($SCRIPT_ROOT+'/api')
            .get({question: final_transcript})
            .then((value)=>{
            	console.log(value)
                var data = JSON.parse(value);
                var utterThis = new SpeechSynthesisUtterance(data.result);
        		utterThis.voice = synth.getVoices()[49];
        		utterThis.pitch = 1.1;
  				utterThis.rate = 0.9;
        		synth.speak(utterThis);
        		console.log(data.result)
            })
            .catch((err)=>{
                console.log(err);
            });
    }
    
    //final_transcript = capitalize(final_transcript);
    //final_span.innerHTML = linebreak(final_transcript);
    //interim_span.innerHTML = linebreak(interim_transcript);
  };

  var synth = window.speechSynthesis;
  setTimeout(function(){  var utterThis = new SpeechSynthesisUtterance("Hi, ask me anything? ");
  	utterThis.voice = synth.getVoices()[49];
  	utterThis.pitch = 1.1;
  	utterThis.rate = 0.9;
  	synth.speak(utterThis);
  }, 1000);
 
  //utterThis.pitch = pitch.value;
  //utterThis.rate = rate.value;
}
startButton()