$(".col-md-2.hoverBlocks").hover(function(){
  this.css({
      "background-color":"#333333",
      "color":"#ffffff",
      "padding":"+=5px"
    });
}, function(){
  this.animate({
      "background-color":"white",
      "color":"black",
      "padding":"-=5px"
    }, 1000);
});