function getImage(){
  $.ajax({
        url: 'http://noapi.dorparasti.ir/api/scraps/e9baeceb-f353-4703-a84d-c9e3107bd90f',
        cache: false,
        dataType: 'json',
        success: function (data) {
            $("body").css({
              "background": "url(http://bing.com" + data.Paths[0] + ")",
              "background-size": "cover",
              "background-position": "center",
              "background-repeat": "no-repeat",
              "background-attachment": "fixed",
              // "background-blend-mode": "color"
            });
            $(".siteTitle").css({
              "background": "url(http://bing.com" + data.Paths[0] + ")",
              "background-size": "cover",
              "background-position": "center",
              "background-repeat": "no-repeat",
              "background-attachment": "fixed",
              "-webkit-text-fill-color": "transparent",
              "-webkit-background-clip": "text",
              "display": "block"
              // "background-blend-mode": "color"
            });
        }
    });
}


getImage();
