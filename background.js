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


saveTabSet = function() {
    chrome.tabs.query({windowId: chrome.windows.WINDOW_ID_CURRENT}, (results) => {
        chrome.storage.sync.set({tabset:results}, function() {})
    })
}

launchTabSet = function() {
    chrome.storage.sync.get(['tabset'], (result) => {
        result.tabset.forEach(function(item, idx, arr){
            chrome.tabs.create({url: item.url}, ()=>{})
        })
    })
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

        if(request.route == 'SAVE_TAB_SET') {
            saveTabSet()
        }

        if(request.route == 'LAUNCH_TAB_SET') {
            launchTabSet()
        }

        // chrome.extension.getBackgroundPage().console.log(tabsMruOrder.toString())
    }
)







