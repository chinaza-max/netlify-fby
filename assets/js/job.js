

document.getElementById("SpecialInstruction1").style.display="none"
document.getElementById("SpecialInstruction2").style.display="none"
document.getElementById("SpecialTask1").style.display="none"
document.getElementById("SpecialTask2").style.display="none"




document.getElementById("SpecialInstructionType").addEventListener("change", function() {

  if(this.value=="Repeat"){
    document.getElementById("SpecialInstruction2").style.display="block";
    document.getElementById("SpecialInstruction1").style.display="none";

  }
  else if(this.value=="manually"){
    document.getElementById("SpecialInstruction1").style.display="block";
    document.getElementById("SpecialInstruction2").style.display="none";
  }
  else{
    document.getElementById("SpecialInstruction1").style.display="none";
    document.getElementById("SpecialInstruction2").style.display="none";
  }

});

document.getElementById("SpecialTaskType").addEventListener("change", function() {

  if(this.value=="Repeat"){
    document.getElementById("SpecialTask1").style.display="block";
    document.getElementById("SpecialTask2").style.display="none";

  }
  else if(this.value=="manually"){
    document.getElementById("SpecialTask2").style.display="block";
    document.getElementById("SpecialTask1").style.display="none";
  }
  else{
    document.getElementById("SpecialTask1").style.display="none";
    document.getElementById("SpecialTask2").style.display="none";
  }

});







function displayNone(){
  document.querySelector(".StartTimeEndTime").style.display="none";
  document.querySelector(".StartDateEndDate").style.display="none";
  document.querySelector(".dateTime").style.display="none";
  document.querySelector(".startDate").style.display="none";  
  document.querySelector("#JobTypeOccurance").style.display="none";
document.querySelector("#Recurring").style.display="none";
document.querySelector("#manually").style.display="none";
}
  
displayNone()

document.getElementById("JobTypeSelect").addEventListener("change", function() {
 
  console.log( document.getElementById("JobTypeOccuranceType").selectedIndex)
  //document.getElementById("JobTypeOccuranceType").selectedIndex=1;
  displayNone()
  if(this.value=="Instant"){
    document.querySelector(".startDate").style.display="block";
    document.querySelector(".StartTimeEndTime").style.display="flex";
  }
  else if(this.value=="Ongoing"){
    document.querySelector(".startDate").style.display="block";  
    document.querySelector("#JobTypeOccurance").style.display="block";  
    document.querySelector(".StartTimeEndTime").style.display="flex";
  }
  else if(this.value=="Temporary"){

    document.querySelector(".StartDateEndDate").style.display="flex";
    document.querySelector("#JobTypeOccurance").style.display="block";  
    document.querySelector(".StartTimeEndTime").style.display="flex";
  }
  else if(this.value=="Permanent"){
    
    document.querySelector(".startDate").style.display="flex";
    document.querySelector("#JobTypeOccurance").style.display="block";  
    document.querySelector(".StartTimeEndTime").style.display="flex";
  }
 
});


document.getElementById("JobTypeOccuranceType").addEventListener("change", function() {
  
  if(this.value=="Occurance"){
    document.querySelector("#Recurring").style.display="block";
    document.querySelector("#manually").style.display="none";
  }
  else if(this.value=="Manually"){
    document.querySelector("#Recurring").style.display="none";
    document.querySelector("#manually").style.display="block";
  }
  else{
    document.querySelector("#manually").style.display="none";
    document.querySelector("#Recurring").style.display="none";

  }

});