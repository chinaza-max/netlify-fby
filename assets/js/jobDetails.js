let  sizeSwitch =175;
let switchHandle = $('#switch .handle');
let switchHandle2 = $('#switch2 .handle');
let switchArea =  $('#switch');
let switchArea2 =  $('#switch2');
let dateIndex=0;
let mySchedule=[0]

switchHandle.draggable({
  axis: 'x',
  containment: 'parent',
  stop: function() {
    conditionMove();
  }
});



switchHandle2.draggable({
    axis: 'x',
    containment: 'parent',
    stop: function() {
      conditionMove2();
    }
  });

function conditionMove() {
  if(parseInt(switchHandle.css('left')) <= (sizeSwitch / 2)) {
    switchHandle.animate({
      left: 0
    }, 100);
  }
  else {
    switchHandle.animate({
      left: sizeSwitch + 'px'
    }, 100);

    for(let k=0; k<mySchedule.length;k++){
           
      if(isSameDate(new Date(mySchedule[k].check_in_date), new Date())){
        
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition, () => {

           
            Swal.fire({
              title: 'Action Required',
              text: "Location permission is required to proceed!",
              icon: 'warning',
              confirmButtonColor: '#1c0d2e',
              confirmButtonText: 'ok'
            })

            switchHandle.animate({
              left: 0
            }, 100);
        
          });
          
        } else { 
          console.log("Geolocation is not supported by this browser.")
        }
        function showPosition(position) {
         
          $.ajax({
            type: "post", url: "https://fby-security.herokuapp.com/api/v1/job/check-in",
            data: {
              operation_id:mySchedule[k].operations.id,
              check_in: true,
              latitude: position.coords.latitude,
              longitude:position.coords.longitude
            },
            headers: {
              "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
            },
            success: function (data, text) {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'successfully checked in',
                showConfirmButton: false,
                timer: 1500
              })

              switchHandle.animate({
                left: 0
              }, 100);
            },
            error: function (request, status, error) {

              console.log(request.responseJSON.message)
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: request.responseJSON.message,
               
              })
              switchHandle.animate({
                left: 0
              }, 100);
            }
          });
    
        }
        return
      }

      if(k==mySchedule.length-1){
        Swal.fire({
          title: 'Not yet time',
          confirmButtonColor: '#1c0d2e',
          confirmButtonText: 'ok'
        })
        switchHandle.animate({
          left: 0
        }, 100);
      }
      
    }

   
  }
}


