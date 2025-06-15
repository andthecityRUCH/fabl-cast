// services/supabaseService.js
const supabase = require('../config/supabaseClient');
const { v4: uuidv4 } = require('uuid');

exports.uploadAudio = async (title, audioBuffer) => {
  const filename = `${uuidv4()}.mp3`;
  const { data, error } = await supabase.storage
    .from('audio')
    .upload(filename, audioBuffer, {
      contentType: 'audio/mpeg'
    });

  if (error) throw error;

  const { publicUrl } = supabase.storage.from('audio').getPublicUrl(filename).data;
  return publicUrl;
};
