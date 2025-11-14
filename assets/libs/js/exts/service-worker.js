try {
    chrome.runtime.onMessage.addListener((message, sender) => {
        (async () => {
            if (message.type === 'open_side_panel') {
                await chrome.sidePanel.open({ tabId: sender.tab.id });
                await chrome.sidePanel.setOptions({
                    tabId: sender.tab.id,
                    path: './index.html',
                    enabled: true
                });
            }

            if (message.action === 'show_side_panel') {
                chrome.windows.getCurrent({ populate: true }, (window) => {
                    chrome.sidePanel.open({ windowId: window.id });
                })
            }
        })();
    });
} catch (error) {
    console.error(error)
}