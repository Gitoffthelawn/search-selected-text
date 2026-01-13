browser.commands.onCommand.addListener((command) => {
  if (command === "invoke-chord") {
    injectChordListener();
  }
});

browser.browserAction.onClicked.addListener(() => {
  browser.runtime.openOptionsPage();
});

browser.runtime.onInstalled.addListener(rebuildContextMenu);
browser.runtime.onStartup.addListener(rebuildContextMenu);

browser.runtime.onMessage.addListener((msg) => {
  if (msg.type === "rebuild-menu") {
    rebuildContextMenu();
  }
});

async function rebuildContextMenu() {
  browser.contextMenus.removeAll();

  const { engines } = await browser.storage.local.get("engines");
  if (!Array.isArray(engines)) return;

  const enabled = engines.filter((e) => e.enabled !== false);
  if (enabled.length === 0) return;

  browser.contextMenus.create({
    id: "srch-root",
    title: "Search with",
    contexts: ["selection"],
  });

  for (const engine of enabled) {
    browser.contextMenus.create({
      id: `srch-${engine.key}`,
      parentId: "srch-root",
      title: engine.name,
      contexts: ["selection"],
    });
  }
}

browser.contextMenus.onClicked.addListener(async (info) => {
  if (!info.menuItemId.startsWith("srch-")) return;

  const key = info.menuItemId.slice(5);
  const { engines } = await browser.storage.local.get("engines");

  const engine = engines?.find((e) => e.key === key && e.enabled !== false);
  if (!engine) return;

  const url = engine.url.replace(
    "search_term",
    encodeURIComponent(info.selectionText),
  );

  browser.tabs.create({ url });
});

async function injectChordListener() {
  const tabs = await browser.tabs.query({ active: true, currentWindow: true });
  if (!tabs.length) return;

  await browser.tabs.executeScript(tabs[0].id, {
    code: `
      (() => {
        if (window.__srchChordActive) return;
        window.__srchChordActive = true;

        const handler = (e) => {
          e.preventDefault();
          e.stopPropagation();

          window.removeEventListener("keydown", handler, true);
          window.__srchChordActive = false;

          browser.runtime.sendMessage({
            type: "chord-key",
            key: e.key
          });
        };

        window.addEventListener("keydown", handler, true);
      })();
    `,
  });
}

browser.runtime.onMessage.addListener(async (msg) => {
  if (msg.type !== "chord-key") return;

  const { engines } = await browser.storage.local.get("engines");
  if (!Array.isArray(engines)) return;

  const engine = engines.find((e) => e.key === msg.key && e.enabled !== false);
  if (!engine) return;

  const text = await getSelection();
  if (!text) return;

  const url = engine.url.replace("search_term", encodeURIComponent(text));

  browser.tabs.create({ url });
});

async function getSelection() {
  const tabs = await browser.tabs.query({ active: true, currentWindow: true });
  if (!tabs.length) return "";

  const [result] = await browser.tabs.executeScript(tabs[0].id, {
    code: "window.getSelection().toString();",
  });

  return result || "";
}
