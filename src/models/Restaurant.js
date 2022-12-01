const mongoose = require('mongoose');
const Schema = mongoose.Schema

const RestaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  stars: {
    type: Number,
    required: true
  },
  isClosed: {
    type: Boolean,
    required: true
  },
  location: {
    coordinates: {
      type: [Number],
      default: [0, 0]
    },
    address: {
      type: String,
      required: true
    }
  },
  operatingHours: {
    mon: {
      open: {
        type: String,
        required: false
      },
      close: {
        type: String,
        required: false
      }
    },
    tue: {
      open: {
        type: String,
        required: false
      },
      close: {
        type: String,
        required: false
      }
    },
    wed: {
      open: {
        type: String,
        required: false
      },
      close: {
        type: String,
        required: false
      }
    },
    thu: {
      open: {
        type: String,
        required: false
      },
      close: {
        type: String,
        required: false
      }
    },
    fri: {
      open: {
        type: String,
        required: false
      },
      close: {
        type: String,
        required: false
      }
    },
    sat: {
      open: {
        type: String,
        required: false
      },
      close: {
        type: String,
        required: false
      }
    },
    sun: {
      open: {
        type: String,
        required: false
      },
      close: {
        type: String,
        required: false
      }
    },
  },
  dishesTypes: [
    {
      type: String,
      enum: [
        "Comida General",
        "Comida China",
        "Comida Fast-Food",
        "Pastas",
        "Pizza",
        "Comida Peruana",
        "Comida Vegana",
        "Comida de mar",
        "Cafeteria",
        "Heladeria",
        "Bar"

      ],
      required: true
    }
  ],
  pricesRange: [
    {
      type: String,
      enum: [
        "$",
        "$$",
        "$$$",
        "$$$$"
      ],
      required: true
    }
  ],
  ownerID: {
    type: String,
    required: true
  },
  imageURL: {
    type: String,
    required: true
  },
  mediumImageURL: {
    type: String,
    required: true
  },
  thumbnailImageURL: {
    type: String,
    required: true
  },
});

RestaurantSchema.set("toJSON", {
  transform: function(doc, returned, options) {
    returned.id = returned._id;
    delete returned._id;
  }
});

module.exports = mongoose.model("Restaurant", RestaurantSchema);
