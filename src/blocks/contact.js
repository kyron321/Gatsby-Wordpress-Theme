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

    console.log(findItemNames(children));

    return (
      <section className="contact-container" id={sectionId} ref={sectionRef}>
      <div className="contact-content">
        <h2 className="contact-h2">Contact Me</h2>
        <p className="email">Please feel free to send over any questions or opportunities to <a href={`mailto:${email}`}>{email}</a>, or use the form below.</p>
        <form action="https://formspree.io/f/xjkbdpwk" method="POST">
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" placeholder="Enter Name" required />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="Enter Email" required />
          </div>
          <div>
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" placeholder="Enter Message" required></textarea>
          </div>
          <button type="submit">Send</button>
        </form>
      </div>
    </section>
      );
}

export default Contact;