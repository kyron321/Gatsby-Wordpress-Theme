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
    const email = children.find(child => child.type === 'h2');

    const sectionId = React.useMemo(() => uuidv4(), []);
    const sectionRef = React.useRef(null);

    return (
        <section className="contact-container" id={sectionId} ref={sectionRef}>
          <div className="contact-content">
            <h2 className="contact-h2">Contact Me</h2>
            <form action="" method="POST">
              <div>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div>
                <label htmlFor="message">Message:</label>
                <textarea id="message" name="message" required></textarea>
              </div>
              <button type="submit">Send</button>
            </form>
          </div>
        </section>
      );
}

export default Contact;