function conditionMove2() {
    if(parseInt(switchHandle2.css('left')) <= (sizeSwitch / 2)) {
      switchHandle2.animate({
        left: 0
      }, 100);
      
    }
    else {
      switchHandle2.animate({
        left: sizeSwitch + 'px'
      }, 100);
      

      for(let k=0; k<mySchedule.length;k++){
        if(isSameDate(new Date(mySchedule[k].check_in_date), new Date())){
          
          if (navigator.geolocation) {
            
            navigator.geolocation.getCurrentPosition(showPosition, () => {

           
              Swal.fire({
                title: 'Action Required',
                text: "Location permission is required to proceed!",
                icon: 'warning',
                confirmButtonColor: '#1c0d2e',
                confirmButtonText: 'ok'
              })
          
            })
          } else { 
            console.log("Geolocation is not supported by this browser.")
          }
          function showPosition(position) {
           
     
            $.ajax({
              type: "post", url: "https://fby-security.herokuapp.com/api/v1/job/check-in",
              data: {
                operation_id:mySchedule[k].operations.id,
                check_in: false,
                latitude: position.coords.latitude,
                longitude:position.coords.longitude
              },
              headers: {
                "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
              },
              success: function (data, text) {
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'successfully checked out',
                  
                  showConfirmButton: false,
                  timer: 1500
                })

                switchHandle2.animate({
                  left: 0
                }, 100);

              },
              error: function (request, status, error) {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: request.responseJSON.message,
                 
                })

                switchHandle2.animate({
                  left: 0
                }, 100);
              }
            });
      
          }

          return
        }
        if(k==mySchedule.length-1){
          Swal.fire({
            title: 'Not yet time',
            confirmButtonColor: '#1c0d2e',
            confirmButtonText: 'ok'
          })

          switchHandle2.animate({
            left: 0
          }, 100);

        }
      }
  }
}

  $.ajax({
    type: "get", url: "https://fby-security.herokuapp.com/api/v1/job/myjobs",
    headers: {
        "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
    },
    success: function (data, text) {

      $(".jobLoader").css("display", "none");
      for(let i=0; i<data.data.length;i++){
       
        if(data.data[i].id==localStorage.getItem("viewedJobID")){
      
          $("#myPageTitle").text(data.data[i].facility.name);
          $("#address").text(data.data[i].facility.location.address);
          
          $("#amountPerHour").text(data.data[i].payment);
          $("#hoursWorked").text(data.data[i].statistics.hours_worked);
          $("#earned").text(data.data[i].statistics.payment);

          $("#date").append(
            ` 
            <tr>
                <td class="text-nowrap"> ${data.data[i].schedule[0].check_in_date}</td>
                <td >${data.data[i].schedule[0].start_time}</td>
                <td class="text-nowrap">${data.data[i].schedule[data.data[i].schedule.length-1].check_in_date}</td>
                <td >${data.data[i].schedule[data.data[i].schedule.length-1].end_time}</td>
            </tr>
            `
          );
          $("#description").append(
            ` 
              <div class="custom-control custom-checkbox mb-3">
                <input type="checkbox" class="custom-control-input" id="customCheck1">
                <label class="custom-control-label" for="customCheck1">${data.data[i].description}</label>
              </div>
            `
          );

          
          //let countDownDate = new Date(data.data[i].schedule[dateIndex].check_in_date).getTime();

          mySchedule=data.data[i].schedule
          startCountDown()
   
          $("#jobType").text(data.data[i].job_type);


          for(let j=0; j<data.data[i].schedule.length;j++){
                
            $(`#scheduleTable`).append(
                ` 
                <tr>
                  <td>${data.data[i].schedule[j].check_in_date}</td>
                  <td>${data.data[i].schedule[j].start_time}</td>
                  <td>${data.data[i].schedule[j].end_time}</td>
                </tr>
                `
            )
          }
          return
        }
      }
    
    },
    error: function (request, status, error) {
        localStorage.removeItem("myUser");
        //window.location.replace('https://sunny-kataifi-7adb6f.netlify.app/sign-in.html')
        window.location.replace('/sign-in.html')
    }
  });


  function isSameDate(date1, date2){

    if(date1.getDay()==date2.getDay()&&
      date1.getMonth()==date2.getMonth()&&
      date1.getFullYear()==date2.getFullYear()){
        return true
    }

    else{
      return false
    }

  }


 function startCountDown(){

    for(let i=0; i<mySchedule.length; i++){

     // mySchedule[i].check_in_date
      let countDownDate = new Date(mySchedule[i].check_in_date).getTime();
      let now = new Date().getTime();
      let distance = countDownDate - now;
      if (distance < 0) {
        continue
      }
      else{

        let x = setInterval(function() {

           countDownDate = new Date(mySchedule[i].check_in_date).getTime();
           now = new Date().getTime();
           distance = countDownDate - now;

          // Time calculations for days, hours, minutes and seconds
          let days = Math.floor(distance / (1000 * 60 * 60 * 24));
          let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          let seconds = Math.floor((distance % (1000 * 60)) / 1000);
          

          // Output the result in an element with id="demo"
          if(days<0||hours<0||minutes<0||seconds<0){}
          else{ 
            $("#days").text(days);
            $("#hours").text(hours);
            $("#minute").text(minutes);
            $("#second").text(seconds);
          }
          
          // If the count down is over, write some text 
          if (distance < 0) {

        
            if(mySchedule.length-1>dateIndex){
            //  dateIndex++;
             // countDownDate = new Date(data.data[i].schedule[dateIndex].check_in_date).getTime();
              
            }
            else{

              $("#days").text(00);
              $("#hours").text(00);
              $("#minute").text(00);
              $("#second").text(00);
              clearInterval(x);
            
            }
           
          }
        }, 1000)

          break
      }
    }
 }



 const sendMessage=document.getElementById("sendMessage")
 const openCamera=document.getElementById("openCamera")

 document.getElementById("sendMessage").addEventListener("click", ()=>{

    let myMessage=document.getElementById("myMessage").value
    document.getElementById("myMessage").value=''
    let nodes=document.querySelectorAll(".chat-msg")
    let nodes2=document.querySelectorAll(".chat-msg .chat-msg-content")

    if(nodes.length==0){
    }
    else{
      let classNames=nodes[nodes.length- 1].classList

      if(classNames[classNames.length-1]=="owner"){

        $($(".chat-msg .chat-msg-content")[nodes2.length- 1]).append(
          `<div class="chat-msg-text">${myMessage}</div>
          `
        )
      
      }
 
      else{

        $("#chat-area-main-id").append(
          ` <div class="chat-msg owner">
          <div class="chat-msg-profile">
            <img class="chat-msg-img" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%281%29.png" alt="" />
            <div class="chat-msg-date">Message seen 1.22pm</div>
          </div>
          <div class="chat-msg-content">
            <div class="chat-msg-text">${myMessage}</div>
          </div>
        </div> `)
  
      }

    }
    sendMessage.style.display="none"
    openCamera.style.display="block"
    smoothScroll(document.getElementById('chatContainer'))
});








function checkImg(e){

  $(document).ready(function(){
    $("#preUploadImage").modal('show');
  });
  document.getElementById('preUploadImageTitle').innerHTML=e.files[0].name
  document.getElementById('myPreUploadImage').src = window.URL.createObjectURL(e.files[0])

}

function postAttachment(){

    const attachment= document.getElementById("attachment");
  
    let src=window.URL.createObjectURL(attachment.files[0])

    let nodes=document.querySelectorAll(".chat-msg")
    let nodes2=document.querySelectorAll(".chat-msg .chat-msg-content")

    if(nodes.length==0){
    }
    else{
      let classNames=nodes[nodes.length- 1].classList

      if(classNames[classNames.length-1]=="owner"){

        $($(".chat-msg .chat-msg-content")[nodes2.length- 1]).append(
          `<div class="chat-msg-text">
            <img src=${src} />
          </div>
          `
        )
      
      }
 
      else{

        $("#chat-area-main-id").append(
          ` <div class="chat-msg owner">
          <div class="chat-msg-profile">
            <img class="chat-msg-img" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/3364143/download+%281%29.png" alt="" />
            <div class="chat-msg-date">Message seen 1.22pm</div>
          </div>
          <div class="chat-msg-content">
            <div class="chat-msg-text">
            <img src=${src} />
            </div>
          </div>
        </div> `)
  
      }

    }
    smoothScroll(document.getElementById('chatContainer'))
}





sendMessage.style.display="none"
document.getElementById("myMessage").addEventListener('input', function (evt) {

    if(this.value==""){
      sendMessage.style.display="none"
      openCamera.style.display="block"
    }
    else{
      sendMessage.style.display="block"
      openCamera.style.display="none"
    }


});



/*
    Reference 

    https://codepen.io/stevenfabre/pen/OJgoOp
*/