import * as React from "react";
import { v4 as uuidv4 } from 'uuid';
import "../scss/blocks/two-column-image.scss";

const TwoColumnImage = ({ attribs, children }) => {
    const h2Element = children.find(child => child.type === 'h2');
    const h2Text = h2Element ? h2Element.props.children : '';

    const pElement = children.find(child => child.type === 'p');
    const pText = pElement ? pElement.props.children : '';

    const sectionId = React.useMemo(() => uuidv4(), []);

    return (
        <section className="two-column-image-container" id={sectionId}>
            <div className="two-column-image-inner-container">
                <h2 className="two-column-image-h1">{h2Text}</h2>
                <p className=".two-column-image-paragraph">{pText}</p>
            </div>
        </section>
    );
}

export default TwoColumnImage;