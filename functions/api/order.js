export async function onRequestPost(context) {
  try {
    const data = await context.request.json();
    const name = String(data.name || "").trim();
    const contact = String(data.contact || "").trim();
    const service = String(data.service || "").trim();
    const message = String(data.message || "").trim();

    if (!name || !contact) {
      return new Response(JSON.stringify({ ok: false, error: "Ism va aloqa kiritilishi shart" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const token = String(context.env.BOT_TOKEN || "").trim();
    const chatId = String(context.env.CHAT_ID || "").trim();

    if (!token || !chatId) {
      return new Response(JSON.stringify({ ok: false, error: "BOT_TOKEN yoki CHAT_ID topilmadi" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    const text = `🚀 Yangi buyurtma — EXC PLATFORM\n\n👤 Ism: ${name}\n📞 Aloqa: ${contact}\n🛠 Xizmat: ${service || "Tanlanmagan"}\n📝 Xabar: ${message || "Izoh qoldirilmagan"}`;

    const url = [
      "https://",
      "api.",
      "telegram.org",
      "/bot",
      token,
      "/sendMessage"
    ].join("");

    const tgRes = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: text })
    });

    const tgData = await tgRes.json();

    if (!tgRes.ok || !tgData.ok) {
      return new Response(JSON.stringify({ ok: false, error: tgData.description || "Telegram rad etdi" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
