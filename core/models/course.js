var mongoose = require('mongoose'),
    schema = mongoose.Schema;

/*
 * Schema for course
 */

courseSchema = new schema({
    name: String,
    description: String,
    _creator: { type: schema.Types.ObjectId, ref: 'user' },
    createdOn: { type: Date, default: Date.now },
    updatedOn: { type: Date },
    content: [{ type: String }],        //array of included videos/presentations/ any content
    tags: [{ type: String }],           //array of tags, to be limited to max 6 using custom logic
    category: { type: String },
    rating: { type: String }
});

/*
 * Course Schema Methods
 */


exports.courseModel = mongoose.model('course', courseSchema);