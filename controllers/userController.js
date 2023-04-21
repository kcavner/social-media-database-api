const { ObjectId } = require('mongoose').Types;
const { User, Thought, Reaction } = require('../models');


  module.exports = {

    // Get all users
    async getUsers(req, res) {
      try {
        const users = await User.find();
  
        const userObj = {
          users
        };
  
        res.json(userObj);
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    },

    /
    async getSingleUser(req, res) {
      try {
        const user = await User.findOne({ _id: req.params.userId })
          .select('-__v');
  
        if (!user) {
          return res.status(404).json({ message: 'No user with that ID' })
        }
  
        res.json({
          user,
    
        });
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    },

    // create a new user
    async createUser(req, res) {
      try {
        const user = await User.create(req.body);
        res.json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    },

// update a user
    async updateUser(req, res) {
      try {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        );
    
        if (!updatedUser) {
          return res.status(404).json({ message: 'No user found' });
        }

      
        res.json(updatedUser);
      } catch (err) {
        res.status(500).json(err);
      }
    },

    // delete a user
    async deleteUser(req, res) {
      try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });
  
        if (!user) {
          res.status(404).json({ message: 'No user with that ID' });
        }
   
        res.json({ message: 'User deleted!' });
      } catch (err) {
        res.status(500).json(err);
      }
  },

      // create friend
      async createFriend(req, res) {
        try {
          const userId = req.params.userId;
          const friendId = req.params.friendId;
      
          const [user, friend] = await Promise.all([
            User.findById(userId),
            User.findById(friendId),
          ]);
      
          if (!user || !friend) {
            return res.status(404).json({ message: 'User or friend not found' });
          }
      
          if (user.friends.includes(friendId)) {
            return res.status(400).json({ message: 'Friend already added' });
          }
      
          user.friends.push(friendId);
          friend.friends.push(userId);
      
          await Promise.all([user.save(), friend.save()]);
      
          res.json({ message: 'Friend created!' });
        } catch (err) {
          res.status(500).json(err);
        }
      },
        // delete a user
        async deleteFriend(req, res) {
          try {
            const user = await User.findById(req.params.userId);
            const friendId = req.params.friendId;
        
            if (!user) {
              return res.status(404).json({ message: 'User not found' });
            }
        
            const friendIndex = user.friends.indexOf(friendId);
            if (friendIndex === -1) {
              return res.status(404).json({ message: 'User is not a friend' });
            }
        
            user.friends.splice(friendIndex, 1);
            await user.save();
        
            res.json({ message: 'Friend deleted!' });
          } catch (err) {
            res.status(500).json(err);
          }
        }
      }
