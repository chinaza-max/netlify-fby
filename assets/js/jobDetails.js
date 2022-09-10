let  sizeSwitch =175;
let switchHandle = $('#switch .handle');
let switchHandle2 = $('#switch2 .handle');
let switchArea =  $('#switch');
let switchArea2 =  $('#switch2');

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
      
    }
  }
/*
reference 

https://codepen.io/stevenfabre/pen/OJgoOp
*/