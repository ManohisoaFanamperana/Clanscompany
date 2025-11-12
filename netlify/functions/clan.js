
export async function handler(event) {
  const token = process.env.COC_API_TOKEN; // ← à définir dans ton dashboard Netlify
  const clanTag = event.queryStringParameters.tag || "#YOURTAG"; // exemple: #GCPPGY8

  const url = `https://api.clashofclans.com/v1/clans/${encodeURIComponent(clanTag)}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json"
      }
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: "Erreur API Clash of Clans" })
      };
    }

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
}
