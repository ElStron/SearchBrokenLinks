// background.js

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action === "checkLinks") {
      const urls = request.urls;
      const results = [];

      const checkLink = async (url) => {
        try {
          const response = await fetch(url, { method: 'HEAD' });
          if (!response.ok) {
            results.push({ url, status: response.status });
          }
        } catch (error) {
          results.push({ url, error: error.message });
        }
      };

      const checkLinks = async () => {
        for (const url of urls) {
          await checkLink(url);
        }
        sendResponse({ results });
      };

      checkLinks();

      return true;
    }
  }
);
