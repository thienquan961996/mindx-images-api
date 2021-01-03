const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    title: {
      required: true,
      type: String
    },
    description: String,
    imageUrl: {
      required: true,
      type: String
    },
    userId: {
      ref: 'User',
      type: mongoose.Types.ObjectId
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true}
  }
);
PostSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'post',
});

module.exports = mongoose.model('Post', PostSchema);