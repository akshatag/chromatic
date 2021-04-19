$(document).keydown(function(event){    
    if(event.metaKey && event.key == 'Shift'){ 
        chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
            console.log(response.farewell);
          });
    }
})





