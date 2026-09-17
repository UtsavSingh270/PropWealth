import mongoose from "mongoose";
const LeadSchema = new mongoose.Schema({
  name:{type:String,required:true,trim:true},email:{type:String,required:true,trim:true,lowercase:true},
  phone:{type:String,required:true,trim:true},normalizedPhone:{type:String,index:true},message:{type:String,trim:true,default:""},
  action:{type:String,enum:["booking","strategy"],required:true},propertySlug:{type:String,required:true},
  propertyTitle:{type:String,required:true},consent:{type:Boolean,required:true},
  budget:String,timeframe:String,experience:String,goal:String,appointmentDate:String,status:{type:String,enum:["New","Contacted","Qualified","Closed"],default:"New"},source:{type:String,default:"website"},
},{timestamps:true});
export default mongoose.models.Lead || mongoose.model("Lead",LeadSchema);
