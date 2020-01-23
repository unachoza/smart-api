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
  sendImage : sendImage
}
