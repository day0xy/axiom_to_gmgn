chrome.contextMenus.create({
  title: "Go to GMGN",
  contexts: ["page"],
  documentUrlPatterns: ["https://axiom.trade/*"]
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  let url = new URL(tab.url);
  let path = url.pathname;
  let parts = path.split('/');
  let caAddress = parts[parts.length - 1];
  if (caAddress.length === 44) {
    let newUrl = `https://gmgn.ai/sol/token/${caAddress}`;
    chrome.tabs.create({ url: newUrl });
  }
});