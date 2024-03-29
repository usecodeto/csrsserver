const mongoose = require("mongoose");
const moment = require('moment-timezone');
const indianTimeZone = 'Asia/Delhi'; // Indian Standard Time (IST)
// const dateIndia = moment.tz(Date.now(), "Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss)");
// console.log(dateIndia);
const EmergencySchema = new mongoose.Schema({
  user:{
    username: { type: String,
      required: [true , "Name is required"],
     },
   rollNo : { type: String,
     required: [true , "Roll number is required"],
   },
   imageUrl: {
     type: String,
     required: false,
   },
   publicId: {
     type: String,
     required: false,
   },
   email: {
     type: String, required: [true, 'email is required'],

     validate: {
       validator: function (v) {
         // Regular expression for email validation
         return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
       },
       message: props => `${props.value} is not a valid email address!`
     }
   },
   userId: { type: String, required: [true, 'user id is required '] },
   phone: {
     type: String,
     validate: {
       validator: function (v) {
         return /^\d{10}$/.test(v);
       },
       message: props => `${props.value} is not a valid phone number!`
     },
   },
   contacts: [
     {
       contactName: {
         type: String,
         required: [true, 'Contact is required'],
       },
       userId: {
         type: String,
       },
       contactPhone:{
         type: String,
       },
       contactImageUrl:{
         type: String,
       },
       isUser :{
         type : Boolean,
         default : false
       }
     },
   ],
  },
  status: {
    type: String,
    required: true,
  },
  latitude: {
    type: String,
    required: true,
  },
  longitude: {
    type: String,
    required: true,
  },
  landmark:{
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: () => moment().tz(indianTimeZone).toDate(), // Store current time in IST
  },
  resolvedOn: {
    type: Date,
    required: false,
  },
  timeTakenToResolve: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  sensitivity: {
    type: String,
    required: false,
  },
});


const Emergency = mongoose.model("emergency", EmergencySchema);
module.exports = { Emergency };
