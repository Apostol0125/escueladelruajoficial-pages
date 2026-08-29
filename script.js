const menuButton = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav");

function closeMenu() {
  nav?.classList.remove("open");
  menuButton?.setAttribute("aria-expanded", "false");
}

if (menuButton && nav) {
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-controls", "main-navigation");
  nav.id ||= "main-navigation";

  menuButton.addEventListener("click", (event) => {
    event.stopPropagation();
    const isOpen = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    if (!nav.contains(event.target) && event.target !== menuButton) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      menuButton.focus();
    }
  });
}

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();


/* Chat flotante de WhatsApp MAIER */
(() => {
  if (document.querySelector(".maier-chat")) return;

  const phone = "16099109514";
  const greeting = "Shalom, bienvenido a Escuela Del Ruaj. ¿Desea información sobre nuestros cursos, inscripciones o actividades ministeriales?";
  const topics = [
    ["Escuela Profética", "Saludos, deseo información sobre la Escuela Profética."],
    ["Raíces Hebreas", "Saludos, deseo información sobre los cursos de Raíces Hebreas."],
    ["Inscripción", "Saludos, deseo ayuda con mi inscripción."],
    ["Donaciones", "Saludos, deseo información sobre las donaciones a MAIER."]
  ];

  const style = document.createElement("style");
  style.textContent = `
    .maier-chat {
      position: fixed;
      right: 22px;
      bottom: 22px;
      z-index: 9999;
      font-family: Arial, Helvetica, sans-serif;
    }
    .maier-chat-panel {
      position: absolute;
      right: 0;
      bottom: 76px;
      width: min(340px, calc(100vw - 32px));
      overflow: hidden;
      border: 1px solid rgba(212, 175, 55, .55);
      border-radius: 18px;
      background: #fff;
      color: #162033;
      box-shadow: 0 18px 48px rgba(0, 0, 0, .32);
      transform: translateY(10px) scale(.98);
      transform-origin: bottom right;
      opacity: 0;
      visibility: hidden;
      transition: opacity .2s ease, transform .2s ease, visibility .2s ease;
    }
    .maier-chat.open .maier-chat-panel {
      transform: translateY(0) scale(1);
      opacity: 1;
      visibility: visible;
    }
    .maier-chat-header {
      padding: 18px 20px;
      background: linear-gradient(135deg, #06162b, #142b50);
      color: #fff;
    }
    .maier-chat-header strong {
      display: block;
      margin-bottom: 3px;
      color: #f0ca50;
      font-size: 17px;
    }
    .maier-chat-header span {
      font-size: 13px;
      opacity: .9;
    }
    .maier-chat-body {
      padding: 16px;
      background: #f6f7f9;
    }
    .maier-chat-message {
      margin: 0 0 14px;
      padding: 13px 14px;
      border-radius: 4px 14px 14px;
      background: #fff;
      font-size: 14px;
      line-height: 1.45;
      box-shadow: 0 3px 12px rgba(0, 0, 0, .07);
    }
    .maier-chat-topics {
      display: grid;
      gap: 8px;
    }
    .maier-chat-topics a {
      display: block;
      padding: 11px 13px;
      border: 1px solid #d9dee6;
      border-radius: 10px;
      background: #fff;
      color: #0d5c3d;
      font-size: 14px;
      font-weight: 700;
      text-decoration: none;
      transition: border-color .2s ease, background .2s ease;
    }
    .maier-chat-topics a:hover,
    .maier-chat-topics a:focus-visible {
      border-color: #25d366;
      background: #effdf4;
    }
    .maier-chat-toggle {
      display: flex;
      width: 62px;
      height: 62px;
      margin-left: auto;
      align-items: center;
      justify-content: center;
      border: 2px solid #fff;
      border-radius: 50%;
      background: #25d366;
      color: #fff;
      cursor: pointer;
      box-shadow: 0 8px 25px rgba(0, 0, 0, .3);
      transition: transform .2s ease, background .2s ease;
    }
    .maier-chat-toggle:hover,
    .maier-chat-toggle:focus-visible {
      transform: translateY(-2px) scale(1.04);
      background: #1fbd5a;
    }
    .maier-chat-toggle svg {
      width: 32px;
      height: 32px;
      fill: currentColor;
    }
    .maier-chat-label {
      position: absolute;
      right: 72px;
      bottom: 13px;
      width: max-content;
      padding: 9px 12px;
      border-radius: 9px;
      background: #06162b;
      color: #fff;
      font-size: 13px;
      font-weight: 700;
      box-shadow: 0 5px 18px rgba(0, 0, 0, .24);
    }
    .maier-chat.open .maier-chat-label { display: none; }
    @media (max-width: 600px) {
      .maier-chat { right: 14px; bottom: 14px; }
      .maier-chat-panel { bottom: 72px; }
      .maier-chat-label { display: none; }
    }
    @media (prefers-reduced-motion: reduce) {
      .maier-chat-panel, .maier-chat-toggle { transition: none; }
    }
  `;
  document.head.appendChild(style);

  const chat = document.createElement("aside");
  chat.className = "maier-chat";
  chat.setAttribute("aria-label", "Chat de WhatsApp de MAIER");

  const panel = document.createElement("div");
  panel.className = "maier-chat-panel";
  panel.id = "maier-chat-panel";

  const header = document.createElement("div");
  header.className = "maier-chat-header";
  header.innerHTML = "<strong>Escuela Del Ruaj</strong><span>Atención por WhatsApp</span>";

  const body = document.createElement("div");
  body.className = "maier-chat-body";

  const message = document.createElement("p");
  message.className = "maier-chat-message";
  message.textContent = greeting;

  const links = document.createElement("div");
  links.className = "maier-chat-topics";
  topics.forEach(([label, text]) => {
    const link = document.createElement("a");
    link.href = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = label;
    links.appendChild(link);
  });

  const label = document.createElement("span");
  label.className = "maier-chat-label";
  label.textContent = "¿Necesita ayuda?";

  const button = document.createElement("button");
  button.className = "maier-chat-toggle";
  button.type = "button";
  button.setAttribute("aria-label", "Abrir chat de WhatsApp");
  button.setAttribute("aria-controls", panel.id);
  button.setAttribute("aria-expanded", "false");
  button.innerHTML = '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16.04 3C8.86 3 3.02 8.73 3.02 15.78c0 2.25.6 4.45 1.74 6.38L3 28.5l6.54-1.69a13.18 13.18 0 0 0 6.5 1.67h.01c7.18 0 13.02-5.73 13.02-12.78C29.07 8.65 23.23 3 16.04 3Zm0 23.32a11.02 11.02 0 0 1-5.62-1.52l-.4-.23-3.88 1 1.04-3.72-.26-.41a10.45 10.45 0 0 1-1.7-5.66c0-5.86 4.85-10.63 10.82-10.63 5.98 0 10.83 4.77 10.83 10.63 0 5.86-4.85 10.54-10.83 10.54Zm5.94-7.9c-.32-.16-1.92-.93-2.22-1.04-.3-.1-.51-.16-.73.16-.22.32-.84 1.04-1.03 1.25-.19.21-.38.24-.7.08-.33-.16-1.38-.5-2.63-1.58a9.74 9.74 0 0 1-1.82-2.23c-.19-.32-.02-.49.14-.65.15-.14.33-.37.49-.56.16-.18.21-.32.32-.53.11-.21.06-.4-.02-.56-.08-.16-.73-1.73-1-2.37-.26-.63-.53-.55-.73-.56h-.62c-.22 0-.57.08-.87.4-.3.32-1.14 1.09-1.14 2.66s1.16 3.08 1.32 3.29c.16.21 2.29 3.43 5.55 4.81.78.33 1.38.53 1.85.67.78.24 1.48.21 2.04.13.62-.09 1.92-.77 2.19-1.52.27-.74.27-1.38.19-1.51-.08-.14-.3-.22-.62-.38Z"/></svg>';

  panel.append(header, body);
  body.append(message, links);
  chat.append(panel, label, button);
  document.body.appendChild(chat);

  const setOpen = (open) => {
    chat.classList.toggle("open", open);
    button.setAttribute("aria-expanded", String(open));
    button.setAttribute("aria-label", open ? "Cerrar chat de WhatsApp" : "Abrir chat de WhatsApp");
  };

  button.addEventListener("click", () => setOpen(!chat.classList.contains("open")));
  document.addEventListener("click", (event) => {
    if (!chat.contains(event.target)) setOpen(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && chat.classList.contains("open")) {
      setOpen(false);
      button.focus();
    }
  });
})();
