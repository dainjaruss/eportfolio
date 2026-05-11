const { body } = require('express-validator');

// basic rules for the contact form
const contactRules = [
  body('name')
    .trim()
    .notEmpty().withMessage('Need a name here')
    .isLength({ max: 100 }).withMessage('Name is a bit too long'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Doesn\'t look like a real email')
    .normalizeEmail(),

  body('phone')
    .optional({ checkFalsy: true }) // optional, but if they put something it better be a phone number
    .trim()
    .isMobilePhone().withMessage('That phone number looks weird'),

  body('message')
    .trim()
    .notEmpty().withMessage('Gotta leave a message!')
    .isLength({ max: 2000 }).withMessage('Whoa, too long (max 2000 chars)'),
];

module.exports = { contactRules };
