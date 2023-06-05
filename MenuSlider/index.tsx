import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import style from "./style.module.scss";
import logo from "../assets/Logo_Negativo_semFundo.png";
import { User } from "../../types";
import { useAuth } from "../../contexts/AuthContext";
import { useNotify } from "../../contexts/NotifyContext";
import { useNavigate } from "react-router-dom";
import { PossiblePermissions } from "../types";
import { DropdownChooseEnterprise } from "../Wrapper/v3/DropdownChooseEnterprise";
import { ButtonHelp } from "../Wrapper/v3/ButtonHelp";

export const applicationRedirection = (user: User | undefined) => {
  let urls = { portal: '', wf: '' }

  try{
    // @ts-ignore
    const WORKFLOW_MODULE = process.env.REACT_APP_WORKFLOW_MODULAR;
    urls.wf = WORKFLOW_MODULE!;
  }catch(e){ }
  try{
    // @ts-ignore
    const PORTAL = import.meta.env.VITE_PORTAL_URL;
    urls.portal = PORTAL;
  }catch(e){ }
  
  if(!urls.portal && !urls.wf) console.error(
    '[undeclared-env-variables-<REACT_APP_WORKFLOW_MODULAR|VITE_PORTAL_URL>]'
  )
  return [
    {
      id: 'ivrim-flows', name: 'Portal de Soluções Ivrim', url: `${urls.portal}/compras-e-contas-a-pagar`, img: 'https://source.unsplash.com/random/?city,night',
      disabled: !user?.permitions_slug?.includes(PossiblePermissions.CONTAS_A_PAGAR)
    },
    { id: 'ivrim-automator',    name: 'Ivrim System Architect',    url: `${urls.wf}?token=${user?.token}`, img: 'https://source.unsplash.com/random/?business-work' },
    { id: 'co-pilot-dashboard', name: 'Ivrim Office Intelligence', url: `${urls.portal}/co-pilot-dashboard/financeiro`, img: "https://source.unsplash.com/random/?3d-renders" },
    { id: 'ivrim-learn-center', name: 'Ivrim Learning Center',     url: undefined, img: "https://source.unsplash.com/random/?technology" },
    {
      id: 'admin-panel',        name: 'Admin Panel', url: `${urls.portal}/painel-adm`, img: "https://source.unsplash.com/random/?business-work",
      disabled: !user?.permitions_slug?.includes(PossiblePermissions.ADMIN)
    }
  ];
}
export const redirectToApp = ({ url, disabled }: { url: string | undefined, disabled?: boolean }, toast: any, navigate: any) => {
  if (!url) {
    toast.warning('Está solução ainda não está disponível');
    return;
  }

  if (disabled) {
    toast.error('Você não tem permissão para acessar essa sessão com esta empresa');
    return;
  }

  if (url.substring(0, 4) === 'http') window.location.href = url;
  else navigate(url);
}
export const MenuSlider = () => {
  const { toast } = useNotify();
  const { user } = useAuth();
  const navigate = useNavigate();

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

  const itemsSlider = applicationRedirection(user);

  return (
    <div className="w-screen h-screen bg-gradient-bg overflow-hidden">
      <div className={style.header}>
        <div className={style.header__logo}>
          <img src={logo} alt="Ivrim Consulting"/>
        </div>
        <DropdownChooseEnterprise/>
      </div>
      <div className="w-full flex justify-center items-center pad py-15">
        <div className="w-full">
          <Slider className={style.slider} {...settings}>
            {itemsSlider.map((item, index) => {
              return (
                <div
                  key={`id-${index}`}
                  className={style.slider__item}
                >
                  <div className={style.slider__item__card}>
                    <div style={{
                      backgroundImage: `url(${item.img})`,
                    }} className={style.slider__item__card__content}>
                      <div className={style.gradient}>
                        <span>{item.name}</span>
                        <button
                          type="button"
                          className="hover:bg-gray-50/20"
                          onClick={() => redirectToApp(item, toast, navigate)}
                        >acessar</button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </Slider>
        </div>
        <div className="absolute bottom-4 z-50 w-[95%] flex justify-end pr-1">
          <ButtonHelp/>
        </div>
      </div>
    </div>
  )
}