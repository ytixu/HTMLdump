var nextBlock;

function clickBlock(block){
  if (window.innerWidth <= 768) return;
  if (nextBlock == block.id){
    if (!$("#displayer").is( ":hidden" )){
      unhightlight();
      $("#displayer").slideUp("fast");
    }else{
      hightlight();
      $("#displayer").slideDown("fast");
    }
    return;
  }
  unhightlight();
  nextBlock = block.id;
  hightlight();
  if (!$("#displayer").is( ":hidden" )){
    $("#displayer").slideUp("fast", function(){
      changeText();
    });
  }else{
    changeText();
    
  }
}

function hightlight(){
  $("#"+nextBlock).css({
    "border-bottom": "solid 8px"
  });
}

function unhightlight(){
  $("#"+nextBlock).css({
    "border-bottom": "transparent 8px"
  });
}

function changeText(){
  $("#showIfBigScreen").html($("#"+nextBlock).find(".doNotShowIfBigScreen").html());
  $("#displayer").slideDown("fast");
}
