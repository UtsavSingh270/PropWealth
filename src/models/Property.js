import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema({
  slug: { type: String, unique: true, required: true }, title: String, suburb: String,
  state: String, category: String, status: String, price: Number, beds: Number,
  baths: Number, cars: Number, area: Number, yield: Number, growth: String, image: String,
  images: [String], description: String,
  media:[{url:String,type:{type:String,enum:["image","video"]},name:String,mime:String,size:Number}],visible:{type:Boolean,default:true},featured:{type:Boolean,default:false},
}, { timestamps: true });

export default mongoose.models.Property || mongoose.model("Property", PropertySchema);
