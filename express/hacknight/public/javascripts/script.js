function getCountTime(){
  var currDate = new Date();
  if (currDate.getHours() >= 22 || currDate.getHours() < 4){
    var minu = (60-currDate.getMinutes()).toString();
    if (minu.length < 2){
      minu="0"+minu;
    }
    var seco = (60-currDate.getSeconds()).toString();
    if (seco.length < 2){
      seco="0"+seco;
    }
    $('#timeTitle').html('Ends in');
    if (currDate.getHours() > 12){
      $('#timeCountDown').html('0'+(24-currDate.getHours()+4).toString() + ':'
        + minu + ':' + seco);
    }else{
      $('#timeCountDown').html('0'+(4-currDate.getHours()).toString() + ':'
        + minu + ':' + seco);
    }
  }else{
    var minu = currDate.getMinutes().toString();
    if (minu.length < 2){
      minu="0"+minu;
    }
    var seco = 60-currDate.getSeconds().toString();
    if (seco.length < 2){
      seco="0"+seco;
    }
    $('#timeTitle').html('Starts in');
    $('#timeCountDown').html((22-currDate.getHours()).toString() + ':'
       + minu + ':' + seco);
  }
}
window.requestAnimFrame = (function(){
  return function( callback ){
    window.setTimeout(callback, 1000);
  };
})();
function count(){
  getCountTime();
  requestAnimFrame(count);
}
count();