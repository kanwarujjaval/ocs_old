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
    tags: [{ type: String }],           //array of tags, to be limited to max 6 using custom logic
    category: { type: String },
    rating: { type: String },
    module: [                          //array of included videos/presentations/ any content
        {
            title: { type: String },
            createdOn: { type: Date, default: Date.now },
            updateOn: { type: Date },
            video: { type: String },
            rating: { type: String },
            description: { type: String }
        }
    ],
});

/*
 * Course Schema Methods
 */


exports.courseModel = mongoose.model('course', courseSchema);