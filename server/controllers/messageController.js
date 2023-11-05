import Message from '../models/messageModel';

export const addMessage = async (req, res) => {
  try {
    const { from, to, message } = req.body;
    const data = await Message.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    if (data) {
      res.status(200).json({
        msg: 'Message added successfully.',
      });
    } else {
      res.status(400).json({
        msg: 'Failed to add message to the database',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: 'Failed to add message to the database',
    });
  }
};

export const getAllMessage = async (req, res) => {
  try {
    const { from, to } = req.body;

    const messages = await Message.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    console.log(messages);

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    res.json(projectedMessages);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: 'Failed to get messages to the database',
    });
  }
};
