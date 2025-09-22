import { useState } from 'react';

const initialForm = { name: '', email: '', message: '' };

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({ message: 'Request failed' }));
        throw new Error(data.message || 'Failed to send message');
      }
      setStatus('success');
      setForm(initialForm);
    } catch (err) {
      setStatus('error');
      setError(err.message || 'Something went wrong');
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl w-full space-y-6 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Get In Touch</h3>
        <p className="text-gray-600 dark:text-gray-300">I'd love to hear from you. Send me a message!</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="name">Name</label>
          <input 
            id="name" 
            name="name" 
            value={form.name} 
            onChange={handleChange} 
            required 
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800 transition-colors" 
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="email">Email</label>
          <input 
            id="email" 
            type="email" 
            name="email" 
            value={form.email} 
            onChange={handleChange} 
            required 
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800 transition-colors" 
            placeholder="your@email.com"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="message">Message</label>
        <textarea 
          id="message" 
          name="message" 
          rows="5" 
          value={form.message} 
          onChange={handleChange} 
          required 
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800 transition-colors resize-none" 
          placeholder="Tell me about your project or just say hello!"
        />
      </div>
      
      <button 
        type="submit" 
        disabled={status === 'submitting'} 
        className="w-full inline-flex items-center justify-center px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
      >
        {status === 'submitting' ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending...
          </>
        ) : (
          'Send Message'
        )}
      </button>
      
      {status === 'success' && (
        <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800">
          <p className="text-green-700 dark:text-green-300 text-center">✅ Message sent successfully! I'll get back to you soon.</p>
        </div>
      )}
      {status === 'error' && (
        <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800">
          <p className="text-red-700 dark:text-red-300 text-center">❌ {error}</p>
        </div>
      )}
    </form>
  );
}
