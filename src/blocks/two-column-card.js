import * as React from "react";
import { v4 as uuidv4 } from 'uuid';
import "../scss/blocks/two-column-card.scss";

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

const findImage = (children) => {
    let image = null;
    React.Children.forEach(children, child => {
        if (React.isValidElement(child) && child.type === 'img') {
            image = child.props.src;
        }
    });
    return image;
};

const findWebsiteLink = (children) => {
    let link = null;
    React.Children.forEach(children, child => {
        if (React.isValidElement(child) && child.props.className === 'website-link') {
            link = {
                href: child.props.href,
                text: child.props.children
            };
        }
    });
    return link;
};

const TwoColumnCard = ({ attribs, children }) => {
    const h2Element = children.find(child => child.type === 'h2');
    const h2Text = h2Element ? h2Element.props.children : '';

    const pElement = children.find(child => child.type === 'p');
    const pText = pElement ? pElement.props.children : '';

    const itemNames = findItemNames(children);
    const image = findImage(children);
    const websiteLink = findWebsiteLink(children);

    const sectionId = React.useMemo(() => uuidv4(), []);

    const sectionRef = React.useRef(null);

    React.useEffect(() => {
        if (sectionRef.current) {
            const firstSection = document.querySelector(".two-column-card-container");
            if (firstSection === sectionRef.current) {
                sectionRef.current.classList.add("first");
            }
        }
    }, []);

    const innerContainerClasses = ["two-column-card-inner-container"];
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
        <section className="two-column-card-container fade-in" id={sectionId} ref={sectionRef}>
            <h2 className="two-column-card-h1 fade-in">{h2Text}</h2>
            <div className={innerContainerClasses.join(" ")}>
                <div className="two-column-card-column-one">
                    <p className="two-column-card-paragraph fade-in">{pText}</p>
                </div>
                <div className="two-column-card-column-two">
                    {image && <img src={image} alt="Two Column Card Image" className="two-column-card-img fade-in" />}
                    {itemNames.map((itemName, index) => (
                        <div key={index} className="two-column-card-item fade-in">
                            <p className="item-name">{itemName}</p>
                        </div>
                    ))}
                </div>
            </div>
            {websiteLink && (
                <a target="_blank" href={websiteLink.href} className="website-link fade-in">
                    {websiteLink.text}
                </a>
            )}
        </section>
    );
}

export default TwoColumnCard;