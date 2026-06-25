import Carousel from 'react-bootstrap/Carousel';
import CarouselImage from './CarouselImage';
function IndividualIntervals() {
  return (
    <Carousel>
      <Carousel.Item interval={1000}>
        <CarouselImage text="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd8hwHTaOIYgGGquPHc4CfiuVE5VHuheLajQ&s" />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={500}>
        <CarouselImage text="https://www.shutterstock.com/image-photo/business-ecommerce-concept-businessman-use-260nw-2410866247.jpg" />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <CarouselImage text="https://img.magnific.com/free-photo/online-purchasing-payment-e-commerce-banking_53876-127604.jpg?semt=ais_hybrid&w=740&q=80" />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default IndividualIntervals;