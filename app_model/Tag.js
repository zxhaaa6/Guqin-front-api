const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TagSchema = new Schema({
    name: String,
    nameEn: String,
    description: String,
    viewCount: Number,
    active: Boolean,
    dateCreated: { type: Date, default: Date.now },
    dateModified: { type: Date, default: Date.now }
}, { collection: 'tag' });

// TagSchema.index({
//     active: 1
// });

const Tag = mongoose.model('Tag', TagSchema);

module.exports = Tag;