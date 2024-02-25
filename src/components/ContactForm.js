import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const formElement = event.target;
    const formData = new FormData(formElement);

    formData.append("access_key", "88eeb5d1-5c86-48bf-bf34-b255452947af");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
      });

      if (res.ok) {
        const data = await res.json();
        // Clear form fields
        formElement.reset();
        setFormData({
          name: "",
          email: "",
          message: ""
        });
      } else {
        console.error("Error:", res.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen flex-container">
      <form onSubmit={onSubmit} className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <div className="mb-6">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">Name</label>
          <input type="text" autoFocus name="name" id="name" required value={formData.name} onChange={handleChange} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-black" />
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email</label>
          <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-black" />
        </div>
        <div className="mb-6">
          <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-700">Message</label>
          <textarea name="message" id="message" rows="4" required value={formData.message} onChange={handleChange} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md resize-none focus:outline-none focus:border-black"></textarea>
        </div>
        <div className="text-center">
          <button type="submit" className="inline-block w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-transparent hover:text-black focus:outline-none focus:bg-transparent focus:text-black">Submit Form</button>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
