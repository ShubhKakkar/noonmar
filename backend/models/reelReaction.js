const mongoose = require("mongoose");

const reelReactionSchema = mongoose.Schema(
  {
    reelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reel",
      required: true,
      index: true
    },
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      index: true
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ReelReaction", reelReactionSchema);
