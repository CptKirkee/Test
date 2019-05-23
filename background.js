'use strict';

const openLabelledId = "open-labelled";

browser.menus.create({
  id: openLabelledId,
  title: "Open",
  contexts: ["link"]
});

browser.menus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === openLabelledId) {
  function openInNewTab(url) {
  var win = window.open(url, '_blank');
  win.focus();
}
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