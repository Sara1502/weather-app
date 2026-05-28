export default async function handler(req, res) {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
        return res.status(400).json({ error: 'Localização não encontrada' });
    }

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${promess.env.OPENWEATHER_API_KEY}&lang=pt_br&units=metric`
        );
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar informações na API' });
    }
}