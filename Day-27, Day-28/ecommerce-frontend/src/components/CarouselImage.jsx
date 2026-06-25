const CarouselImage = (props) => {
  return (
    <div>
      <img src={props.text} height={450} style={{ width: "100vw" }} alt="" />
    </div>
  );
};

export default CarouselImage;
