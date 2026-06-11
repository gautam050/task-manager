const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    action: {
      type: String,
      enum: [
        'LOGIN',
        'REGISTER',
        'TASK_CREATED',
        'TASK_UPDATED',
        'TASK_DELETED',
        'USER_STATUS_UPDATED',
        'USER_DELETED',
      ],
      required: true,
    },
    entity: {
      type: String, // e.g. 'Task', 'User'
      default: '',
    },
    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
    details: {
      type: String, // human readable description
      default: '',
    },
    ipAddress: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

// Index for fast admin queries
activityLogSchema.index({ userId: 1 });
activityLogSchema.index({ createdAt: -1 });
activityLogSchema.index({ action: 1 });

module.exports = mongoose.model('ActivityLog', activityLogSchema);