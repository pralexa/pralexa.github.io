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

  $SCRIPT_STAGE = 'https://hhude7sbn4.execute-api.us-east-1.amazonaws.com/staging'; //'http://127.0.0.1:5000';
  $SCRIPT_PRODUCTION = 'https://e6nia5nblk.execute-api.us-east-1.amazonaws.com/production';
 function startButton(event) {
  
  final_transcript = '';
  old_transcript = '';
  recognition.lang = 'en-US'//select_dialect.value;
  //recognition.start();

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

    	
        /*$http($SCRIPT_ROOT+'/api')
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
            });*/
    }
    
    //final_transcript = capitalize(final_transcript);
    //final_span.innerHTML = linebreak(final_transcript);
    //interim_span.innerHTML = linebreak(interim_transcript);
  };

  function guidGenerator() {
      var S4 = function() {
         return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
      };
      return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
  }

  var synth = window.speechSynthesis;
  /*setTimeout(function(){  
    var utterThis = new SpeechSynthesisUtterance("Hi, ask me anything? ");
  	utterThis.voice = synth.getVoices()[49];
  	utterThis.pitch = 1.1;
  	utterThis.rate = 0.9;
  	synth.speak(utterThis);
  }, 1000);*/
 
  //utterThis.pitch = pitch.value;
  //utterThis.rate = rate.value;
  userID = guidGenerator();
  
  function ask(text, production = false){
	var url = production?$SCRIPT_PRODUCTION:$SCRIPT_STAGE;
   $http(url+'/api')
       .get({body: text, userID: userID})
       .then((value)=>{
           var data = JSON.parse(value);
           var utterThis = new SpeechSynthesisUtterance(data.result);
           utterThis.voice = synth.getVoices()[49];
           utterThis.pitch = 1.1;
           utterThis.rate = 0.9;
           synth.speak(utterThis);
           console.log(production?"Pixie-production-"+data.result:"Pixie-staging-"+data.result)

        })
        .catch((err)=>{
            console.log(err);
        });
      return undefined;
  }
}
startButton()
