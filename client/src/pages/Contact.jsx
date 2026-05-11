import { useState } from 'react';
import ContactForm from '../components/forms/ContactForm';

// Contact page.  form logic to ContactForm component
const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied]       = useState(false);
  const email = import.meta.env.VITE_CONTACT_EMAIL || "admin@franklyn.dev";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="page-section">
      {submitted && (
        <div className="success-banner" role="alert">
          Message sent! I'll get back to you soon.
        </div>
      )}

      <ContactForm onSuccess={() => setSubmitted(true)} />

      <section style={{ marginTop: '2.5rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Direct Contact</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <a href={`mailto:${email}`} className="email-link">Email me</a>
          <button 
            onClick={copyToClipboard}
            className={`copy-button ${copied ? 'success' : ''}`}
            title="Copy email address"
          >
            {copied ? '✅ Copied!' : '📋 Copy Email'}
          </button>
        </div>
      </section>
    </section>
  );
};

export default Contact;
