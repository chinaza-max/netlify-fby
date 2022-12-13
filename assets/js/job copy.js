let pending=0;
let active=0
let completed=0


$.ajax({
  type: "get", url: `${domain}/api/v1/job/myjobs`,
  headers: {
      "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
  },
  success: function (data, text) {
    //console.log(data)
    $(".jobLoader").css("display", "none");
    if(data.data.length > 0 ){
        for(let i=0; i<data.data.length;i++){

          if( data.data[i].status=="PENDING"){
            $("#pendingJob").append(
              `<div class="col-12 col-md-6">
              <div class="card bg-light">

                <div class="row">
                  <div class="col-7">
                    <div class="card-body">
                      <div class="text-nowrap">
                        <strong>${data.data[i].facility.name}</strong>
                      </div>
                      <div class="text-muted text-nowrap">${data.data[i].job_type}</div>
                    </div>
                  </div>
                  <div class="col-5">
                    <div class="card-body">
                      <div class="text-nowrap text-end">$ ${data.data[i].payment}</div>
                      <div class="text-muted text-nowrap text-end">${data.data[i].schedule[0].check_in_date}</div>
                    </div>
                  </div>

                  
                  <div class="col-12">
                    <div class="card-body">
                      <button class="btn btn-outline-primary mt-3" data-bs-toggle="modal" data-bs-target="#modalPending_${data.data[i].id}">View</button>
                      <button type="button" class="btn btn-primary mt-3" onclick="acceptDecline( ${data.data[i].id},true)">Accept </button>
                      <button type="button" class="btn btn-secondary mt-3" style="background-color:rgb(221, 51, 51)" onclick="acceptDecline( ${data.data[i].id},false)">Decline </button>
                    </div>
                  </div>
                </div>
               
              </div>
            </div>`);

            $("#modalContainer").append(
              ` <div class="modal fade" id="modalPending_${data.data[i].id}" tabindex="-1" role="dialog" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                    <i class="icofont-close-line"></i>
                  </button>
    
                  <div class="modal-header">
                    <h5 class="modal-title">Job detail</h5>
                  </div>
                  <div class="modal-body">
                    <main class="main-content mb-0">
                      <div class="app-loader"><i class="icofont-spinner-alt-4 rotate"></i></div>
                
                      <div class="main-content-wrap">
                        
                        <header class="page-header" style="clear: right;">
                          <h1 class="page-title"  style="clear: both;">${data.data[i].facility.name}</h1>
                        </header>
                        
                        <div class="page-content">
                
                
                          <!-- START PROJECT LOCATION -->
                          <figure>
                            <figcaption class="blockquote-footer">
                              <div class="card mb-md-0">
                                <div class="card-body">
                              
                                  <div class="row align-items-center">
                                    <div class="col col-auto">
                                      <div class="icon icofont-location-pin fs-30 text-muted"></div>
                                    </div>
                                    <div class="col">
                                      <div>Job Address</div>
                                      ${data.data[i].facility.location.address}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </figcaption>
                          </figure>
                
                          <hr>
                          <!-- END PROJECT LOCATION -->
                
                          <div class="card mb-0">
                            <div class="card-header">
                              Job reward
                            </div>
                            <div class="card-body">
                              <div class="table-responsive">
                                <table class="table table-bordered">
                                  <thead>
                                  <tr>
                                    <th scope="col">Potential Payout</th>
                                    <th scope="col">Per</th>
                                  </tr>
                                  </thead>
                                  <tbody>
                                
                                  <tr>
                                    <td>$ ${data.data[i].payment}</td>
                                    <td>Hour</td>
                                  </tr>
    
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
    
    
                          <!-- START JOB SCHEDULE -->
                          <div class="card">
                            <div class="card-header">
                                Job schedule
                            </div>
                            <div class="card-body">
                              <div class="table-responsive">
                                <table class="table table-bordered table-sm">
                                  <thead>
                                  <tr>
                                    <th scope="col" class="text-nowrap">Start Date</th>
                                    <th scope="col" class="text-nowrap">Start Time</th>
                                    <th scope="col" class="text-nowrap">End Time</th>
                                  </tr>
                                  </thead>
                                  <tbody id="pendingscheduleTable${i}">
                                     
                                  </tbody>
                                 
                                </table>
                              </div>
                              
                            </div>
                            
                            <div class="card-body">
                              <div class="alert alert-light outline text-dark" role="alert">
                                Job type:<strong> ${data.data[i].job_type}</strong>
                              </div>
                              
                            </div>
    
                          </div>
                          <!-- END JOB SCHEDULE -->
                
                          <!-- END PROJECT EVENT -->
                
    
                
                        </div>
              
                      </div>
                    </main>
                
                  </div>
                  <div class="modal-footer">
                    <div class="actions">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" class="btn btn-primary">Accept </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>`);

          }
          else if(data.data[i].status=="ACTIVE"){
            $("#activeJob").append(
              `<div class="col-12 col-md-6">
              <div class="card bg-light">

                <div class="row">
                  <div class="col-7">
                    <div class="card-body">
                      <div class="text-nowrap">
                        <strong>${data.data[i].facility.name}</strong>
                      </div>
                      <div class="text-muted text-nowrap">${data.data[i].job_type}</div>
                    </div>
                  </div>
                  <div class="col-5">
                    <div class="card-body">
                      <div class="text-nowrap text-end">$ ${data.data[i].payment}</div>
                      <div class="text-muted text-nowrap text-end">${data.data[i].schedule[0].check_in_date}</div>
                    </div>
                  </div>

                  
                  <div class="col-12">
                    <div class="card-body">
                      <a onclick="setJobDetail(${data.data[i].id})" href="jobDetails.html" class="btn btn-outline-primary mt-3">View</a>
                     
                    </div>
                  </div>
                </div>
               
              </div>
            </div>`);
          }
          else if(data.data[i].status=="COMPLETED"){

          }
          if(i==data.data.length-1){
            $("#pendingJob").append(
              `<nav aria-label="...">
              <ul class="pagination">
                <li class="page-item disabled item2" onclick="nextfilter(0,'item2')" >
                  <span class="page-link">Previous</span>
                </li>
                <li class="page-item item2" onclick="nextfilter(1,'item2')"><a class="page-link" href="#">1</a></li>
                <li class="page-item active item2" onclick="nextfilter(2,'item2')">
                  <span class="page-link">
                    2
                    <span class="sr-only">(current)</span>
                  </span>
                </li>
                <li class="page-item item2" onclick="nextfilter(3,'item2')"><a class="page-link" href="#">3</a></li>
                <li class="page-item item2" onclick="nextfilter(4,'item2')">
                  <a class="page-link" href="#">Next</a>
                </li>
              </ul>
            </nav> `)
        
            $("#activeJob").append(
              `<nav aria-label="...">
              <ul class="pagination">
                <li class="page-item item1 disabled"  onclick="nextfilter(0,'item1') ">
                  <span class="page-link">Previous</span>
                </li>
                <li class="page-item item1" onclick="nextfilter(1,'item1')"><a class="page-link" href="#">1</a></li>
                <li class="page-item active item1" onclick="nextfilter(2,'item1')">
                  <span class="page-link">
                    2
                    <span class="sr-only">(current)</span>
                  </span>
                </li>
                <li class="page-item item1" onclick="nextfilter(3,'item1')"><a class="page-link" href="#" >3</a></li>
                <li class="page-item item1" onclick="nextfilter(4,'item1')">
                  <a class="page-link" href="#">Next</a>
                </li>
              </ul>
            </nav> `);
          
          }
        }


        //this loop handles schedules for above jobs
        for(let i=0; i<data.data.length;i++){

          if( data.data[i].status=="PENDING"){
            for(let j=0; j<data.data[i].schedule.length;j++){
                
              $(`#pendingscheduleTable${i}`).append(
                  ` 
                  <tr>
                      <td> ${data.data[i].schedule[j].check_in_date}</td>
                      <td>${data.data[i].schedule[j].start_time}</td>
                      <td>${data.data[i].schedule[j].end_time}</td>
                  </tr>
                  `
              );
              
            }
          }
        
        }

    }
    else{
        $("#pendingJob").append(`
        <div class="alert alert-warning outline" role="alert">
           No pending  job
        </div>
        `)
    }
  },
  error: function (request, status, error) {
      localStorage.removeItem("myUser");
      window.location.replace('https://sunny-kataifi-7adb6f.netlify.app/sign-in.html')
     // window.location.replace('/sign-in.html')
  }
});























