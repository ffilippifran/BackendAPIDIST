const mongoose = require("mongoose");
const {_isValidRegister} = require('../helpers/index');
const UserModel = require("../models/User");
const User = mongoose.model("User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { bool, boolean } = require('@hapi/joi');


exports.create = async data => {
    const { error } = _isValidRegister(data);

    //Si la información no es correcta, informa el error.
    if (error) {
        throw new Error(error.details[0].message);
    }
    return await User.findOne({'email' : data.email})
        .then(user => {
          if(user) throw new Error('El usuario ya existe');
          else{
            const newUser = {
                email: data.email,
                password: bcrypt.hashSync(data.password, 9),
                firstName: data.firstName,
                lastName: data.lastName,
            };

            return User.create(newUser);
          }
        })
        .then(userCreated => userCreated);
};


exports.readAll = async () => {
  try {
    return await User.find({});
  } catch (err) {
    throw err;
  }
};

exports.readById = async id => {
  try {
    return await User.findById(id);
  } catch (err) {
    throw err;
  }
};

exports.update = async (id, data) => {
  try {
    return await User.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );
  } catch (err) {
    throw err;
  }
};

exports.delete = async id => {
  try {
    return await User.findByIdAndRemove(id);
  } catch (err) {
    throw err;
  }
};

exports.findUserById = async (id) => {
    console.log(id)
    return User.findOne(id)
        .then(user => {
            return {
                _id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                favorites : user.favorites
            };
        })
}
exports.findUserByEmail = async (email) => {

    return User.findOne({email})
        .then(user => {
            return {
                _id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                favorites : user.favorites
            };
        })
}



exports.login = async (userInfo) => {
    const email= userInfo.email;
    return User.findOne({email})
        .then(user => {
            if(!user) throw new Error('Usuario o contraseña incorrectos');
            const validPassword = bcrypt.compareSync(userInfo.password, user.password);
            if(!validPassword) throw new Error('Usuario o contraseña incorrectos');

            const userObject = {
                _id: user._id,
                email: user.email,
                role: user.role,
            }
            
            let data = {}
            data.accessToken = jwt.sign(Object.assign({},userObject),process.env.TOKEN_SECRET,{
                  //El token posee una duración de 8 horas.
                  expiresIn: "8h"
              }),
            data.refreshToken = jwt.sign(Object.assign({},userObject),process.env.RTOKEN_SECRET,{
                //El refresh token posee una duración de 9 minutos.
                expiresIn: "9h"
              })
            data.firstName = user.firstName
            data.lastName = user.lastName
            data.email = user.email
            data.role = user.role
            data.uid = user._id
            return data;
        })
}

exports.addFavorites = async (id,favorite) => {
  console.log(id)
  return await User.findByIdAndUpdate(
    { _id: id},
    { $push: { favorites: favorite  } },
    { upsert: true, new: true, runValidators: true }
  )
  
}

exports.removeFavorites = async (id,favorite) => {
  
  return await User.findByIdAndUpdate(
    { _id: id},
    { $pull: { favorites: favorite  } },
    { upsert: true, new: true, runValidators: true }
  )
  
}

exports.getFavorites = async (id) => {
  return User.findById(id)
      .then(user => {
          return {
              favorites: user.favorites
          };
      })

}


