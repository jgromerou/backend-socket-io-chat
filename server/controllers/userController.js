import User from '../models/userModel';
import bcrypt from 'bcrypt';

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.status(400).json({
        msg: 'Username already used',
      });

    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.status(400).json({
        msg: 'Email already used',
      });

    let user = new User(req.body);

    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(password, salt);

    await user.save();
    res.status(201).json({
      msg: 'User created',
      name: user.username,
      user: user,
      uid: user._id,
    });
  } catch (error) {
    res.status(400).json({
      msg: 'The user was not created.',
    });
  }
};
