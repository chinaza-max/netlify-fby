let start = document.getElementById('btnStart');
let stop = document.getElementById('btnStop');
let playAudio = document.getElementById('audioPlay');
let audio_button = document.getElementById('audioButton');
let stopAudioVisualizer=false




audio_button.addEventListener('click', async function() {

	navigator.mediaDevices.getUserMedia({ audio: true })
	.then(function (mediaStreamObj) {

		const mediaRecorder = new MediaRecorder(mediaStreamObj);
	

		let audioChunks = [];
		mediaRecorder.addEventListener("dataavailable", event => {
			audioChunks.push(event.data);
		});
	
        $(document).ready(function(){
            $("#audioModal").modal('show');
        });

		start.addEventListener('click', function (ev) {
			stopAudioVisualizer=false
			audioChunks = [];
			mediaRecorder.start();
			startAudioVisualizer()
			
		})

		// Stop event
		stop.addEventListener('click', function (ev) {
			mediaRecorder.stop();
		});


		mediaRecorder.onstop = function (ev) {

		// blob of type mp3
		const audioBlob  = new Blob(audioChunks,{ 'type': 'audio/mp3;' });
	
		$(document).ready(function(){
            $("#preUploadAudio").modal('show');
        });

		let audioSrc = window.URL.createObjectURL(audioBlob);
		    playAudio.src = audioSrc;


		}
	})

	// If any error occurs then handles the error
	.catch(function (err) {
		console.log(err.name, err.message);
	});

})


/*
for reference implementation https://www.geeksforgeeks.org/how-to-record-and-play-audio-in-javascript/

*/