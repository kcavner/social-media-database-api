
const { Schema, model } = require('mongoose');


const thoughtSchema = new Schema(
    {
        thoughtText:{
            type: String,
            required: true,
            max_length: 280,
        },
        createdAt:{
            type: Date,
            default: Date.now,
        },
        username:{
            type:String,
            required:true,
        },
        reactions: [
            {
              reactionBody: {
                type: String,
                required: true,
                minlength: 1,
                maxlength: 280,
              },
              username: {
                type: String,
                required: true,
              },
              createdAt: {
                type: Date,
                default: Date.now,
                get: (timestamp) => moment(timestamp).format('YYYY-MM-DD hh:mm:ss'),
              },
            },
          ],

    },
    {
        toJSON: {
          virtuals: true,
          getters:true
        },
       
    }
)


thoughtSchema.virtual('friendCount').get(function() {
    return this.reactions.length;
  });

  const Thought = model('thought', thoughtSchema);

module.exports = Thought