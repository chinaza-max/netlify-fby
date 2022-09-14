var minDate, maxDate
var customerName='';
var Site='';
 

// Custom filtering function which will search data in column four between two values
$.fn.dataTable.ext.search.push(
    function( settings, data, dataIndex ) {
        var min = minDate.val();
        var max = maxDate.val();
        var date = new Date( data[0] );
        

        if (
            ( min === null && max === null ) ||
            ( min === null && date <= max ) ||
            ( min <= date  && max === null ) ||
            ( min <= date  && date <= max )
        ) {
            return true;
        }
        return false;
    }
);

$.fn.dataTable.ext.search.push(
    function( settings, data, dataIndex ) {
        
        var customerNameVT = data[3];
        var SiteVT = data[4] ;
        
        if ((customerName ==='')&&(Site ==='' )
        ) {
            return true;
        }
        else if((customerName===customerNameVT)&&(Site==='')){
            return true
        }
        else if((customerName===customerNameVT)&&(Site===SiteVT)){
            return true
        }
        else if((customerName==='')&&(Site===SiteVT)){
            return true
        }
        else if((customerName==='')&&(Site===SiteVT)){
            return true
        }
        else if((customerName==='')&&(Site==='')){
            return true
        }
        else if((customerName===customerNameVT)&&(Site==='')){
            return true
        }
        else if((customerName===customerNameVT)&&(Site===SiteVT)){
            return true
        }
        
            return false;
    }
);

$(document).ready(function() {

    var table = $('#example').DataTable( {
        rowReorder: {
            selector: 'td:nth-child(2)'
        },
        responsive: true
    } );
    // Create date inputs

    minDate = new DateTime($('#min'), {
        format: 'MMMM Do YYYY'
    });
    maxDate = new DateTime($('#max'), {
        format: 'MMMM Do YYYY'
    });
 
    // DataTables initialisation
    var table = $('#example').DataTable();
      
   setTimeout(()=>{
    $('#example td').map(function(i, cell) {
        var cellContent = $(cell).text();
        //console.log(cellContent);  // for demonstration
       // if (cellContent === 'Tokyo') $(cell).css('background-color', '#ccc');
    });
   },200)
   
    // Refilter the table
    $('#min, #max').on('change', function () {
        table.draw();
    });
    $('#Site').on('change', function (e) {
        Site=this.value
        table.draw();
    });
    $('#customerName').on('change', function (e) {
        customerName=this.value
        table.draw();
    });
});

