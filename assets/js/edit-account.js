

console.log(atob(localStorage.getItem("myUser")))


$.ajax({
    "async": true,
    "crossDomain": true,
    "url": "https://fby-security.herokuapp.com/api/v1/auth/",
    "method": "GET",
    "headers": {
        "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
    }
}).done(function (data) {
    console.log(data)
    if(data.status==200){
        $("#myImg").src=data.data.image;
        $("#firstName").val(data.data.first_name);
        $("#lastName").val(data.data.last_name);
        $("#email").val(data.data.email);
        $("#address").val(data.data.address);
        $("#dataOfBirth").val(data.data.date_of_birth);

        /*
        if(data.data.is_archived==true){
            $("#status").options.selectedIndex = 0;
        }
        else{
            $("#status").options.selectedIndex = 1;
        }

        if(data.data.gender=="MALE"){
            $("#gender").options.selectedIndex = 0;
        }
        else{
            $("#gender").options.selectedIndex = 1;
        }
*/
    }
    else{
        localStorage.removeItem("myUser");
        window.location.replace('/dist/sign-in.html')
    }

})