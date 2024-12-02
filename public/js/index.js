const form = document.getElementById("chatForm");


form.addEventListener("submit", (e) => {
  e.preventDefault();

  const room = document.getElementById("rooms").value;
  const name = document.getElementById("name").value;

  if (!room || !name)
    return alert("Preencha todos os campos");


  sessionStorage.setItem("room", room);
  sessionStorage.setItem("name", name);

  window.location.href = "html/chat-room.html";
})