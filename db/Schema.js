const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // phoneno: {
    //     type: String,
    //     required: true
    // },
    // countrycode: {
    //     value: {
    //         type: String,
    //         required: true
    //     },
    //     label: {
    //         type: String,
    //         required: true
    //     }
    // },
    // location: {
    //     latitude: {
    //         type: String,
    //         required: true
    //     },
    //     longitude: {
    //         type: String,
    //         required: true
    //     }
    // },
    ipaddress :{
        type : String
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
// phoneno: '6260595903',
// countrycode: { value: 'IN', label: 'India' },
// location: { latitude: '23.5088962', longitude: '77.8245664' }