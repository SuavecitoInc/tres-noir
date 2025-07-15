import React from "react"
import { Link } from "gatsby"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation } from "swiper"
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image"
import { BsChevronLeft as Left, BsChevronRight as Right } from "react-icons/bs"
import styled from "styled-components"

import "swiper/css"

const Component = styled.div`
  .hero-carousel-container {
    display: block;
    position: relative;
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
  }
  .navigation {
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    a:hover {
      cursor: pointer;
    }
  }
  .nav-prev {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 100;
    left: 0 !important;
    padding-left: 10px;
    a {
      svg {
        fill: white !important;
      }
    }
  }
  .nav-next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 100;
    right: 0 !important;
    padding-right: 10px;
    a {
      svg {
        fill: white !important;
      }
    }
  }
  .carousel {
    max-width: 1440px;
  }
  .hero-carousel-image {
    @media screen and (max-width: 600px) {
      min-height: 210px;
    }
    object-fit: cover;
    object-position: center;
    max-width: 100%;
  }
`

const StyledSwiper = styled(Swiper)`
  max-width: 100%;
  .swiper-slide {
    max-width: 100%;
  }
`

interface ImageSet {
  localFile: {
    childImageSharp: {
      data: IGatsbyImageData
    }
  }
  title: string
}

const HeroCarousel = ({
  imageSet,
  imageLinks,
}: {
  imageSet: [ImageSet]
  imageLinks: string[]
}) => {
  return (
    <Component>
      <div className="hero-carousel-container">
        <div className="navigation">
          <div className="nav-prev">
            <a className="prev-hc" role="button">
              <Left />
            </a>
          </div>
          <StyledSwiper
            slidesPerView={1}
            spaceBetween={10}
            loop={true}
            navigation={{ nextEl: ".next-hc", prevEl: ".prev-hc" }}
            className="carousel"
            modules={[Navigation, Autoplay]}
            preventClicksPropagation={false}
            preventInteractionOnTransition={true}
            touchRatio={1}
            touchReleaseOnEdges={true}
            touchStartForcePreventDefault={true}
            watchSlidesProgress
            swipeHandler=".carousel"
            threshold={15}
            observer={true}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            speed={500}
          >
            {imageSet.map((image: ImageSet, i: number) => (
              <SwiperSlide key={`thumb-${i}`}>
                <Link to={imageLinks[i]}>
                  <GatsbyImage
                    image={image?.localFile?.childImageSharp?.data}
                    alt={image.title}
                    loading="eager"
                    className="hero-carousel-image"
                  />
                </Link>
              </SwiperSlide>
            ))}
          </StyledSwiper>
          <div className="nav-next">
            <a className="next-hc" role="button">
              <Right />
            </a>
          </div>
        </div>
      </div>
    </Component>
  )
}

export default HeroCarousel
