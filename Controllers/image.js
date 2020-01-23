const Clarifai = require('clarifai');

//You must add your own API key here from Clarifai.
const app = new Clarifai.App({
 apiKey: 'a716a8ef2bdf4456a0a86eaf1e26a90d'
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'))
}


const sendImage = async (req, res, db) => {
  const { id } = req.body;
  try {
    const newEntriesCount = await db('users')
      .where('id', '=', id)
      .increment('entries', 1)
      .returning('entries');
  
    return res.json(newEntriesCount[0]);
  } catch (err) {
    console.log(err)
  }
    
  }



module.exports = {
  sendImage,
  handleApiCall
}
