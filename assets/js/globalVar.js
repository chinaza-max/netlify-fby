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




function showModalError(val){
    $("#userErrorContent").text(val);
    $("#userErrorContent").attr({
        "class" : "alert alert-danger outline  text-center"
      });

    $('#userError').modal('show');
}

function hideModalError(){
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

