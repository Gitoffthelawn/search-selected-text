# <img src="https://github.com/user-attachments/assets/95a638a6-3a58-4109-b1c7-0258def2998e" width="45" align="left"> srch

<div align="left">

<p align="left">
  <img alt="GitHub Actions Workflow Status" src="https://img.shields.io/github/actions/workflow/status/dpi0/srch-firefox/ci.yml?branch=main">
  <img alt="GitHub Forks" src="https://img.shields.io/github/forks/dpi0/srch-firefox?style=flat">
  <img alt="GitHub Contributors" src="https://img.shields.io/github/contributors/dpi0/srch-firefox?style=flat&color=pink">
  <img alt="GitHub License" src="https://img.shields.io/github/license/dpi0/srch-firefox">
</p>

<h4>Search selected text</h4>

<a href="https://addons.mozilla.org/firefox/addon/srch">
  <img src="https://labels.tahoe.be/firefox_download_dark.svg" alt="Get it on Firefox" width="120">
</a>

</p>

</div>

https://github.com/user-attachments/assets/86234077-a170-48ee-b95a-425bf55f249f

> [!CAUTION]
> `v3.0.0` has breaking changes in which the addon has moved to a chorded keybind system.
>
> Your old `ALT+x` for Google, or `Alt+y` for YouTube binds won't work now.
>
> Use the chorded `LEADER --> g` for Google and `LEADER --> y` for YouTube (default `LEADER`=`ALT+c`) from now on.

## Quickstart

In your toolbar or the addons list, Hit the "srch" icon. This will open the options page.

On the options page, paste or import (.json file) your search engines.

You can download the provided quickstart engines by [clicking here](https://github.com/dpi0/srch-firefox/releases/latest/download/srch-quickstart-engines.json) or by checking out the latest release.

Make sure to hit save after you've imported your engines!

You can also export your search engines to a `.json`file to import later.

## Usage

1. Select any text on any web page
2. Hit the leader key (default `ALT+c` configurable in Firefox addon settings)
3. Hit the suffix key for your search engine like `g` for Google or `y` for YouTube.
4. So `ALT+c --> g` for Google and `ALT+c --> y` for YouTube.
5. Or, simply use the context menu by right-clicking after selecting text and then choosing the search engine.

## Configuration

In the provided `srch-quickstart-engines.json` file, URLs have been set up for some engines like Google, YouTube, Reddit, ChatGPT, Wikipedia etc.

Use the options page to add, edit, remove or disable any engine.

An example engine rule would be,

```json
[
  {
    "name": "Wikipedia",
    "url": "https://en.wikipedia.org/w/index.php?search=search_term",
    "key": "w"
  }
]
```

1. The `name` field decides the context menu item name. Here, "Wikipedia" will be shown.
2. The `url` field is basically the "search engine". Your selected text will replace the `search_term`.
3. The `key` field is "suffix key" used for chord key bindings. Here "w" means, "Wikipedia" search will be performed on `LEADER --> w` (default `LEADER`=`ALT+c`)

---

***Credits***

Addon icon from [Iconify Design - weixin-search](https://icon-sets.iconify.design/?query=weixin-search).
