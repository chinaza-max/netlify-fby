let mode="development"
let domain=''
let myGuard_id= atob(localStorage.getItem("guard_id"))  
let myActiveJob_id=localStorage.getItem("viewedJobID")
let viewedJobStatus=localStorage.getItem("JobStatus")
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