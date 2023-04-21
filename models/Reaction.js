const { Schema, Types, model } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody:{
            type:String,
            required:true,
            max_length:280
        },
        username:{
            type:String,
            required:true
        },
        createdAt:{
            type: Date,
            default: Date.now,
        },

        
    },
    {
        toJSON: {
          virtuals: true,
        },
       
    }
)
reactionSchema.virtual('formattedCreatedAt').get(function() {
    return moment(this.createdAt).format('YYYY-MM-DD hh:mm:ss');
  });

 

const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;