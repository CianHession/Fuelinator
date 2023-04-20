import React, { useState } from 'react';
import { getDatabase, ref, push, set } from 'firebase/database';

function ContactForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !message) {
            setErrorMessage('Please fill in all required fields.');
            return;
        }

        setIsSubmitting(true);

        try {
            // Send the form data to Firebase
            const database = getDatabase();
            const contactsRef = ref(database, 'contacts');
            const newContactRef = push(contactsRef);
            const newContactKey = newContactRef.key;
            await set(newContactRef, {
                name: name,
                email: email,
                message: message
            });

            // Reset the form after submission and set email sent state to true
            setName('');
            setEmail('');
            setMessage('');
            setIsEmailSent(true);
            setErrorMessage('');
        } catch (error) {
            setErrorMessage('Sorry, there was an error submitting your form. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleBackClick = () => {
        // Navigate back to homepage
        window.location.href = '/';
    }

    return (
        <form onSubmit={handleSubmit} className="contact-form">
            <h2>Contact Us</h2>
            <p>Please Enter Your Enquiry Below:</p>
            <h6>Additionally: If you are the owner of a fuel station and you wish to have your Station Added or Removed, Please Leave Your Stations Details Below.</h6>
            <div className="form-group">
                <label htmlFor="name">Name*:</label>
                <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email*:</label>
                <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="message">Message:</label>
                <textarea name="message" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
            </div>
            <button type="submit" className="btn">Send</button>
            {isEmailSent && <p className="success-message">Thank you! Your email has been sent, we will get back to you as soon as possible.</p>}
        </form>
    );
}
export default ContactForm;