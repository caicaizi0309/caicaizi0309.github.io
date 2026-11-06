const caption = document.getElementById("clock-line");
const options = { hour: "numeric", minute: "2-digit" };
let clockTimer;

function updateCaption() {
  const now = new Date();
  const spanish = document.documentElement.lang === "es";
  const locale = spanish ? "es-ES" : "en-US";
  const beijing = new Intl.DateTimeFormat(locale, { ...options, timeZone: "Asia/Shanghai" });
  const visitor = new Intl.DateTimeFormat(locale, options);
  const here = beijing.format(now);
  const there = visitor.format(now);
  caption.textContent = spanish
    ? (here === there ? `Hora en Shenzhen: ${here}.` : `Hora en Shenzhen: ${here} · Tu hora local: ${there}.`)
    : here === there
    ? `It’s ${here} in Shenzhen.`
    : `It’s ${here} in Shenzhen · ${there} your time.`;
  clearTimeout(clockTimer);
  clockTimer = setTimeout(updateCaption, 60000 - Date.now() % 60000);
}
addEventListener("languagechange", updateCaption);
updateCaption();
