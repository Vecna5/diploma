import React, { useState } from 'react';

const IconHover = ({ src, hoverSrc, alt, className }) => {
  const [hover, setHover] = useState(false);

  return (
    <img
      src={hover ? hoverSrc : src}
      alt={alt}
      className={className}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    />
  );
};

export default IconHover;