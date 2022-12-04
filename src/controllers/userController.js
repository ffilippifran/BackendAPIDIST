const UserDAO = require("../dao/userDao");
const RestaurantDAO = require("../dao/restaurantDao");
var mongoose = require('mongoose');

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
    let restos = []
    try {
        const user = await UserDAO.getFavorites(req.user._id);
        let favoritos = Object.values(user.favorites)
        const lenght = favoritos.length

        if (user) {
          for await(element of favoritos){
            let id = element.trim()
            id = await mongoose.mongo.ObjectId(id)
            let restaurant = await RestaurantDAO.readById(id)
            restos.push(await restaurant)
            console.log("resto: ",restos)
          };
          return res.send(restos);
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

module.exports.checkFavorites = async (req, res, next) => {
  try {
      const user = await UserDAO.getFavorites(req.user._id);

      if (user) {
        if(user.favorites.includes(req.params.restid)){
          return res.status(200).send(true);
        }
        else{
          return res.status(200).send(false);
        }
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
module.exports.addfavorites = async function(req, res){
    if(!req.body.restaurant) return res.status(400).send({success: false, error: "Solicitud Incorrecta"});
    console.log(req.user.email)
    const user =  await UserDAO.findUserByEmail(req.user.email)

    if(user.favorites.includes(req.body.restaurant)){
      const favorites = await UserDAO.removeFavorites(user._id,req.body.restaurant)
      return res.status(200).send({
        favorites
      });
    }
    else{
      const favorites = await UserDAO.addFavorites(user._id,req.body.restaurant)
      return res.status(200).send({
        favorites
      });
    }
}
