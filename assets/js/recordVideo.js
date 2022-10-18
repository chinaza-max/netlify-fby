let camera_button2 = document.querySelector("#start-camera");
let video2 = document.querySelector("#video2");
let start_button = document.querySelector("#start-record");
let stop_button = document.querySelector("#stop-record");
let download_link = document.querySelector("#download-video");
let preUploadVideoSource=document.getElementById("preUploadVideoSource")

let camera_stream = null;
let media_recorder = null;
let blobs_recorded = [];
let video_local

camera_button2.addEventListener('click', async function() {
  
    try {
        camera_stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        video2.srcObject = camera_stream;

        $(document).ready(function(){
            $("#cameraModalRecording").modal('show');
        });
    

    } catch (error) {

        $(document).ready(function(){
            $("#warning2").modal('show');
        });
    
    }

});

start_button.addEventListener('click', function() {
    // set MIME type of recording as video/webm
    media_recorder = new MediaRecorder(camera_stream, { mimeType: 'video/webm' });

    // event : new recorded video blob available 
    media_recorder.addEventListener('dataavailable', function(e) {
		blobs_recorded.push(e.data);
    });

    // event : recording stopped & all blobs sent
    media_recorder.addEventListener('stop', function() {
    	// create local object URL from the recorded video blobs
    	video_local = URL.createObjectURL(new Blob(blobs_recorded, { type: 'video/webm' }));
    	download_link.href = video_local;



        preUploadVideoSource.src=video_local
        console.log(video_local)

        //preUploadVideoSource.setAttribute('src', video_local);
        // video_local.substring(5)
    });

    stop_button.addEventListener('click', function() {
        media_recorder.stop(); 
       // let src= document.getElementById("download-video").href;
        $(document).ready(function(){
            $("#preUploadVideo").modal('show');
        });
    });

    // start recording with each recorded blob having 1 second video
    media_recorder.start(1000);
});

