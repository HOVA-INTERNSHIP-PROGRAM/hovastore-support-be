import translate from "google-translate-api";
async function translateText(text, from = 'auto', to = 'en') {
    try {
        const res = await translate(text, { from, to });
        return res.text;
    } catch (err) {
        console.error('Translation error:', err);
        return '';
    }
}



export default translateText