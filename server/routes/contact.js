const express = require('express');
const { validationResult } = require('express-validator');
const { contactRules } = require('../utils/validators');
const { sendContactEmail } = require('../utils/mailer');

const router = express.Router();

// POST /api/contact - Handles submissions from the portfolio's contact form.
router.post('/', contactRules, async (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    // 422 Unprocessable Entity for validation failures
    return res.status(422).json({
      errors: result.array()
    });
  }

  try {
    const {name, email, phone, message} = req.body;

    // Trigger the mailer utility
    await sendContactEmail({
      name,
      email,
       phone, // phone is optional, but the mailer handles it
      message
    });

    console.log(`[Contact] New message from ${name} <${email}>`);

    res.status(200).json({
      success: true,
      message: "Message received! I'll try to get back to you within 24-48 hours."
    });

  } catch (err) {
     console.error('SMTP Error:', err.message);

    res.status(500).json({
      success: false,
      message: 'Seems like our mail server is having problems. Please try again later or reach out via LinkedIn!'
    });
  }
});

module.exports = router;



