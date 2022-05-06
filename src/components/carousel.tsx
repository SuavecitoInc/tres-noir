import React from "react"
import { Link } from "gatsby"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper"
import { GatsbyImage } from "gatsby-plugin-image"
import { BsChevronLeft as Left, BsChevronRight as Right } from "react-icons/bs"
import styled from "styled-components"

import "swiper/css"

const Component = styled.div`
  .navigation {
    display: flex;
    flex-direction: row;
    align-items: center;
    a:hover {
      cursor: pointer;
    }
  }
  .nav-prev {
    padding-right: 10px;
  }
  .nav-next {
    padding-left: 10px;
  }
`

const StyledSwiper = styled(Swiper)`
  max-width: 100%;
  .swiper-slide {
    max-width: 100%;
  }
  /* .swiper-slide {
    line-height: 0;
    margin-left: 5px;
    max-width: calc(33.333% - 15px);
    &:hover {
      cursor: pointer;
    }
  } */
`

interface ImageSet {
  data: any
  title: string
}

const Carousel = ({
  imageSet,
  imageLinks,
}: {
  imageSet: [ImageSet]
  imageLinks: string[]
}) => (
  <Component>
    <div className="navigation">
      <div className="nav-prev">
        <a className="prev" role="button">
          <Left />
        </a>
      </div>
      <StyledSwiper
        slidesPerView={1}
        spaceBetween={10}
        loop
        navigation={{ nextEl: ".next", prevEl: ".prev" }}
        className="carousel"
        breakpoints={{
          "480": {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          "768": {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          "1024": {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
        modules={[Navigation]}
        // preventClicks={false}
        preventClicksPropagation={false}
        preventInteractionOnTransition={true}
        touchRatio={1}
        touchReleaseOnEdges={true}
        touchStartForcePreventDefault={true}
        watchSlidesProgress
        swipeHandler=".carousel"
        threshold={15}
      >
        {imageSet.map((image: ImageSet, i: number) => (
          <SwiperSlide key={`thumb-${i}`}>
            <Link to={imageLinks[i]}>
              <GatsbyImage
                image={image.data}
                alt={image.title}
                loading="eager"
              />
            </Link>
          </SwiperSlide>
        ))}
      </StyledSwiper>
      <div className="nav-next">
        <a className="next" role="button">
          <Right />
        </a>
      </div>
    </div>
  </Component>
)

export default Carousel
