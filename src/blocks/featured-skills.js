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

            if (child.type === 'p' && child.props.className === 'item-description') {
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
        <section className={innerContainerClasses.join(' ')} id={sectionId} ref={sectionRef}>
            <div className="featured-skills-inner-container">
                <h2 className="featured-skills-h2 fade-in">{h2Text}</h2>
                <h3 className="featured-skills-h3 fade-in">{pText}</h3>
                <div className="featured-skills">
                    {itemNames.map((itemName, index) => {
                        return (
                            <div key={index} className="featured-skill">
                                <img className="featured-skill-image fade-in" src={images[index]} alt={itemName} />
                                <p className="item-name fade-in">{itemName}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default FeaturedSkills;