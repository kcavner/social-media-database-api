const router = require('express').Router();
const {
   getThoughts,
   getSingleThought,
   createThought,
   updateThought,
   deleteThought,
   createReaction,
   deleteReaction
  } = require('../../controllers/thoughtController');
  

router.route('/').get(getThoughts).post(createThought);


router.route('/:thoughtId').get(getSingleThought).delete(deleteThought).put(updateThought)

router.route('/:thoughtId/reaction').post(createReaction)

router.route('/:thoughtId/reaction/:reactionId').delete(deleteReaction)



module.exports = router;