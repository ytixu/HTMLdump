var nextBlock;

function clickBlock(block){
  if (window.innerWidth <= 768) return;
  $("#"+nextBlock).css({
    "border-bottom": "transparent 8px"
  });
  nextBlock = block.id;
  $("#"+nextBlock).css({
    "border-bottom": "solid 8px"
  });
  if (!$("#displayer").is( ":hidden" )){
    $("#displayer").slideUp("fast", function(){
      changeText();
    });
  }else{
    changeText();
    
  }
}
function changeText(){
  $("#showIfBigScreen").html($("#"+nextBlock).find(".doNotShowIfBigScreen").html());
  $("#displayer").slideDown("fast");
}
