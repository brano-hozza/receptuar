import mongoose from 'mongoose'

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, strict: true, strictQuery: true }
)
export default mongoose.model('Post', schema, 'post')
