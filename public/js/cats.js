var button = document.querySelector("#btn");
var img = document.querySelector("#photo");

button.addEventListener("click", function() {
  var XHR = new XMLHttpRequest();
  XHR.onreadystatechange = function() {
    if(XHR.readyState == 4 && XHR.status == 200) {
      var xml = XHR.responseXML;
      var source = xml.getElementsByTagName("source_url");
      var  innerSource = source[0]["innerHTML"];
      var imageId = innerSource.substring(21);
      img.src = "https://thecatapi.com/api/images/get" + imageId + "&size=small";
      console.log("https://thecatapi.com/api/images/get"+imageId);
    }
  };
  XHR.open("GET", "https://thecatapi.com/api/images/get?type=gif&format=xml");
  XHR.send();
});


//https://thecatapi.com/docs.html