const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const {_isValidRegister} = require('../helpers/index');

const jwt = require('jsonwebtoken');
const { bool, boolean } = require('@hapi/joi');

const UserSchrema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    confirmed : {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: "owner",
        enum: ["owner",  "admin"]
    },
    favorites: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }],
    },
});

UserSchrema.set("toJSON", {
    transform: function(doc, returned, options) {
      returned.id = returned._id;
      delete returned._id;
    }
});


  module.exports = mongoose.model('User', UserSchrema,"users");
  
