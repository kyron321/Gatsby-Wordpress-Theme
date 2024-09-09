import * as React from "react";
import { v4 as uuidv4 } from 'uuid';
import "../scss/blocks/featured-skills.scss";

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

const findItemDescription = (children) => {
    let itemDescriptions = [];
    React.Children.forEach(children, child => {
        if (React.isValidElement(child)) {
            console.log('Processing child:', child);
            if (child.type === 'p' && child.props.className === 'item-description') {
                console.log('Found item description:', child.props.children);
                itemDescriptions.push(child.props.children);
            }
            if (child.props.children) {
                itemDescriptions = itemDescriptions.concat(findItemDescription(child.props.children));
            }
        }
    });
    return itemDescriptions;
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

const FeaturedSkills = ({ attribs, children }) => {
    console.log('Children:', children);
    const h2Element = children.find(child => child.type === 'h2');
    const h2Text = h2Element ? h2Element.props.children : '';

    const pElement = children.find(child => child.type === 'p');
    const pText = pElement ? pElement.props.children : '';

    const itemNames = findItemNames(children);
    const itemDescriptions = findItemDescription(children);
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

    const innerContainerClasses = ["featured-skills-block"];
    if (attribs["data-attribute"] === "1") {
        innerContainerClasses.push("text-right");
    }

    return (
        <section className={innerContainerClasses.join(' ')} id={sectionId} ref={sectionRef}>
            <div className="featured-skills-inner-container">
                <h2 className="featured-skills-h2">{h2Text}</h2>
                <h3 className="featured-skills-h3">{pText}</h3>
                <div className="featured-skills">
                    {itemNames.map((itemName, index) => {
                        return (
                            <div key={index} className="featured-skill">
                                <p className="item-name">{itemName}</p>
                                <img className="featured-skill-image" src={images[index]} alt={itemName} />
                                <p className="item-description">{itemDescriptions[index]}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default FeaturedSkills;