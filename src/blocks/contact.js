import * as React from "react";
import { v4 as uuidv4 } from 'uuid';
import "../scss/blocks/contact.scss";

const findItemNames = (children) => {
    let itemNames = [];
    React.Children.forEach(children, child => {
        if (React.isValidElement(child)) {
            if (child.type === 'p' && child.props.className === 'email') {
                itemNames.push(child.props.children);
            }
            if (child.props.children) {
                itemNames = itemNames.concat(findItemNames(child.props.children));
            }
        }
    });
    return itemNames;
};

const Contact = ({ attribs, children }) => {
    const email = findItemNames(children).join('').trim().replace(/\s+/g, '');

    const sectionId = React.useMemo(() => uuidv4(), []);
    const sectionRef = React.useRef(null);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    } else {
                        entry.target.classList.remove('visible');
                    }
                });
            },
            { threshold: 0.1 }
        );

        const blocks = document.querySelectorAll('.fade-in');
        blocks.forEach(block => {
            observer.observe(block);
        });

        return () => {
            blocks.forEach(block => {
                observer.unobserve(block);
            });
        };
    }, []);

    return (
        <section className="contact-container fade-in" id={sectionId} ref={sectionRef}>
            <div className="contact-content">
                <h2 className="contact-h2 fade-in">Contact Me</h2>
                <p className="email fade-in">Please feel free to send over any questions or opportunities to <a href={`mailto:${email}`}>{email}</a>, or use the form below.</p>
                <form action="https://formspree.io/f/xjkbdpwk" method="POST">
                    <div className="fade-in">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" placeholder="Enter Name" required />
                    </div>
                    <div className="fade-in">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" placeholder="Enter Email" required />
                    </div>
                    <div className="fade-in">
                        <label htmlFor="message">Message:</label>
                        <textarea id="message" name="message" placeholder="Enter Message" required></textarea>
                    </div>
                    <button type="submit" className="fade-in">Send</button>
                </form>
            </div>
        </section>
    );
}

export default Contact;