import mongoose from "mongoose";
import PrivateMessage from "../models/privateMessageModel.js";
import User from "../models/userModel.js";

const getAll = async (req, res) => {
  try {
    const receivedMessages = await PrivateMessage.find({
      recipient: req.user.id,
    })
      .populate("user", "pseudonym picture")
      .populate("recipient", "pseudonym picture");

    const groupedReceivedMessages = {};
    receivedMessages.forEach((message) => {
      if (!groupedReceivedMessages[message.recipient.id]) {
        groupedReceivedMessages[message.recipient.id] = [message];
      } else {
        groupedReceivedMessages[message.recipient.id].push(message);
      }
    });

    const sentMessages = await PrivateMessage.find({
      user: req.user.id,
    })
      .populate("user", "pseudonym picture")
      .populate("recipient", "pseudonym picture");

    const groupedSentMessages = {};
    sentMessages.forEach((message) => {
      if (!groupedSentMessages[message.recipient.id]) {
        groupedSentMessages[message.recipient.id] = [message];
      } else {
        groupedSentMessages[message.recipient.id].push(message);
      }
    });

    res.status(200).json({
      privateMessages: {
        receivedMessages: groupedReceivedMessages,
        sentMessages: groupedSentMessages,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error in fetching privateMessage" });
  }
};

const getAllByIdUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (id === req.user.id) {
      return res
        .status(400)
        .json({ message: "User can't send privateMessage to themself" });
    }

    const recipientUser = await User.findById(id);

    if (!recipientUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const receivedMessages = await PrivateMessage.find({
      recipient: req.user.id,
      user: recipientUser._id,
    })
      .populate("user", "pseudonym picture")
      .populate("recipient", "pseudonym picture");

    const sentMessages = await PrivateMessage.find({
      user: req.user.id,
      recipient: recipientUser._id,
    })
      .populate("user", "pseudonym picture")
      .populate("recipient", "pseudonym picture");

    res
      .status(200)
      .json({ privateMessages: { receivedMessages, sentMessages } });
  } catch (error) {
    res.status(500).json({ error: "Error in fetching privateMessage" });
  }
};

const create = async (req, res) => {
  try {
    const { content, recipient } = req.body;

    if (recipient === req.user.id) {
      return res
        .status(400)
        .json({ message: "User can't send privateMessage to themself" });
    }

    const recipientUser = await User.findById(recipient);

    if (!recipientUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!recipientUser.mpEnabled) {
      return res
        .status(400)
        .json({ message: "User doesn't accept privateMessage" });
    }

    const privateMessage = await PrivateMessage.create({
      content,
      recipient,
      user: req.user.id,
    });

    res
      .status(201)
      .json({ message: "PrivateMessage has been created.", privateMessage });
  } catch (error) {
    res.status(500).json({ error: "Error in creating privateMessage" });
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const privateMessage = await PrivateMessage.findById(id);

    if (!privateMessage) {
      return res.status(404).json({ message: "PrivateMessage not found" });
    }

    if (!privateMessage.user.equals(req.user.id)) {
      return res.status(403).json({
        message:
          "User doesn't have permission to delete someone else message !",
      });
    }

    res.status(200).json({ message: "PrivateMessage has been deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error in deleting privateMessage" });
  }
};

export default {
  getAll,
  getAllByIdUser,
  create,
  deleteById,
};
