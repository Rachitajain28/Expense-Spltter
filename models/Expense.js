const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    paidBy: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    splitAmong: [
      {
        member: String,
        amount: Number,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", expenseSchema);
