'use strict';

const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true, minlength: 3, maxlength: 50 },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true, maxlength: 100 },
    password: { type: String, required: true, minlength: 6 },
  },
  { timestamps: true }
);

module.exports = model('User', userSchema);


