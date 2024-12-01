import { useState } from "react"
import GlobalApi from "../_utils/GlobalApi"

import './contact.css'

export default function Contact() {


let [name,setName] = useState('')
let [number,setNumber] = useState('')
let [email,setEmail] = useState('')
let [textarea,setTextarea] = useState('')



const handleSubmit = async (e) => {
    e.preventDefault();

    let data={
        "data": {
        "name": name,
        "number": number,
        "email": email,
        "des": textarea
        }
    }


    try {
        await GlobalApi.contactApi(data); 
        setName('')
        setNumber('')
        setEmail('')
        setTextarea('')
        console.log('Form submitted successfully!');
    } catch (error) {
        console.error('Error:', error);
        console.log('Failed to submit the form. Please try again.');
    }
};


return (
    <div className="contact">
        <form onSubmit={handleSubmit}>
            <div className="t-1">
                <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Enter your number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    required
                />
            </div>
            <div className="t-2">
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="t-3">
                <textarea
                    placeholder="Your message"
                    value={textarea}
                    onChange={(e) => setTextarea(e.target.value)}
                    required
                />
            </div>
            <div className="t4">
                <button type="submit">Submit</button>
            </div>
        </form>
    </div>
);
}
