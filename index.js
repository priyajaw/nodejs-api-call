const express = require("express");
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const app = express();
app.use(express.json());

const configuration = new Configuration({
    apiKey:process.env.OPEN_AI_KEY
})
const openai = new OpenAIApi(configuration);
app.post("/data", async (req, res) => {
    try {
        const { prompt } = req.body;
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}
      
            `,
            temperature: 0,
            top_p: 0.1,
            max_tokens: 64,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
            // stop:["\n"],

        });
        return res.status(200).json({
            success: true,
            data:response.data.choices[0].text
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            error: error.response ? error.response.data : "there is issue"
        });
    }

})
const port = process.env.POST || 5000;
app.listen(port, () => console.log(`server listening on port ${port}`));