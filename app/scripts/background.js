function searchWebsite(urlTemplate, tab, selection) {
  if (selection) {
    let query = encodeURIComponent(selection);
    let url = urlTemplate.replace("clipboard", query);
    browser.tabs.create({ url: url, index: tab.index + 1 });
  }
}

function searchGoogle(tab, selection) {
  searchWebsite("https://www.google.com/search?q=clipboard", tab, selection);
}

function searchYouTube(tab, selection) {
  searchWebsite(
    "https://www.youtube.com/results?search_query=clipboard",
    tab,
    selection
  );
}

function searchOxford(tab, selection) {
  searchWebsite(
    "https://www.oxfordlearnersdictionaries.com/definition/english/clipboard",
    tab,
    selection
  );
}

function searchLetterboxd(tab, selection) {
  searchWebsite(
    "https://letterboxd.com/search/clipboard/?adult",
    tab,
    selection
  );
}

function searchAmazon(tab, selection) {
  searchWebsite("https://www.amazon.in/s?k=clipboard", tab, selection);
}

function onContextMenuClick(info, tab) {
  const selection = info.selectionText;
  switch (info.menuItemId) {
    case "search-google":
      searchGoogle(tab, selection);
      break;
    case "search-youtube":
      searchYouTube(tab, selection);
      break;
    case "search-oxford":
      searchOxford(tab, selection);
      break;
    case "search-letterboxd":
      searchLetterboxd(tab, selection);
      break;
    case "search-amazon":
      searchAmazon(tab, selection);
      break;
  }
}

browser.contextMenus.create({
  id: "search-google",
  title: "Search with Google",
  contexts: ["selection"],
  icons: {
    48: "icons/google-brands-colorful.svg",
  },
});

browser.contextMenus.create({
  id: "search-youtube",
  title: "Search with YouTube",
  contexts: ["selection"],
  icons: {
    48: "icons/youtube-brands-colorful.svg",
  },
});

browser.contextMenus.create({
  id: "search-oxford",
  title: "Search with Oxford",
  contexts: ["selection"],
  icons: {
    48: "icons/e-solid-colorful.svg",
  },
});

browser.contextMenus.create({
  id: "search-letterboxd",
  title: "Search with Letterboxd",
  contexts: ["selection"],
  icons: {
    48: "icons/letterboxd-brands-colorful.svg",
  },
});

browser.contextMenus.create({
  id: "search-amazon",
  title: "Search with Amazon India",
  contexts: ["selection"],
  icons: {
    48: "icons/amazon-brands-colorful.svg",
  },
});

browser.contextMenus.onClicked.addListener(onContextMenuClick);

browser.commands.onCommand.addListener((command) => {
  browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
    browser.tabs
      .executeScript(tabs[0].id, {
        code: "window.getSelection().toString();",
      })
      .then((selection) => {
        if (command === "search-google") {
          searchGoogle(tabs[0], selection[0]);
        } else if (command === "search-youtube") {
          searchYouTube(tabs[0], selection[0]);
        } else if (command === "search-oxford") {
          searchOxford(tabs[0], selection[0]);
        } else if (command === "search-letterboxd") {
          searchLetterboxd(tabs[0], selection[0]);
        } else if (command === "search-amazon") {
          searchAmazon(tabs[0], selection[0]);
        }
      });
  });
});
