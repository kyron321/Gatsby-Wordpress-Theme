import * as React from "react"

const Banner = ({ attribs, children }) => {
  const imgElement = children.find(child => child.type === 'img');
  const imgSrc = imgElement ? imgElement.props.src : '';
  const imgAlt = imgElement ? imgElement.props.alt : '';

  const h1Element = children.find(child => child.type === 'h1');
  const h1Text = h1Element ? h1Element.props.children : '';

  return (
    <section className="banner">
      <h1>{h1Text}</h1>
      <img src={imgSrc} alt={imgAlt} />
    </section>
  );
}

export default Banner;