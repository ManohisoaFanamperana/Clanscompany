document.getElementById("searchClan").addEventListener("click", async () => {
  const tag = document.getElementById("clanTag").value.trim();
  if (!tag) return alert("Entre un tag de clan (#...)");

  try {
    const res = await fetch(`/api/clan?tag=${encodeURIComponent(tag)}`);
    const data = await res.json();

    if (data.reason || data.error) {
      alert(data.reason || data.error);
      return;
    }

    const clanInfo = document.getElementById("clanInfo");
    const members = document.getElementById("members");

    clanInfo.innerHTML = `
      <h2 class="text-xl font-bold mb-2">${data.name} (${data.tag})</h2>
      <p>Niveau : ${data.clanLevel}</p>
      <p>Ligue : ${data.warLeague?.name ?? "N/A"}</p>
      <p>Points : ${data.clanPoints}</p>
    `;
    clanInfo.classList.remove("hidden");

    members.innerHTML = `
      <h3 class="text-lg font-semibold mb-2">Membres (${data.members})</h3>
      <div class="overflow-x-auto">
        <table class="min-w-full border">
          <thead>
            <tr class="bg-gray-200 text-left">
              <th class="p-2">Nom</th>
              <th class="p-2">Rôle</th>
              <th class="p-2">Trophées</th>
              <th class="p-2">Dons</th>
              <th class="p-2">Reçus</th>
            </tr>
          </thead>
          <tbody>
            ${data.memberList.map(m => `
              <tr class="border-b">
                <td class="p-2">${m.name}</td>
                <td class="p-2">${m.role}</td>
                <td class="p-2">${m.trophies}</td>
                <td class="p-2">${m.donations}</td>
                <td class="p-2">${m.donationsReceived}</td>
              </tr>`).join("")}
          </tbody>
        </table>
      </div>
    `;
    members.classList.remove("hidden");

  } catch (err) {
    alert("Erreur : " + err.message);
  }
});
