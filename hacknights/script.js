var bingImage = "http://www.bing.com/HPImageArchive.aspx?format=js&idx=1&n=1"

function getImage(){
  var xmlHttp = null;
  xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", bingImage, false );
  xmlHttp.send( null );
  return xmlHttp.responseText;
}

console.log(getImage());
