/* ----------------------------------- PAGE SETUP ----------------------------------------- */ 


$("body").append('<div id="chromaticBarDiv"></div>')
$("#chromaticBarDiv").append('<input type="text" name="chromaticBar" id="chromaticBar"></input>')




/* --------------------------------- HELPER FUNCTIONS -------------------------------------- */ 



function handleChromaticBarCommand() {
    if($("#chromaticBar").val() == 'launchTab'){ 
        alert('hi')
        launchTabSet()
    }
}

function tearDownChromaticBar() {
    $(".chromaticResult").remove()
    $("#chromaticBar").val('')
    $("#chromaticBarDiv").css('display', 'none')
}


function launchTabSet() {
    chrome.runtime.sendMessage({route: "LAUNCH_TAB_SET"}, ()=>{})
}




/* ------------------------------ KEY EVENT LISTENERS ------------------------------------- */ 

$(document).keydown(function(event){    
    if(event.metaKey && event.key == 'Alt'){ 
        chrome.runtime.sendMessage({route: "META_SHIFT_FORWARD"}, () => {})
    }
    if(event.metaKey && event.key == 'Control'){
        chrome.runtime.sendMessage({route: "META_SHIFT_BACK"}, () => {})
    }
    if(event.ctrlKey && event.key == 'c'){
        chrome.runtime.sendMessage({route: "SAVE_TAB_SET"}, () => {})
    }
    if(event.ctrlKey && event.key == 'v'){
        alert('tab set saved')
        launchTabset()
    }
    if(event.ctrlKey && event.key == ' '){
        if($("#chromaticBarDiv").css('display') == 'none') {
            $("#chromaticBarDiv").css('display', 'block')
            $("#chromaticBar").focus()
        } else{
            $("#chromaticBarDiv").css('display', 'none')
        }
    }

})

$(document).keyup(function(event){
    if(event.key == 'Meta'){
        chrome.runtime.sendMessage({route: "META_KEYUP"}, () => {})
    }
})

$("#chromaticBar").keydown(function(event){
    if(event.key == 'Enter') {
        handleChromaticBarCommand()
    } else if(event.key == 'Escape'){
        tearDownChromaticBar()
    } else{
        $('#chromaticBarDiv').append('<div class="chromaticResult"></div>')
    }
})


