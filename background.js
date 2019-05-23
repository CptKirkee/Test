'use strict';

const openLabelledId = "open-labelled";

browser.menus.create({
  id: openLabelledId,
  title: "Open",
  contexts: ["selection"]
});

browser.menus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === openLabelledId) {
    browser.tabs.create({
      url: "http://example.com"
    });
  }
});

function updateMenuItem(linkHostname) {
  browser.menus.create(openLabelledId, {
    title: `Open (${linkHostname})`
  });
  browser.menus.refresh();
}
//unimportanted to the action of opening a window
browser.menus.onShown.addListener(info => {
  if (!info.linkUrl) {
    return;
  }
  let linkElement = document.createElement("a");
  linkElement.href = info.linkUrl;
  updateMenuItem(linkElement.hostname);
});