const { ObjectId } = require('mongoose').Types;
const { User, Thought, Reaction } = require('../models');


module.exports = {

async getThoughts(req,res){
    try{
        const thoughts = await Thought.find();
        res.json(thoughts);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
},

async getSingleThought(req,res){
    try{
        const thought = await Thought.findById({ _id: req.params.thoughtId });
        if (!thought) {
          return res.status(404).json({ message: 'No thought found' });
        }
        res.json(thought)
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
},

async createThought(req,res){
    try{
        const thought = await Thought.create(req.body);
        res.json(thought);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
},

async updateThought(req,res){
    try{
        const thought = await Thought.findByIdAndUpdate(
          
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
          
          );
          if (!thought) {
            return res.status(404).json({ message: 'No thought found' });
          }
          
      res.json(thought);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
},

async deleteThought() {
  try {
    const deletedThought = await Thought.findByIdAndDelete(req.params.thoughtId);

    if (!deletedThought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    await User.updateOne({ _id: deletedThought.userId }, { $pull: { thoughts: deletedThought._id } });

    res.json({ message: 'Thought deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
},

async createReaction(req,res){
    try{
        const thought = await Thought.findById({ _id: req.params.thoughtId });
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    const reaction = await Reaction.create(req.body);
    thought.reactions.push(reaction);
    await thought.save();
    res.json(thought);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
},

async deleteReaction(req,res){
  try {
    const deletedReaction = await Reaction.findOneAndRemove({ username: req.params.reactionId });

    if (!deletedReaction) {
      return res.status(404).json({ message: 'No reaction exists' });
    }
  
    res.json({ message: 'reaction successfully deleted' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

}

