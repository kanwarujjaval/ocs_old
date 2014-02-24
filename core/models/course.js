var mongoose = require('mongoose'),
    schema = mongoose.Schema;

courseSchema = new schema({
    name: String,
    _creator: { type: schema.Types.ObjectId, ref: 'user' },
    cost : {type: String, required: true, default: '0'},
    content: { type: schema.Types.ObjectId, ref: 'courseContent' },
    createdOn: {type: Date, default: Date.now}
});

courseSchema.methods.genToken = function () {
    return uuid.v1();
};

exports.courseModel = mongoose.model('course', courseSchema);