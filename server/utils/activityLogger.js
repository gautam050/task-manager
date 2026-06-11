const ActivityLog = require('../models/ActivityLog');

const logActivity = async ({ userId, action, entity = '', entityId = null, details = '', ipAddress = '' }) => {
  try {
    await ActivityLog.create({ userId, action, entity, entityId, details, ipAddress });
  } catch (err) {
    // Logging should never crash the main request
    console.error('Activity log error:', err.message);
  }
};

module.exports = logActivity;