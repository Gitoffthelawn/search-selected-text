browser.commands.onCommand.addListener((command) => {
  if (command === "invoke-chord") {
    injectChordListener();
  }
});

browser.browserAction.onClicked.addListener(() => {
  browser.runtime.openOptionsPage();
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

  const engine = engines.find((e) => e.key === msg.key && e.enable !== false);
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
