const password=document.getElementById("password")
const updateUser=document.getElementById("updateUser")

password.addEventListener("click" ,()=>{

    $.ajax({
        type: "post", url:`${domain}/api/v1/auth/send-password-reset-link`,
        data: {
            email:userEmail,
        },
        success: function (data, text) {

            showModalEmailPasswordReset(data.message)
            setTimeout(() => {
                hideModalEmailPasswordReset()
            }, 3000);

        },
        error: function (request, status, error) {

            if(request.responseJSON.status=="conflict-error"){
                //console.log(request.responseJSON.message)
                showModalError(request.responseJSON.message)
                setTimeout(() => {
                    hideModalError()
                }, 3000);
            }
            else if(request.responseJSON.status=="validation-error"){
                //console.log(request.responseJSON.errors.message)
                showModalError(request.responseJSON.errors[0].message)
                setTimeout(() => {
                    hideModalError()
                }, 3000);
            }
            else if(request.responseJSON.status=="server-error"){
                //console.log(request.responseJSON.message)
                showModalError(request.responseJSON.message)
                setTimeout(() => {
                    hideModalError()
                }, 3000);
            }
            else if(request.responseJSON.status=="bad-request-error"){
              //console.log(request.responseJSON.message)
              showModalError(request.responseJSON.message)
              setTimeout(() => {
                  hideModalError()
              }, 3000);
              logUserOut()
          }
         
        }
      });
})





updateUser.addEventListener("submit",(e)=>{
    e.preventDefault()
    $("#signInButton").css("display","none")
    $("#loadingButton").css("display","block")


    const formData=new FormData()
    const inputFile = document.getElementById("profilePicturePath");

    const form = e.target;
    const formFields = form.elements,
    first_name = formFields.firstName.value,
    last_name=formFields.lastName.value,
    email=formFields.email.value,
    gender=formFields.gender.value,
    date_of_birth=formFields.dataOfBirth.value,
    address=formFields.address.value;
    phoneNumber=formFields.phoneNumber.value;



    for (const file of inputFile.files) {
        formData.append("image", file);
        //console.log(file)
    }

    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("email", email);
    formData.append("date_of_birth", date_of_birth);
    formData.append("gender", gender);
    formData.append("address",address);
    formData.append("phone_number",phoneNumber);

        for (const value of formData.values()) {
           // console.log(value);
          }


          fetch(`${domain}/api/v1/user/updateProfile`, {
                method: 'PUT',
                headers: {
                    "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
                },
                body:formData,
                })
                .then((response) => response.json())
                .then((data) => {
                 //   console.log('Success:', data);

                    $("#signInButton").css("display","block")
                    $("#loadingButton").css("display","none")

                    if(data.status==200){
                        getProfileData()
                        showModalSuccess(data.message  )
                        setTimeout(() => {
                            hideModalSuccess()
                        }, 3000);
                    }
                    else if(data.status=="conflict-error"){
                        console.log(data.message)
                        showModalError(data.message)
                        setTimeout(() => {
                            hideModalError()
                        }, 3000);
                    }
                    else if(data.status=="validation-error"){
                       // console.log(data.errors.message)
                        showModalError(data.errors[0].message)
                        setTimeout(() => {
                            hideModalError()
                        }, 3000);
                    }
                    else if(data.status=="server-error"){
                       // console.log(data.message)
                        showModalError(data.message)
                        setTimeout(() => {
                            hideModalError()
                        }, 3000);
                    }
                    else if(data.status=="bad-request-error"){
                     //   console.log(data.message)
                        showModalError(data.message)
                        setTimeout(() => {
                            hideModalError()
                        }, 3000);
                    }
                    else if(data.status=="notFound-error"){
                      //  console.log(data.message)
                        showModalError(data.message)
                        setTimeout(() => {
                            hideModalError()
                        }, 3000);
                    }

                })
                .catch((error) => {
                    console.error('Error:', error);
                })


})




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


function showModalEmailPasswordReset(val){
    $("#PasswordResetInfoContent").text(val);
    $("#PasswordResetInfoContent").attr({
        "class" : "alert  alert-success  outline  text-center"
      });

    $('#PasswordResetInfo').modal('show');
}

function hideModalEmailPasswordReset(){
    $('#PasswordResetInfo').modal('hide');
}

function checkImg(e){
    document.getElementById('avatar2').src = window.URL.createObjectURL(e.files[0])
}




let getProfileData

$(document).ready(function(){

    //update user profile
getProfileData=function(){
    $.ajax({
        type: "get", url:`${domain}/api/v1/auth`,
        headers: {
            "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
        },
        success: function (data, text) {
            
    
    
            localStorage.setItem('userDetails', btoa(JSON.stringify(data.data.user)));
    
            $("#avatar").attr("src",data.data.user.image);
            $("#avatar2").attr("src",data.data.user.image);
            $("#firstName").val(data.data.user.first_name);
            $("#lastName").val(data.data.user.last_name);
            $("#email").val(data.data.user.email);
            $("#address").val(data.data.user.address);
            $("#dataOfBirth").val(data.data.user.date_of_birth);
            $("#phoneNumber").val(data.data.user.phone_number);
    
    
           // console.log(data.data.user.is_archived)
            if(data.data.user.is_archived==true){
                $('select[name=status]').val("Available");
                 $('.selectpicker').selectpicker('refresh')
            }
            else{
                
                 $('select[name=status]').val("notAvailable");
                 $('.selectpicker').selectpicker('refresh')
            
            }
            
            if(data.data.user.gender=="MALE"){
                $('select[name=gender]').val("MALE");
                $('.selectpicker').selectpicker('refresh')
            }
            else if(data.data.user.gender=="FEMALE"){
               $('select[name=gender]').val("FEMALE");
               $('.selectpicker').selectpicker('refresh')
            }
    
        },
        error: function (request, status, error) {
            localStorage.removeItem("myUser");
            
          //  window.location.replace('https://sunny-kataifi-7adb6f.netlify.app/sign-in.html')
          //  window.location.replace('/sign-in.html')
          window.location.href =window.location.toString().split('/')[0] + "/dist/sign-in.html"
        }
      });
}

getProfileData()
})










licenceFile.onchange = function() {

    
    
    if(this.files[0].size > 2097152){
        generalError("File is too big!")
       this.value = "";
    };
};

$("#formLicence").on("submit", (event) => {

    event.preventDefault();
    const formData=new FormData()
    const expiryDate = document.getElementById("expiryDate");
    const inputFile = document.getElementById("licenceFile");
    
     // console.log(expiryDate)


    for (const file of inputFile.files) {
        formData.append("files", file);
       // console.log(file)
    }


 


})