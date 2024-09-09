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
            test
        </section>
    );
}

export default Contact;