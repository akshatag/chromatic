$(document).keydown(function(event){    
    if(event.metaKey && event.key == 'Alt'){ 
        chrome.runtime.sendMessage({route: "META_SHIFT_FORWARD"}, () => {})
    }
    if(event.metaKey && event.key == 'Control'){
        chrome.runtime.sendMessage({route: "META_SHIFT_BACK"}, () => {})
    }
})

$(document).keyup(function(event){
    if(event.key == 'Meta'){
        chrome.runtime.sendMessage({route: "META_KEYUP"}, () => {})
    }
})
