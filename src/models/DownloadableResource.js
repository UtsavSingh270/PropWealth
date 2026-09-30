import mongoose from "mongoose";
const DownloadableResourceSchema=new mongoose.Schema({title:{type:String,required:true,trim:true},description:{type:String,required:true,trim:true},category:{type:String,default:"Guide"},image:{type:String,default:""},fileUrl:{type:String,required:true},fileName:{type:String,default:""},visible:{type:Boolean,default:true},order:{type:Number,default:0}},{timestamps:true});
export default mongoose.models.DownloadableResource||mongoose.model("DownloadableResource",DownloadableResourceSchema);
