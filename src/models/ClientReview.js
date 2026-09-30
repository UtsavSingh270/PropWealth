import mongoose from "mongoose";

const ClientReviewSchema = new mongoose.Schema({
  name: { type:String, required:true, trim:true },
  photo: { type:String, default:"" },
  rating: { type:Number, min:1, max:5, default:5 },
  postedAt: { type:Date, default:Date.now },
  comment: { type:String, required:true, trim:true },
  source: { type:String, default:"Google" },
  visible: { type:Boolean, default:true },
  order: { type:Number, default:0 }
}, { timestamps:true });

export default mongoose.models.ClientReview || mongoose.model("ClientReview", ClientReviewSchema);
