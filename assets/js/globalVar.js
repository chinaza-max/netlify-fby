let mode="development"
let domain=''
let myGuard_id= atob(localStorage.getItem("guard_id"))  
let myActiveJob_id=localStorage.getItem("viewedJobID")
let viewedJobStatus=localStorage.getItem("JobStatus")
let alertLifeSpan =1500
console.log(viewedJobStatus)

if(mode=="development"){
    domain="http://localhost:3000"
}
else{
    domain=''
}



function setGuardId(val){
    const encodedData = btoa(val); // encode a string
    localStorage.setItem("guard_id", encodedData)
}



function updateJobStatus(val){

    localStorage.setItem("JobStatus",val)
}




function analyzeError(request){
    if(request.responseJSON.status=="conflict-error"){
        console.log(request.responseJSON.message)
        showModalError(request.responseJSON.message)
        setTimeout(() => {
            hideModalError()
        }, alertLifeSpan);
    }
    else if(request.responseJSON.status=="validation-error"){
        console.log(request)
        console.log(request.responseJSON.errors.message)
        showModalError(request.responseJSON.errors[0].message)
        setTimeout(() => {
            hideModalError()
        }, alertLifeSpan);
    }
    else if(request.responseJSON.status=="server-error"){
        console.log(request.responseJSON.message)
        showModalError(request.responseJSON.message)
        setTimeout(() => {
            hideModalError()
        }, alertLifeSpan);
    }
    else if(request.responseJSON.status=="bad-request-error"){
        console.log(request.responseJSON.message)
        showModalError(request.responseJSON.message)
        setTimeout(() => {
            hideModalError()
        }, alertLifeSpan);
        logUserOut()
    }
    else if(request.responseJSON.status=="notFound-error"){
        console.log(request.responseJSON.message)
        showModalError(request.responseJSON.message)
        setTimeout(() => {
            hideModalError()
        }, alertLifeSpan);
    }
}



function generalError(val){
    showModalError(val)

    setTimeout(() => {
        hideModalError()
    }, alertLifeSpan);
}








function showModalError(val){
    $("#userErrorContent").text(val);
    $("#userErrorContent").attr({
        "class" : "alert alert-danger outline  text-center"
      });

    $('#userError').modal('show');
}

function hideModalError(){

    console.log("called called called")
    $('#userError').modal('hide');
}



function showModalSuccess(val){
    $("#userSuccessContent").text(val);
    $("#userSuccessContent").attr({
        "class" : "alert alert-success outline  text-center"
      });
    $('#userSuccess').modal('show');

    setTimeout(() => {
       hideModalSuccess()
    }, alertLifeSpan);
}


function hideModalSuccess(){
    $('#userSuccess').modal('hide');
}


let userDeatils=''
let userEmail=''
if(localStorage.getItem("userDetails")!=null){

userDeatils=JSON.parse(atob(localStorage.getItem("userDetails")))
    userEmail=userDeatils.email
    $("#avatar").attr("src",userDeatils.image);

}


$(document).ready(function(){
    let value=localStorage.getItem("setRTopNavColor")
    if(value=="true"){
        setTimeout(() => {
            $("#topbar").click()
        }, 1000);
    }


    let value2=localStorage.getItem("setLeftNavColor")
    console.log(value2)
    if(value2=="true"){
        setTimeout(() => {
            $("#sidebar").click()
        }, 1000);
    }

})


let checkbox=document.querySelector("#topbar")
checkbox.addEventListener('change', function() {
    checkbox.addEventListener('change', function() {
        if (this.checked) {
        localStorage.setItem("setRTopNavColor",true)
        console.log("is checked ")


        } else {
            console.log("is checked ")

        localStorage.setItem("setRTopNavColor",false)
        }
    });
  });



let checkbox2=document.querySelector("#sidebar")
checkbox2.addEventListener('change', function() {
    checkbox2.addEventListener('change', function() {
        if (this.checked) {
        localStorage.setItem("setLeftNavColor",true)
        console.log("is checked ")

        } else {

       console.log("not checked ")
        localStorage.setItem("setLeftNavColor",false)

        }
    });

  });



