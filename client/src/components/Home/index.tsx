import React, {FC} from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import BackgroundImg from "../../img/connect.jpg"

const Home = ({  }) => {
    return (
        <HomeWrapper>
            <HomeContainer>
                <ResizeWrapper>
                    <HomeImage image={BackgroundImg} />
                    <HomeTextHeader>
                        Keep your phone connected
                    </HomeTextHeader>
                    <HomeTextDescription>
                        WhatsApp connects to your phone to sync messages. To reduce data usage, connect your phone to Wi-Fi.
                    </HomeTextDescription>
                    <HomeLink>
                        <HomeLinkBorder />
                        <HomeLinkDescription>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 18" width="21" height="18"><path fill="currentColor" d="M10.426 14.235a.767.767 0 0 1-.765-.765c0-.421.344-.765.765-.765s.765.344.765.765-.344.765-.765.765zM4.309 3.529h12.235v8.412H4.309V3.529zm12.235 9.942c.841 0 1.522-.688 1.522-1.529l.008-8.412c0-.842-.689-1.53-1.53-1.53H4.309c-.841 0-1.53.688-1.53 1.529v8.412c0 .841.688 1.529 1.529 1.529H1.25c0 .842.688 1.53 1.529 1.53h15.294c.841 0 1.529-.688 1.529-1.529h-3.058z"></path></svg>
                        </span>
                            <div>WhatsApp is available for Mac. <a href="https://www.whatsapp.com/download" target="_blank">Get it here</a> </div>
                        </HomeLinkDescription>
                    </HomeLink>
                </ResizeWrapper>
            </HomeContainer>
        </HomeWrapper>
    )
}

const HomeWrapper = styled("div")`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 60%;
  background-color: #262d31;
  border-bottom: 6px solid #056162;

  @media (min-width: 900px) {
    flex: 65%;
  }

  @media (min-width: 1300px) {
    flex: 70%;  
  }
`

const HomeContainer = styled("div")`
  display: flex;
  align-items: center;;
  justify-content: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`

const ResizeWrapper = styled("div")`
  width: 80%;
  max-width: 460px;
  text-align: center;
`
interface ComponentProps {
    className?: string,
    image: string
}

const Component: FC<ComponentProps> = ({
   image,
    className
}) => <div className={className}></div>

const HomeImage = styled(Component)`
  background-image: url('${props => props.image}');
  margin: 0 auto;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: cover;
  border-radius: 50%;
  transform-origin: center;
  width: 280px;
  height: 280px;
  
  @media (min-width: 900px) {
    width: 356px;
    height: 355px;
  }
`

const animationCss = css`
  opacity: 0;
  animation-name: zoomInImage;
  animation-duration: 200ms;
  animation-timing-function: ease-in;
  animation-fill-mode: forwards;
  animation-delay: 0.5s;
  //animation: zoomInImage 300ms ease-in;

  @keyframes zoomInImage {
    0% { opacity: 0; transform:scale(0.1)}
    100% { opacity: 1; transform:scale(1)}
  }
`

const HomeTextHeader= styled("h1")`
  margin-top: 36px;
  font-size: 36px;
  font-weight: 400;
  color: #f1f1f2e0;
`

const HomeTextDescription = styled("div")`
  margin-top: 24px;
  font-size: 14px;
  line-height: 20px;
  color: #a6a8aa;
`

const HomeLink = styled("div")`
  margin-top: 36px;
`

const HomeLinkBorder = styled("div")`
  margin-bottom: 34px;
  background-color: #f1f1f21c;
  height: 1px;
`

const HomeLinkDescription = styled("div")`
  display: inline-flex;
  align-items: center;
  font-size: 14px;
  line-height: 20px;
  color: #a6a8aa;

  svg {
    display: block;
  }

  div {
    margin-left: 5px;
    text-align: unset;
  }

  a {
    text-decoration: none;
    color: #00af9c;
  }
`

export default Home
