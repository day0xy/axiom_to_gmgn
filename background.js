chrome.contextMenus.create(
  {
    id: "go-to-gmgn",
    title: "Go to GMGN",
    contexts: ["page"],
    documentUrlPatterns: ["https://axiom.trade/*"],
  },
  function () {
    if (chrome.runtime.lastError) {
      console.error("Error creating context menu: ", chrome.runtime.lastError);
    } else {
      console.log("Context menu created successfully");
    }
  }
);

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId === "go-to-gmgn") {
    console.log("Go to GMGN clicked, processing URL: ", tab.url);
    try {
      let url = new URL(tab.url);
      let path = url.pathname;
      let parts = path.split("/");
      let caAddress = parts[parts.length - 1];
      console.log("Extracted CA address: ", caAddress);
      if (caAddress) {
        let newUrl = `https://gmgn.ai/sol/token/${caAddress}`;
        console.log("Opening new URL: ", newUrl);
        chrome.tabs.create({ url: newUrl });
      } else {
        console.warn("No CA address found in URL");
      }
    } catch (error) {
      console.error("Error processing URL: ", error);
    }
  }
});
