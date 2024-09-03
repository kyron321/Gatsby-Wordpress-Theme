import * as React from "react";
import { v4 as uuidv4 } from 'uuid';
import "../scss/blocks/two-column-image.scss";

const findItemNames = (children) => {
    let itemNames = [];
    React.Children.forEach(children, child => {
        if (React.isValidElement(child)) {
            if (child.type === 'p' && child.props.className === 'item-name') {
                itemNames.push(child.props.children);
            }
            if (child.props.children) {
                itemNames = itemNames.concat(findItemNames(child.props.children));
            }
        }
    });
    return itemNames;
};

const findImages = (children) => {
    let images = [];
    React.Children.forEach(children, child => {
        if (React.isValidElement(child)) {
            if (child.type === 'img') {
                images.push(child.props.src);
            }
            if (child.props.children) {
                images = images.concat(findImages(child.props.children));
            }
        }
    });
    return images;
};

const TwoColumnImage = ({ attribs, children }) => {
    const h2Element = children.find(child => child.type === 'h2');
    const h2Text = h2Element ? h2Element.props.children : '';

    const pElement = children.find(child => child.type === 'p');
    const pText = pElement ? pElement.props.children : '';

    const itemNames = findItemNames(children);
    const images = findImages(children);

    const sectionId = React.useMemo(() => uuidv4(), []);

    const sectionRef = React.useRef(null);

    React.useEffect(() => {
        if (sectionRef.current) {
            const firstSection = document.querySelector(".two-column-image-container");
            if (firstSection === sectionRef.current) {
                sectionRef.current.classList.add("first");
            }
        }
    }, []);

    const innerContainerClasses = ["two-column-image-inner-container"];
    if (attribs["data-attribute"] === "1") {
        innerContainerClasses.push("text-right");
    }

    return (
        <section className="two-column-image-container" id={sectionId} ref={sectionRef}>
            <h2 className="two-column-image-h1">{h2Text}</h2>
            <div className={innerContainerClasses.join(" ")}>
                <div className="two-column-image-column-one">
                    <p className="two-column-image-paragraph">{pText}</p>
                </div>
                <div className="two-column-image-column-two">
                    <div className="grid-items">
                        {itemNames.map((itemName, index) => (
                            <div key={index} className="grid-item">
                                {images[index] && <img src={images[index]} alt={`Image ${index + 1}`} className="two-column-image-img" />}
                                <p className="two-column-image-item-name">{itemName}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default TwoColumnImage;