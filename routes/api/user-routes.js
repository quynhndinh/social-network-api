const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/user-controller');

// /api/users
// The endpoint is repeated in the following code
// router.get("/", (req, res) => {
//   console.log("GET /");
//   // ...
//   res.send("GET /");
// });

// router.post("/", (req, res) => {
//   console.log("POST /");
//   //  ...
//   res.send("POST /");
// });

router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;
