import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ResourceSchema = new Schema(
  {
    categoryLaId: Schema.Types.ObjectId,
    categoryLbId: Schema.Types.ObjectId,
    tagId: [Schema.Types.ObjectId],
    title: String,
    description: String,
    text: String,
    authorId: Schema.Types.ObjectId,
    viewCount: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
    dateCreated: { type: Date, default: Date.now },
    dateModified: { type: Date, default: Date.now },
  },
  { collection: 'resource' },
);

ResourceSchema.index({
  categoryId: 1,
  tagId: 1,
  authorId: 1,
});

const Resource = mongoose.model('Resource', ResourceSchema);

export default Resource;