function setJobDetail(val){
  localStorage.setItem("viewedJobID",val)
}


function nextfilter(val,myClass){

  let element = document.querySelectorAll(`.${myClass}`);
  element.forEach((e)=>{
    e.classList.remove("active");
  })

  element[val].classList.add('active');
}


function acceptDecline(id,val){

  if(val==false){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1c0d2e',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Decline it!'
    }).then((result) => {

      if(result.isConfirmed==true){
        $.ajax({
          type: "post", url: `${domain}/api/v1/job/accept-decline-job`,
          data: {
            job_id:id,
            accept:val
          },
          headers: {
            "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
          },
          success: function (data, text) {
            if (data.status==200) {
              Swal.fire(
                'Declined!',
                'success'
              )

              window.location.reload();
            }
          },
          error: function (request, status, error) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
              footer: `${ $(JSON.parse(request.responseText).message)}`
            })
          }
        });
      }
     
    })

  }else{

    $.ajax({
      type: "post", url: `${domain}/api/v1/job/accept-decline-job`,
      data: {
        job_id:id,
        accept:val
      },
      headers: {
        "Authorization": `Bearer ${atob(localStorage.getItem("myUser"))}`
      },

      success: function (data, text) {
        if (data.status==200) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your job has been activated',
            showConfirmButton: false,
            timer: 1500
          })
          window.location.reload();
        }
      },
      error: function (request, status, error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: `${ $(JSON.parse(request.responseText).message)}`
        })
      }
    });
  }
}
