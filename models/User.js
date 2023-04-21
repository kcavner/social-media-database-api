const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
        validator: function(v) {
          return /^\S+@\S+\.\S+$/.test(v);
        },
        message: props => `${props.value} is not a valid phone number!`
      },
      required: [true, 'User phone number required']
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'ThoughtSchema'
      }],
      friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
      }],
      
},
{
  toJSON: {
    getters: true,
    virtuals: true,
  },
 
}
);

userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
  });

const User = model('user', userSchema);

module.exports = User;