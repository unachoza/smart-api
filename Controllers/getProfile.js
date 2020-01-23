const getProfile = async (req, res, db) => {
  const { id } = req.params;
  try {
    const thisUSer = await db
      .select('*')
      .from('users')
      .where({ id: id });
    console.log(thisUSer);
    return thisUSer.length ? res.json(thisUSer) : res.status(400).json('user not found');
  } catch (error) {
    console.log(error)
  }
  
}
module.exports = {
  getProfile : getProfile
}
  
