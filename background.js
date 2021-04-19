tabShiftActive = false
tabShiftActiveIdx = 0
tabsMruOrder = []

resetTabShift = function() {
    if(tabShiftActive) {
        // alert("before" + tabsMruOrder.toString())
        chrome.tabs.query({active: true}, (results) => {
            activeTabId = results[0].id
            activeTabMruIdx = tabsMruOrder.indexOf(activeTabId)
    
            if(activeTabMruIdx != -1){
                tabsMruOrder.splice(activeTabMruIdx, 1)
            }
    
            tabsMruOrder.unshift(activeTabId)
            // alert("after" + tabsMruOrder.toString())
            tabShiftActiveIdx = 0
        })

    }



}


chrome.tabs.onActivated.addListener((activeInfo) => {
    if(!tabShiftActive){
        activeTabIdx = tabsMruOrder.indexOf(activeInfo.tabId)

        if(activeTabIdx != -1) {
            tabsMruOrder.splice(activeTabIdx, 1)
        }
    
        tabsMruOrder.unshift(activeInfo.tabId)
        // alert("tab" + tabsMruOrder.toString())
    }
})


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(request.route == 'META_KEYUP') {
            if(tabShiftActive) {  
                resetTabShift()
            }
        }
    }
)

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(request.route == 'META_SHIFT_BACK') {            
            tabShiftActive = true
            if(tabShiftActiveIdx + 1 < tabsMruOrder.length) {
                tabShiftActiveIdx += 1
                chrome.tabs.update(tabsMruOrder[tabShiftActiveIdx], {selected:true}, (tab) => {
                    sendResponse({});
                }) 
            }
        }

        if(request.route == 'META_SHIFT_FORWARD') {
            tabShiftActive = true
            if(tabShiftActiveIdx - 1 >= 0) {
                tabShiftActiveIdx -= 1
                chrome.tabs.update(tabsMruOrder[tabShiftActiveIdx], {selected:true}, (tab) => {
                    sendResponse({});
                }) 
            }    
        }

        // chrome.extension.getBackgroundPage().console.log(tabsMruOrder.toString())
    }
)





