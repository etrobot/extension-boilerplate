import ext from "./utils/ext";

ext.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.action === "perform-save") {
      console.log("Extension Type: ", "/* @echo extension */");
      // console.log("PERFORM AJAX", request.data);
      ext.cookies.getAll({ domain: "xueqiu.com" }, function (cookies) {
        var content = "";
        var u;
        // console.log('Callback for cookies came in fine.');
        // console.log('cookies.length=' + cookies.length);        
        for (var i = 0; i < cookies.length; i++) {
          content += cookies[i].name + "=" + cookies[i].value + "; ";
          if(cookies[i].name==='u'){
            u=cookies[i].value;
            console.log(u)
          }
        }
        content = content.slice(0,-2);
        var url="";
        httpRequest(url, content,u, sendResponse);
      });
    }
    return true;
  }
);

function httpRequest(url, data,u, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("PUT", url, true);
  xhr.setRequestHeader("X-Bmob-Application-Id", "");
  xhr.setRequestHeader("X-Bmob-REST-API-Key", "");
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      callback(u+'</br>'+xhr.responseText);
    }
  }
  xhr.send(JSON.stringify({ text: data }));
}
