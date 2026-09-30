import mongoose from "mongoose";
const LeadSchema = new mongoose.Schema({
  name:{type:String,required:true,trim:true,default:"Newsletter subscriber"},email:{type:String,required:true,trim:true,lowercase:true},
  phone:{type:String,trim:true,default:""},normalizedPhone:{type:String,index:true},message:{type:String,trim:true,default:""},
  action:{type:String,enum:["booking","strategy","newsletter","download"],required:true},propertySlug:{type:String,default:""},
  propertyTitle:{type:String,default:""},consent:{type:Boolean,required:true},
  budget:String,timeframe:String,experience:String,goal:String,appointmentDate:String,status:{type:String,enum:["New","Contacted","Qualified","Closed"],default:"New"},source:{type:String,default:"website"},
},{timestamps:true});
const Lead = mongoose.models.Lead || mongoose.model("Lead", LeadSchema);

// Next.js development can retain the previous Mongoose model between reloads.
// Keep the active schema compatible with email-only newsletter submissions.
Lead.schema.path("phone").required(false);
Lead.schema.path("propertySlug").required(false);
Lead.schema.path("propertyTitle").required(false);
Lead.schema.path("action").enumValues = ["booking", "strategy", "newsletter", "download"];

export default Lead;
