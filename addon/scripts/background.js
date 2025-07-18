// Define search functions
const searchFunctions = {
  "search-amazon": (tab, selection) =>
    searchWebsite("https://www.amazon.com/s?k=clipboard", tab, selection),
  "search-chatgpt": (tab, selection) =>
    searchWebsite(
      "https://chat.openai.com/?model=gpt-4&q=clipboard",
      tab,
      selection,
    ),
  "search-duckduckgo": (tab, selection) =>
    searchWebsite("https://duckduckgo.com/?q=clipboard&t=ffab", tab, selection),
  "search-google": (tab, selection) =>
    searchWebsite(
      "https://www.google.com/search?udm=14&q=clipboard&num=50",
      tab,
      selection,
    ),
  "search-github": (tab, selection) =>
    searchWebsite(
      "https://github.com/search?q=clipboard&type=repositories",
      tab,
      selection,
    ),
  "search-googleimages": (tab, selection) =>
    searchWebsite(
      "https://www.google.com/search?udm=2&q=clipboard&num=50",
      tab,
      selection,
    ),
  "search-letterboxd": (tab, selection) =>
    searchWebsite(
      "https://letterboxd.com/search/clipboard/?adult",
      tab,
      selection,
    ),
  "search-oxford": (tab, selection) =>
    searchWebsite(
      "https://www.oxfordlearnersdictionaries.com/definition/english/clipboard",
      tab,
      selection,
    ),
  "search-protonmail": (tab, selection) =>
    searchWebsite(
      "https://mail.proton.me/u/0/all-mail#keyword=clipboard",
      tab,
      selection,
    ),
  "search-reddit": (tab, selection) =>
    searchWebsite("https://www.reddit.com/search/?q=clipboard", tab, selection),
  "search-spotify": (tab, selection) =>
    searchWebsite("https://open.spotify.com/search/clipboard", tab, selection),
  "search-wikipedia": (tab, selection) =>
    searchWebsite(
      "https://en.wikipedia.org/w/index.php?search=clipboard",
      tab,
      selection,
    ),
  "search-youtube": (tab, selection) =>
    searchWebsite(
      "https://www.youtube.com/results?search_query=clipboard",
      tab,
      selection,
    ),
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
const customMenuText = {
  "search-chatgpt": "ChatGPT Search",
  "search-duckduckgo": "DuckDuckGo Search",
  "search-github": "GitHub Search",
  "search-googleimages": "Image Google Search",
  "search-imdb": "IMDb Search",
  "search-oxford": "Oxford Search Dictionary",
  "search-protonmail": "ProtonMail Search",
};

Object.keys(searchFunctions).forEach((command) => {
  const title =
    customMenuText[command] ||
    `${command
      .replace("search-", "")
      .replace(/-/g, " ")
      .replace(/^./, (m) => m.toUpperCase())} Search`;
  browser.contextMenus.create({
    id: command,
    title,
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
