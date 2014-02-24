var mongoose = require('mongoose'),
    schema = mongoose.Schema;

courseContentSchema = new schema({
    _course: { type: schema.Types.ObjectId, ref: 'course' },
    format: { type: String, require: true },
    video: [{ path: { type: String, require: true }, free: { type: Boolean, default: true } }]
});

courseContentSchema.methods.genToken = function () {
    return uuid.v1();
};

exports.courseContentModel = mongoose.model('courseContent', courseContentSchema);