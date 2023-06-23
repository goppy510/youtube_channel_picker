chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete') {
    if (tab.url.startsWith('https://www.youtube.com/@')) {
      // アクティブなタブが更新されてHTMLが完全に読み込まれ、かつYouTubeチャンネルページを表示している
      chrome.action.setIcon({tabId: tabId, path: './src/assets/icon_64.png'});
      chrome.action.setPopup({ tabId: tabId, popup: './src/popup/popup.html' });
    } else {
      // アクティブなタブが更新されてHTMLが完全に読み込まれ、かつ非対象ページを表示している
      chrome.action.setIcon({tabId: tabId, path: './src/assets/icon_64_gray.png'});
      chrome.action.setPopup({ tabId: tabId, popup: './src/popup/not-found.html' });
    }
  }
});