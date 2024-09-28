const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserName = new mongoose.Schema({
    name: { type: String, required: true, trim: true},
    email: { type: String, required: true, unique: true, trim: true},
    password: { type: String, required: true, trim: true}
});

// Hash du mot de passe avant sauvegarde
UserSchema.pre('save', async function(next) {
    if (!this.isModified('passwor')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();

});

module.exports = mongoose.model('User', UserSchema);