const textarea = document.getElementById("rules");
const info = document.getElementById("info");
const saveBtn = document.getElementById("save");
const importBtn = document.getElementById("import");
const exportBtn = document.getElementById("export");
const fileInput = document.getElementById("file-input");

let lastSavedText = "";
let flashTimer = null;

function parseJSON(text = textarea.value) {
  try {
    const data = JSON.parse(text);
    if (!Array.isArray(data)) throw new Error();
    return data;
  } catch {
    return null;
  }
}

function engineStats(data) {
  const total = data.length;
  const disabled = data.filter((e) => e.enabled === false).length;
  const enabled = total - disabled;
  return { enabled, disabled };
}

function setInfo(text, extraClass = "") {
  info.textContent = text;
  info.className = "info" + (extraClass ? " " + extraClass : "");
}

function flashInfo(text, className) {
  clearTimeout(flashTimer);
  setInfo(text, className);
  flashTimer = setTimeout(refreshUI, 1000);
}

function refreshUI() {
  const data = parseJSON();
  const isDirty = textarea.value !== lastSavedText;

  if (!data) {
    setInfo("invalid json", "error-text");
    saveBtn.disabled = true;
    exportBtn.disabled = true;
    return;
  }

  const { enabled, disabled } = engineStats(data);

  let label = `${enabled} engines`;
  if (disabled > 0) {
    label += ` (${disabled} disabled)`;
  }

  setInfo(`${label} · Ctrl+S to save`);

  saveBtn.disabled = !isDirty;
  exportBtn.disabled = data.length === 0;
}

function exportFilename() {
  const d = new Date();

  const pad = (n) => String(n).padStart(2, "0");

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    "srch-export-" +
    pad(d.getHours()) +
    "-" +
    pad(d.getMinutes()) +
    "-" +
    pad(d.getSeconds()) +
    "_" +
    pad(d.getDate()) +
    "-" +
    months[d.getMonth()] +
    "-" +
    String(d.getFullYear()).slice(-2) +
    ".json"
  );
}

textarea.addEventListener("input", refreshUI);

saveBtn.addEventListener("click", async () => {
  const data = parseJSON();
  if (!data) return;

  await browser.storage.local.set({ engines: data });
  browser.runtime.sendMessage({ type: "rebuild-menu" });

  lastSavedText = textarea.value;
  saveBtn.disabled = true;
  exportBtn.disabled = data.length === 0;

  flashInfo("saved!", "saved-text");
});

document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "s") {
    e.preventDefault();
    if (!saveBtn.disabled) saveBtn.click();
  }
});

importBtn.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", async () => {
  const file = fileInput.files[0];
  if (!file) return;

  textarea.value = await file.text();
  lastSavedText = "";
  refreshUI();

  browser.runtime.sendMessage({ type: "rebuild-menu" });
  flashInfo("imported", "exported-imported-text");
});

exportBtn.addEventListener("click", () => {
  const data = parseJSON();
  if (!data || data.length === 0) return;

  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = exportFilename();
  a.click();
  URL.revokeObjectURL(url);

  flashInfo("exported", "exported-imported-text");
});

async function init() {
  const { engines } = await browser.storage.local.get("engines");
  const text = JSON.stringify(engines || [], null, 2);

  textarea.value = text;
  lastSavedText = text;

  refreshUI();
}

init();
