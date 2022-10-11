const qrcode2 = window.qrcode;

const video = document.createElement("video");
const canvasElement = document.getElementById("qr-canvas");
const canvas = canvasElement.getContext("2d");

const qrResult = document.getElementById("qr-result");
const outputData = document.getElementById("outputData");
const btnScanQR = document.getElementById("btn-scan-qr");

let scanning = false;






qrcode2.callback = (res) => {

    if (res) {
      outputData.innerText = res;
      scanning = false;
  
      video.srcObject.getTracks().forEach(track => {
        track.stop();
      });
  
      qrResult.hidden = false;
      btnScanQR.hidden = false;
      canvasElement.hidden = true;
    }
  };



  btnScanQR.onclick = () =>{

   
  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: "environment" } })
    .then(function(stream) {
      scanning = true;
      qrResult.hidden = true;
      btnScanQR.hidden = true;
      canvasElement.hidden = false;
      video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
      video.srcObject = stream;
      video.play();
      tick();
      scan();
    })
    .catch((e)=>{
      Swal.fire({
        icon:"warning",
        title:'Permission required',
        text: 'Allow camera access',
        confirmButtonColor: '#1c0d2e',
        footer:e
      })
    })
    
};


function tick() {
    canvasElement.height = video.videoHeight;
    canvasElement.width = video.videoWidth;
    canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
  
    scanning && requestAnimationFrame(tick);
  }


  function scan() {

    if(scanning==true){
      $("#stopScan").css("display","flex")
    }

    console.log("check")
    try {
      qrcode2.decode();
      
    } catch (e) {
      if(scanning==true){
        setTimeout(scan, 300);
      }

    }
  }

  function stopScan(){
    $("#btn-scan-qr").css("display","flex")
    $("#stopScan").css("display","none")

    outputData.innerText = '';
    scanning = false;

    video.srcObject.getTracks().forEach(track => {
      track.stop();
    });

    qrResult.hidden = false;
    btnScanQR.hidden = false;
    canvasElement.hidden = true;

  }