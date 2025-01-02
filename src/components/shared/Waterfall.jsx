import React from "react";
import Masonry from "react-masonry-css";

const Waterfall = ({ images }) => {
  const breakpointColumnsObj = {
    default: 4, // Number of columns at full screen
    1100: 3,    // 3 columns at 1100px
    700: 2,     // 2 columns at 700px
    500: 1,     // 1 column at 500px
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid pt-3"
      columnClassName="my-masonry-grid_column"
    >
      {images.map((image, index) => (
        <div className="waterfall-item" key={index}>
          <img src={image} alt={`Image ${index + 1}`} className="px-2 md:px-0"/>
        </div>
      ))}
    </Masonry>
  );
};

export default Waterfall;
