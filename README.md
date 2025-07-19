# <img src="https://github.com/user-attachments/assets/95a638a6-3a58-4109-b1c7-0258def2998e" width="45" align="left"> srch

<div align="left">

<p align="left">
  <img alt="GitHub Actions Workflow Status" src="https://img.shields.io/github/actions/workflow/status/dpi0/srch-firefox/ci.yml?branch=main">
  <img alt="GitHub Forks" src="https://img.shields.io/github/forks/dpi0/srch-firefox?style=flat">
  <img alt="GitHub Contributors" src="https://img.shields.io/github/contributors/dpi0/srch-firefox?style=flat&color=pink">
  <img alt="GitHub License" src="https://img.shields.io/github/license/dpi0/srch-firefox">
</p>

<h4>Use Pre-defined Search Engines to Search Any Selected Text</h4>

<a href="https://addons.mozilla.org/firefox/addon/srch">
  <img src="https://labels.tahoe.be/firefox_download_dark.svg" alt="Get it on Firefox" width="120">
</a>

</p>

</div>

<img width="600" height="600" alt="screenshot" src="https://github.com/user-attachments/assets/59f634c1-e9ee-4437-865f-7a66c3ba296d" />


## Usage

1. Select text on a webpage
2. Right-click on the selected text
   - Either hit the keyboard shortcut for the search engine
   - Or choose a search engine from the context menu
3. The search results will open in a new tab

Currently supports the following search engines and services:

| Search Engine     | Default Keybind | Search URL                                                                                                                                   |
| ----------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| ChatGPT           | —               | [`https://chat.openai.com/?model=gpt-4&q=query`](https://chat.openai.com/?model=gpt-4&q=query)                                               |
| DuckDuckGo        | —               | [`https://duckduckgo.com/?q=query&t=ffab`](https://duckduckgo.com/?q=query&t=ffab)                                                           |
| GitHub            | —               | [`https://github.com/search?q=query&type=repositories`](https://github.com/search?q=query&type=repositories)                                 |
| Google            | `Alt+X`         | [`https://www.google.com/search?udm=14&q=query&num=50`](https://www.google.com/search?udm=14&q=query&num=50)                                 |
| Google Images     | `Alt+I`         | [`https://www.google.com/search?udm=2&q=query&num=50`](https://www.google.com/search?udm=2&q=query&num=50)                                   |
| Letterboxd        | —               | [`https://letterboxd.com/search/query/?adult`](https://letterboxd.com/search/query/?adult)                                                   |
| Oxford Dictionary | `Alt+O`         | [`https://www.oxfordlearnersdictionaries.com/definition/english/query`](https://www.oxfordlearnersdictionaries.com/definition/english/query) |
| Reddit            | —               | [`https://www.reddit.com/search/?q=query`](https://www.reddit.com/search/?q=query)                                                           |
| Spotify           | —               | [`https://open.spotify.com/search/query`](https://open.spotify.com/search/query)                                                             |
| Wikipedia         | —               | [`https://en.wikipedia.org/w/index.php?search=query`](https://en.wikipedia.org/w/index.php?search=query)                                     |
| YouTube           | `Alt+Y`         | [`https://www.youtube.com/results?search_query=query`](https://www.youtube.com/results?search_query=query)                                   |

To request a new search engine, [open a new issue](https://github.com/dpi0/srch-firefox/issues/new)!

***Credits***

Addon icon from [Iconify Design](https://icon-sets.iconify.design) — specifically `icon-park:weixin-search`

Search engine brand icons from [Simple Icons](https://simpleicons.org)
