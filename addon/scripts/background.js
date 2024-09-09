// Define search functions
const searchFunctions = {
  "search-chatgpt": (tab, selection) =>
    searchWebsite(
      "https://chat.openai.com/?model=gpt-4&q=clipboard",
      tab,
      selection
    ),
  "search-duckduckgo": (tab, selection) =>
    searchWebsite("https://duckduckgo.com/?q=clipboard&t=ffab", tab, selection),
  "search-github": (tab, selection) =>
    searchWebsite(
      "https://github.com/search?q=clipboard&type=repositories",
      tab,
      selection
    ),
  "search-protonmail": (tab, selection) =>
    searchWebsite(
      "https://mail.proton.me/u/0/all-mail#keyword=clipboard",
      tab,
      selection
    ),
  "search-reddit": (tab, selection) =>
    searchWebsite("https://www.reddit.com/search/?q=clipboard", tab, selection),
  "search-google": (tab, selection) =>
    searchWebsite("https://www.google.com/search?q=clipboard", tab, selection),
  "search-googleimages": (tab, selection) =>
    searchWebsite("https://www.google.com/images?q=clipboard", tab, selection),
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
  "search-imdb": (tab, selection) =>
    searchWebsite("https://www.imdb.com/find?q=clipboard", tab, selection),
  "search-spotify": (tab, selection) =>
    searchWebsite("https://open.spotify.com/search/clipboard", tab, selection),
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
  "search-duckduckgo": "Search with DuckDuckGo",
  "search-chatgpt": "Search with ChatGPT",
  "search-oxford": "Search with Oxford Dictionary",
  "search-imdb": "Search with IMDb",
  "search-github": "Search with GitHub",
  "search-protonmail": "Search with ProtonMail",
  "search-googleimages": "Search with Google Images",
};

Object.keys(searchFunctions).forEach((command) => {
  const title =
    customMenuText[command] ||
    `Search with ${command
      .replace("search-", "")
      .replace(/-/g, " ")
      .replace(/^./, (m) => m.toUpperCase())}`;
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
