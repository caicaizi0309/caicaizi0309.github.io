const caption = document.getElementById("clock-line");
const options = { hour: "numeric", minute: "2-digit" };
const beijing = new Intl.DateTimeFormat("en-US", { ...options, timeZone: "Asia/Shanghai" });
const visitor = new Intl.DateTimeFormat("en-US", options);

function updateCaption() {
  const now = new Date();
  const here = beijing.format(now);
  const there = visitor.format(now);
  caption.textContent = here === there
    ? `It’s ${here} in Shenzhen.`
    : `It’s ${here} in Shenzhen · ${there} your time.`;
  setTimeout(updateCaption, 60000 - Date.now() % 60000);
}
updateCaption();
