const { Thought, User } = require('../models');

const thoughtController = {
  // get all thoughts
  getThoughts(req, res) {
    Thought.find()
    .then((dbThoughtData) => res.json(dbThoughtData))
    .catch((error) => res.status(500).json(error));
  },
  
  getSingleThought(req, res) {
    Thought.findOne({_id: req.params.thoughtId})
    .then((dbThoughtData) => res.json(dbThoughtData))
  },

  // create a thought
  createThought(req, res) {
    console.log(req.body);
    Thought.create(req.body)
    .then((dbThoughtData) => res.json(dbThoughtData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err)});
  },

  // update thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
    },
  // delete thought
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
        // remove thought id from user's `thoughts` field
        return User.findOneAndUpdate(
          { thoughts: req.params.thoughtId },
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'Thought Deleted' });
        }
        res.json({ message: 'Thought successfully deleted!' });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // add a reaction to a thought
  addReaction(req, res) {
    console.log(req.body);
    console.log(req.params.thoughtId);
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((reaction) =>
        !reaction
          ? res.status(404).json({ message: 'No reaction  with this id!' })
          : res.json({ message: `Reaction has been added`})
      )
      .catch((err) => res.status(500).json(err));
  },

  // remove reaction from a thought
  removeReaction(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      )
        .then((reaction) =>
          !reaction
            ? res.status(404).json({ message: 'No thought with this id!' })
            : res.json({message: `reaction Deleted`})
        )
        .catch((err) => res.status(500).json(err));
  },
};

module.exports = thoughtController;