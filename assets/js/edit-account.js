
$.ajax({
    type: "get", url: "https://fby-security.herokuapp.com/api/v1/auth/",
    headers: {
        "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
    },
    success: function (data, text) {
        

        //console.log(data)
        $("#profile2").attr("src",data.data.user.image);
        $("#firstName").val(data.data.user.first_name);
        $("#lastName").val(data.data.user.last_name);
        $("#email").val(data.data.user.email);
        $("#address").val(data.data.user.address);
        $("#dataOfBirth").val(data.data.user.date_of_birth);


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
            $('select[name=gender]').val("male");
            $('.selectpicker').selectpicker('refresh')
        }
        else{
           $('select[name=gender]').val("female");
           $('.selectpicker').selectpicker('refresh')
        }

    },
    error: function (request, status, error) {
        localStorage.removeItem("myUser");
        
        window.location.replace('https://sunny-kataifi-7adb6f.netlify.app/sign-in.html')
      //  window.location.replace('/sign-in.html')

    }
  });