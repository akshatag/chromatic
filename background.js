tabsMruOrder = []

chrome.tabs.onActivated.addListener((activeInfo) => {
    // alert(tabsMruOrder.toString())
    
    activeTabIdx = tabsMruOrder.indexOf(activeInfo.tabId)

    if(activeTabIdx != -1) {
        tabsMruOrder.splice(activeTabIdx, 1)
    }

    tabsMruOrder.unshift(activeInfo.tabId)
})


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(request.greeting == 'hello') {            
            if(tabsMruOrder.length > 1) {
                chrome.tabs.update(tabsMruOrder[1], {selected:true}, (tab) => {
                    sendResponse({farewell: 'goodbye'})
                }) 
            }    
        }
    }
)





