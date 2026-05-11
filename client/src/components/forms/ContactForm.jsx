import { useState } from 'react';
import api from '../../services/api';
import '../../styles/form.css';

const initialFormState = { name: '',email: '', phone: '', message: '' };

// to handle validated form submissions via the Express backend /api/contact
const ContactForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({ ...prev, [name]: value }));

    //Clear errors as the user types to keep it smooth
    if (errors[name]) {
       setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Reset state for new attempt
    setServerError('');
    setErrors({});
    setLoading(true);

    try {
      // Send it off to the API
      await api.post('/api/contact', formData);

      setFormData(initialFormState);

      if (onSuccess) onSuccess();

    } catch (err) {
      // Validation error from backend (usually express-validator)
      if (err.response?.status === 422) {
        const validationErrors = {};

        err.response.data.errors.forEach(error => {
          validationErrors[error.path] = error.msg;
        });

        setErrors(validationErrors);
      } else {
        // Generic fallback. Maybe check network connection here?
        setServerError('Something went wrong on our end. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      id="contact-form"
      className="contact-form glass-form"
      onSubmit={onSubmit}
      noValidate
    >
      <div className="form-field">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" placeholder="Your name" value={formData.name} onChange={handleInputChange} />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="example@email.com"
          value={formData.email}
          onChange={handleInputChange}
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="phone">Phone (optional)</label>
        <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} />
      </div>

      <div className="form-field">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows="5"
          placeholder="How can I help?"
          value={formData.message}
          onChange={handleInputChange}
        />
        {errors.message && <span className="error-message">{errors.message}</span>}
      </div>

      {serverError && <p className="error-message">{serverError}</p>}

      <button
        type="submit"
        className="contact-form__submit"
        disabled={loading}
      >
        {loading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
};

export default ContactForm;


