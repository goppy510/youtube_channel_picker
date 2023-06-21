document.addEventListener('DOMContentLoaded', function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: getChannelInfo
    }, (result) => {
      const channelId = result[0].result.channelId;
      const channelName = result[0].result.channelName;

      document.getElementById('channelId').textContent = channelId;
      document.getElementById('channelName').textContent = channelName;

      document.getElementById('copyButton').addEventListener('click', async () => {
        await navigator.clipboard.writeText(channelId);
        
        // Wait a bit to ensure clipboard has updated then close the window
        setTimeout(() => {
          window.close();
        }, 100);
      }, false);
    });
  });
});

function getChannelInfo() {
  let urlContent = document.querySelector('meta[itemprop="identifier"]').content;
  let channelId = urlContent.split('/').pop();

  let nameElement = document.querySelector('yt-formatted-string#text');
  let channelName = nameElement.textContent;
  return { channelId, channelName };
}
