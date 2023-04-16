const app = document.getElementById('app');
const inputText = document.getElementById('input-text');
const outputText = document.getElementById('output-text');
const translateButton = document.getElementById('translate-button');
const nightModeToggle = document.getElementById('night-mode-toggle');
const languageSelect = document.getElementById('language-select');

translateButton.addEventListener('click', async () => {
    const text = inputText.value;
    const targetLanguage = languageSelect.value;
    if (text && targetLanguage) {
        const translation = await translateText(text, targetLanguage);
        outputText.value = translation;
    }
});

nightModeToggle.addEventListener('click', () => {
    const nightModeElements = [
        app, 
        ...Array.from(document.querySelectorAll('.header, .footer')), 
        inputText, 
        outputText, 
        languageSelect
    ];

    nightModeElements.forEach(element => {
        element.classList.toggle('night');
    });
});

async function translateText(text, targetLanguage) {


    const prompt = `Translate the following text to ${targetLanguage}: ${text}`;
    if (prompt) {
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    model: 'gpt-4',
                    messages: [{ role: 'user', content: prompt }],
                    temperature: 1.0,
                    top_p: 0.7,
                    n: 1,
                    stream: false,
                    presence_penalty: 0,
                    frequency_penalty: 0,
                }),
            });

            if (response.ok) {
                console.log("response", response)
                console.log("data", data)
                const data = await response.json();
                return data.choices[0].message.content;
            } else {
                console.log("response", response)
                return 'Error: Unable to process your request.';
            }
        } catch (error) {
            console.error(error);
            return 'Error: Unable to process your request.';
        }
    }

}