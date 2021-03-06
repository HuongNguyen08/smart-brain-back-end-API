
const handleProfileGet = (req, res, db) => {
    const { id } = req.params; 
    db.select('*').from('users').where({id})
    .then(user => {
        if(user.length) {
            res.json(user[0]);
        } else {
            res.status(400).json('Not found')
        }
    })
    .catch(err => res.status(400).json('Error getting user'))
    // let found = false;
    // // database.users.forEach(user => {
    // //     if (user.id === id) {
    // //         found = true;
    // //         return res.json(user);
    // //     }
    // // }) --> the old statements with assummed DB 
    // if (!found) {
    //     res.status(404).json('Not found');
    // }
}

module.exports = {
    handleProfileGet: handleProfileGet
}