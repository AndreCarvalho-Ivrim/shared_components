import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import style from "./style.module.scss";
import logo from "../assets/Logo_Negativo_semFundo.png";

interface MenuSliderProps {
 urls: {
  portal: string,
  wf: string,
  office: string,
  learning: string
 }
}

export const MenuSlider = ({ urls }: MenuSliderProps) => {
 const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  centerMode: true,
  arrows: true,
  responsive: [
   {
    breakpoint: 1024,
    settings: {
     slidesToShow: 3,
     slidesToScroll: 3,
     infinite: true,
     dots: true
    }
   },
   {
    breakpoint: 895,
    settings: {
     slidesToShow: 2,
     slidesToScroll: 2,
     initialSlide: 2
    }
   },
  ]
 };

 const itensSlider = [
  {
   title: "Portal de Soluções Ivrim",
   url: urls.portal,
   img: "https://source.unsplash.com/random/?city,night"
  },
  {
   title: "Ivrim System Architect",
   url: urls.wf,
   img: "https://source.unsplash.com/random/?business-work"
  },
  {
   title: " Ivrim Office Intelligence",
   url: urls.office,
   img: "https://source.unsplash.com/random/?3d-renders"
  },
  {
   title: "Ivrim Learning Center",
   url: urls.learning,
   img: "https://source.unsplash.com/random/?technology"
  },
 ]

 return (
  <div className="w-screen h-screen bg-gradient-bg overflow-hidden">
   <div className={style.header}>
    <div className={style.header__logo}>
     <img src={logo} alt="" />
    </div>
   </div>
   <div className="w-full flex justify-center items-center pad py-15">
    <div className="w-full">
     <Slider className={style.slider} {...settings}>
      {itensSlider.map((iten, index) => {
       return (
        <a key={`id-${index}`} className={style.slider__item}>
         <div className={style.slider__item__card}>
          <div style={{
           backgroundImage: `url(${iten.img})`,
          }} className={style.slider__item__card__content}>
           <div className={style.gradient}>
            <span>
             {iten.title}
            </span>
            <button>
             acessar
            </button>
           </div>
          </div>
         </div>
        </a>
       )
      })}
     </Slider>
    </div>
   </div>
  </div>
 )
}