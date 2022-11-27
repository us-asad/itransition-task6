import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  sender_name: {
    type: String,
    required: true
  },
  recipient_name: {
    type: String,
    required: true
  },
}, {
  timestamps: true,
});

const Message = mongoose.models.Message || mongoose.model("Message", messageSchema);

export default Message;