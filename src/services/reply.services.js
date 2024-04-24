import Reply from "../models/reply.model";
import Feedback from "../models/feedback.model";

// service to retrieve all replies
export const getReplies = async () => {
    return await Reply.find().populate({
      path: "feedback",
      select: "names email feedback"
    }).populate({
      path: "user",
      select: "name img",
    });
};
 
// service to retrieve all replies
export const getReply = async (id) => {
  const reply = await Reply.findById(id).populate({
    path: "feedback",
    select: "names email feedback"
  }).populate({
    path: "user",
    select: "name img",
  });
  if(!reply){
    throw new Error('Reply not found');
  }
    return reply;
}; 

// service to create a reply
export const createReply = async (message, userId, feedbackId) => {

  const feedback = await Feedback.findById(feedbackId);
  if(!feedback){
    throw new Error('Feedback not found');
  }

  const reply = await Reply.create({
    message,
    user: userId,
    feedback: feedback.id,
  });
  await Feedback.findByIdAndUpdate(feedback.id, 
    {$push: {'replies': reply._id}},
    {new: true}
  );
  return reply;
};

// service to delete reply
export const updateReply = async (id, message) => {
  const reply = await Reply.findById(id);
  if(!reply){
    throw new Error("Reply not found");
  }
  
  return await Reply.findByIdAndUpdate(id, { message });
};

// service to delete reply
export const deleteReply = async (id) => {
  const reply = await Reply.findById(id);
  if(!reply){
    throw new Error("Reply not found");
  }
  
  return await Reply.findByIdAndDelete(id);
};