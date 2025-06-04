import React, { useRef, useState } from 'react';
import emailjs from "@emailjs/browser"

const Contact = () => {
    const form = useRef();
    const [status, setStatus] = useState('');

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs
            .sendForm(
                "service_jqxlq25", // Service ID
                "template_lgo7r82", // Template ID
                form.current,
                "jVe5OY5OCF-c8ppvN" // Public Key
            )
            .then(
                (result) => {
                    console.log("Email sent successfully:", result);
                    setStatus('success');
                    alert("Message sent successfully!");
                },
                (error) => {
                    console.error("Detailed error:", error);
                    setStatus('error');
                    alert(`Failed to send message: ${error.text}`);
                }
            );

        e.target.reset();
    };
    return (
        <div>
            <div
                className="w-full h-[30vh] bg-[url('/src/assets/images/banner.webp')] flex justify-center items-center">
                <h1 className='text-4xl font-bold text-amber-50'>CONTACT</h1>
            </div>

            <div className='flex flex-col lg:flex-row p-5 lg:p-3 gap-3 lg:gap-5 items-center justify-center overflow-hidden'>
                <div className='lg:w-[45vw] h-[50vh]'>
                <iframe className='w-full h-full' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3232.1933918333184!2d-7.536426624544434!3d33.60379264127718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cdb2f812837f%3A0xbbcfc74fbc11b2d9!2sLionsGeek!5e1!3m2!1sen!2sma!4v1748871872873!5m2!1sen!2sma" width='auto' height="auto" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
                <div className='w-full lg:w-[40vw] flex flex-col justify-start items-start gap-4 lg:gap-6 p-5 '>
                    <h2 className='text-2xl sm:text-3xl lg:text-3xl font-semibold text-gray-900'>
                        Send us your message</h2>
                    <form className='w-full' ref={form} onSubmit={sendEmail}>
                        <div>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-black/50 font-semibold mb-2">Name</label>
                                    <input
                                        type="text"
                                        name="user_name"
                                        className="w-full  border border-gray-700 rounded-lg px-4 py-3 text-black  focus:outline-none transition-colors"
                                        placeholder="Your Name"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-black/50 font-semibold mb-2">Email</label>
                                    <input
                                        type="email"
                                        name="user_email"
                                        className="w-full  border border-gray-700 rounded-lg px-4 py-3 text-black  focus:outline-none transition-colors"
                                        placeholder="your.email@example.com"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-black/50 font-semibold mb-2">Phone</label>
                                    <input
                                        type="tel"
                                        name="user_phone"
                                        className="w-full  border border-gray-700 rounded-lg px-4 py-3 text-black  focus:outline-none transition-colors"
                                        placeholder="Your Phone"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-black/50 font-semibold mb-2">Message</label>
                                    <textarea
                                        rows="3"
                                        name="message"
                                        className="w-full  border border-gray-700 rounded-lg px-4 py-3 text-black  focus:outline-none transition-colors resize-none"
                                        placeholder="Tell me about your project..."
                                        required
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className=" border-1 bg-black text cursor-pointer text-white font-semibold py-3 px-5 rounded-lg transition-colors"
                                >
                                    Send Message
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default Contact;