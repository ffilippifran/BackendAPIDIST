const UserDAO = require("../dao/userDao");

exports.readAll = async (req, res, next) => {
  try {
    const users = await UserDAO.readAll();

    return res.status(200).send({
        users
    });
  } catch (error) {
    return res.status(500).send({
      error
    });
  }
};

exports.readById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await UserDAO.readById(id);

    if (user) {
      return res.status(200).send({
        user
      });
    }

    return res.status(404).send({
      message: "User Not Found"
    });
  } catch (error) {
    return res.status(500).send({
      error
    });
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;

    const userUpdated = await UserDAO.update(id, req.body);

    if (userUpdated) {
      return res.status(200).send({
        userUpdated
      });
    }

    return res.status(404).send({
      message: "User Not Found"
    });
  } catch (error) {
    return res.status(500).send({
      error
    });
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;

    const userDeleted = await UserDAO.delete(id);

    if (userDeleted) {
      return res.status(200);
    }

    return res.status(404).send({
      message: "User Not Found"
    });
  } catch (error) {
    return res.status(500).send({
      error
    });
  }
};


module.exports.getfavorites = async (req, res, next) => {
    try {
        const { id } = req.params;
    
        const user = await UserDAO.getFavorites(id);
    
        if (user) {
          return res.status(200).send({
            user
          });
        }
    
        return res.status(404).send({
          message: "User Not Found"
        });
      } catch (error) {
        return res.status(500).send({
          error
        });
      }
}

module.exports.addfavorites = function(req, res){
    if(!req.user) return res.status(204).send({success: true, data: {user: null}});
    const User = getModelByName('user');
    return User.findUserByEmail(req.user.email)
        .then(user => {
            //user.addfavorites()
            res.status(200).send({success: true, data: {user}});
        }).catch(err => res.status(200).send({success: false, error: err.message}));
}
