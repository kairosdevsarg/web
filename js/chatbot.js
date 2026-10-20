
const toggle = document.getElementById("chat-toggle");
const closeButton = document.getElementById("chat-close");
const chatWindow = document.getElementById("chat-window");
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const messages = document.getElementById("chat-messages");
const options = document.querySelector(".chat-options");

function openChat() {
  chatWindow.hidden = false;
  toggle.setAttribute("aria-expanded", "true");
  chatInput.focus();
}

function closeChat() {
  chatWindow.hidden = true;
  toggle.setAttribute("aria-expanded", "false");
  toggle.focus();
}

toggle.addEventListener("click", () => {
  if (chatWindow.hidden) {
    openChat();
  } else {
    closeChat();
  }
});

closeButton.addEventListener("click", closeChat);

function addMessage(text, sender) {
  const message = document.createElement("div");
  message.className =
    sender === "user" ? "user-message" : "bot-message";

  // textContent evita interpretar el mensaje como HTML.
  message.textContent = text;
  messages.appendChild(message);
  messages.scrollTop = messages.scrollHeight;
}

function getBotResponse(question) {
  const text = question
    .toLocaleLowerCase("es")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

  if (/^(hola|buenas|buen dia|buenas tardes|buenas noches)\b/.test(text)) {
    return "¡Hola! 👋 Gracias por visitar Kairos Devs. ¿Qué te gustaría consultar?";
  }

  if (text.includes("servicio") || text.includes("que hacen")) {
    return "Podés consultar aquí los servicios de Kairos Devs. Personalizá esta respuesta con los servicios reales que ofrece tu equipo.";
  }

  if (text.includes("contacto") || text.includes("correo") || text.includes("email")) {
    return "¡Nos encantaría conversar con vos! Podés contactarnos desde la sección de contacto de nuestra web.";
  }

  if (text.includes("horario") || text.includes("atienden")) {
    return "Los horarios de atención deben configurarse con los datos reales del equipo. Consultá nuestra sección de contacto para más información.";
  }

  if (text.includes("precio") || text.includes("presupuesto") || text.includes("costo")) {
    return "Para conocer los precios o solicitar un presupuesto, contactá al equipo y contanos qué necesitás.";
  }

  if (text.includes("gracias")) {
    return "¡De nada! 😊 Estamos para ayudarte.";
  }

  return "No tengo una respuesta específica para esa consulta todavía. Probá con «servicios», «contacto», «horarios» o «precios».";
}

function sendMessage(question) {
  const text = question.trim();

  if (!text) return;

  addMessage(text, "user");

  const response = getBotResponse(text);
  addMessage(response, "bot");
}

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  sendMessage(chatInput.value);
  chatInput.value = "";
  chatInput.focus();
});

options.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-question]");

  if (!button) return;

  const questions = {
    servicios: "¿Qué servicios ofrecen?",
    contacto: "¿Cómo puedo contactarlos?",
    horarios: "¿Cuáles son sus horarios de atención?"
  };

  sendMessage(questions[button.dataset.question]);
});
