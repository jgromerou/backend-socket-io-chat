import { request, response } from 'express';
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

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
      return res.status(400).json({
        msg: 'Incorrect username or password',
      });

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid)
      return res.status(400).json({
        msg: 'Incorrect username or password',
      });
    delete user.password;

    res.status(200).json({
      msg: 'User logged in correctly',
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

export const setAvatar = async (req = request, res = response) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(userId, {
      isAvatarImageSet: true,
      avatarImage,
    });
    res.status(200).json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (error) {
    res.status(400).json({
      msg: 'The avatar was not setted.',
    });
  }
};
