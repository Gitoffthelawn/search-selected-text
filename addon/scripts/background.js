// Define search functions
const searchFunctions = {
  "search-google": (tab, selection) =>
    searchWebsite("https://www.google.com/search?q=clipboard", tab, selection),
  "search-youtube": (tab, selection) =>
    searchWebsite(
      "https://www.youtube.com/results?search_query=clipboard",
      tab,
      selection
    ),
  "search-oxford": (tab, selection) =>
    searchWebsite(
      "https://www.oxfordlearnersdictionaries.com/definition/english/clipboard",
      tab,
      selection
    ),
  "search-letterboxd": (tab, selection) =>
    searchWebsite(
      "https://letterboxd.com/search/clipboard/?adult",
      tab,
      selection
    ),
  "search-amazon": (tab, selection) =>
    searchWebsite("https://www.amazon.in/s?k=clipboard", tab, selection),
};

// General search function
function searchWebsite(urlTemplate, tab, selection) {
  if (selection) {
    let query = encodeURIComponent(selection);
    let url = urlTemplate.replace("clipboard", query);
    browser.tabs.create({ url: url, index: tab.index + 1 });
  }
}

// Context menu click handler
function onContextMenuClick(info, tab) {
  const selection = info.selectionText;
  const command = info.menuItemId;
  searchFunctions[command](tab, selection);
}

// Create context menus
Object.keys(searchFunctions).forEach((command) => {
  browser.contextMenus.create({
    id: command,
    title: `Search with ${command
      .replace("search-", "")
      .replace(/-/g, " ")
      .replace(/^./, (m) => m.toUpperCase())}`,
    contexts: ["selection"],
    icons: {
      48: `icons/brands/${command.replace("search-", "")}-colorful.svg`,
    },
  });
});

// Add context menu click listener
browser.contextMenus.onClicked.addListener(onContextMenuClick);

// Add command listener
browser.commands.onCommand.addListener((command) => {
  browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
    browser.tabs
      .executeScript(tabs[0].id, {
        code: "window.getSelection().toString();",
      })
      .then((selection) => searchFunctions[command](tabs[0], selection[0]));
  });
});
