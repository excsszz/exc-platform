export async function onRequestGet(context) {
  const token = String(context.env.BOT_TOKEN || "").trim();
  const apiUrl = ["https://", "api.", "telegram.org", "/bot", token].join("");
  const res = await fetch(apiUrl + "/setWebhook?url=https://pages.dev");
  const data = await res.text();
  return new Response(data, { headers: { "Content-Type": "application/json" } });
}
export async function onRequestPost(context) {
  try {
    const update = await context.request.json();
    const token = String(context.env.BOT_TOKEN || "").trim();
    if (!token) return new Response("OK");

    const apiUrl = ["https://", "api.", "telegram.org", "/bot", token].join("");

    if (update.message && update.message.text) {
      const chatId = update.message.chat.id;
      const text = update.message.text.trim();

      if (text === "/start") {
        await fetch(apiUrl + "/sendMessage", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: "👋 Assalomu alaykum! EXC PLATFORM rasmiy botiga xush kelibsiz.\n\nBiznesingiz uchun zamonaviy veb-saytlar, internet-do'konlar va Telegram botlar yaratamiz.\n\nKerakli bo'limni tanlang:",
            reply_markup: {
              inline_keyboard: [
                [{ text: "🌐 Rasmiy saytga o'tish", url: "https://exc-platform.pages.dev" }],
                [
                  { text: "🛠 Xizmatlar", callback_data: "services" },
                  { text: "💰 Narxlar", callback_data: "prices" }
                ],
                [{ text: "📞 Bog'lanish", callback_data: "contact" }]
              ]
            }
          })
        });
      }
    }

    if (update.callback_query) {
      const cb = update.callback_query;
      const chatId = cb.message.chat.id;
      const data = cb.data;

      let replyText = "";
      if (data === "services") {
        replyText = "🛠 Bizning xizmatlar:\n\n• Veb-sayt yaratish (Landing page, Korporativ)\n• Internet-do'konlar\n• Telegram botlar va avtomatlashtirish\n• CRM va Admin panellar\n• UI/UX dizayn";
      } else if (data === "prices") {
        replyText = "💰 Boshlang'ich narxlar:\n\n• START (Landing page) — 800 000 so'm dan\n• BIZNES (Biznes sayt / Bot) — 1 800 000 so'm dan\n• MAXSUS (Internet-do'kon / CRM) — 3 500 000 so'm dan";
      } else if (data === "contact") {
        replyText = "📞 Biz bilan bog'lanish:\n\nTelefon: +998 91 340 02 09\nSayt: https://exc-platform.pages.dev";
      }

      await fetch(apiUrl + "/answerCallbackQuery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ callback_query_id: cb.id })
      });

      if (replyText) {
        await fetch(apiUrl + "/sendMessage", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: chatId, text: replyText })
        });
      }
    }

    return new Response("OK", { status: 200 });
  } catch (e) {
    return new Response("OK", { status: 200 });
  }
}
