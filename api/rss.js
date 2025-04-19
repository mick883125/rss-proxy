export default async function handler(req, res) {
  const fetch = (await import('node-fetch')).default;

  try {
    const response = await fetch("https://www.iactualite.info/?feed=rss-fix", {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; RSS Validator/1.0)',
        'Accept': 'application/rss+xml, application/xml'
      }
    });

    const xml = await response.text();

    res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send(xml);
  } catch (err) {
    res.status(500).send("Erreur lors de la récupération du flux RSS : " + err.message);
  }
}
