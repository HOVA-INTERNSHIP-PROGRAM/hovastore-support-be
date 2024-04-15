// Assuming translateText is intended to be used directly or in a route/middleware
async function translateText(text, targetLang) {
    if (!text) return null;

    try {
        const translate = (await import('translate')).default;
        const res = await translate(text, targetLang);
        return res
    } catch (err) {
        console.error(err);
        return null;
    }
}


export default translateText