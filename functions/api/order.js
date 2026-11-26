export async function onRequestPost({ request, env }) {
  try {
    const data = await request.json();
    const name = (data.name || "").trim();
    const contact = (data.contact || "").trim();
    const service = (data.service || "").trim();
    const message = (data.message || "").trim();

    if (!name || !contact) {
      return new Response(JSON.stringify({ ok: false, error: "Ism va aloqa ma'lumoti kiritilishi shart" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const text = [
      "🚀 *Yangi buyurtma — EXC PLATFORM*",
      "",
      `👤 *Ism:* ${name}`,
      `📞 *Aloqa:* ${contact}`,
      `🛠 *Xizmat:* ${service || "Tanlanmagan"}`,
      `📝 *Xabar:* ${message || "Izoh qoldirilmagan"}`
    ].join("\n");

    const tgUrl = `https://telegram.org{env.BOT_TOKEN}/sendMessage`;
    const tgRes = await fetch(tgUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: env.CHAT_ID,
        text: text,
        parse_mode: "Markdown"
      })
    });

    if (!tgRes.ok) {
      return new Response(JSON.stringify({ ok: false, error: "Telegram xatosi" }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: "Server xatosi" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
