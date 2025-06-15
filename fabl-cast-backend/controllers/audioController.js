// controllers/audioController.js
const openAIService = require('../services/openAIService');
const elevenLabsService = require('../services/elevenLabsService');
const supabaseService = require('../services/supabaseService');

exports.createPodcast = async (req, res, next) => {
  try {
    const { prompt, voice } = req.body;

    if (!prompt || !voice) {
      return res.status(400).json({ error: 'Missing prompt or voice' });
    }

    // Generate script from the prompt
    const script = await openAIService.generateScriptFromPrompt(prompt);

    // Synthesize voice using ElevenLabs
    const audioBuffer = await elevenLabsService.generateAudio(script, voice);

    // Generate a title for storage
    const title = prompt.slice(0, 20).replace(/\s/g, '_');

    // Upload to Supabase
    const audioUrl = await supabaseService.uploadAudio(`${title}.mp3`, audioBuffer);

    res.json({ audioUrl, script });
  } catch (err) {
    next(err);
  }
};
