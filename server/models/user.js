let mongoose = require('mongoose');
let mail = require('../middleware/mailer')
var CronJob = require('cron').CronJob;
var kue = require('kue')
  , queue = kue.createQueue();

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role : {
        type: String,
        default: "user"
    },
}, {timestamps: true});

userSchema .post('save', function(doc) {
    var today = new Date();    
    var mnt = today.getMinutes() + 1
    var hours = today.getHours()
    var dd = today.getDate();
    var mm = today.getMonth();
   
    var schedule = `${mnt} ${hours} ${dd} ${mm} *`   

new CronJob(schedule, function() {  

  var job = queue.create('email', {
    title: 'welcome email for tj'
  , to: 'tj@learnboost.com'
  , template: 'welcome-email'
}).save( function(err){
   if( !err ) {       
       console.log('CRON JALAN')
       mail(doc.email,doc.name)       
    }

});
}, null, true, 'Asia/Jakarta');

  });

const User = mongoose.model('User', userSchema);

module.exports = User;