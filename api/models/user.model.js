import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    profilePicture: {
        type: String,
        default: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fdefault-profile-picture&psig=AOvVaw0-IDOmhHDXbiUliHk-Oq5H&ust=1705815802645000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCICz8Z2h64MDFQAAAAAdAAAAABAF',
    },

}, {timestamps: true} // creation and updated time stamps for later use 
);

const User = mongoose.model('User', userSchema);
export default User;