import React from "react";
import styled from "@emotion/styled";
import Loader from "react-loader-spinner";
interface ProgressBarProps {
    completed: number
}
const ProgressBar: React.FC<ProgressBarProps> = ({ completed }) => {
    return (
        <ProgressBarWrapper>
            <Loader
                type="TailSpin"
                color="#a6a8aa"
                height={80}
                width={80}
            />
            <InnerWrapper>
                <PercentageLine completed={completed}>
                    {/*<span className={styles.labelStyles}>{`${completed}%`}</span>*/}
                </PercentageLine>
            </InnerWrapper>
        </ProgressBarWrapper>
    )
}

const ProgressBarWrapper = styled("div")`
  position: absolute;
  top: 50vh;
  left: 50%;
  transform: translate(-50%, -50%);
  
  div {
    position: relative;
    text-align:center;
  }
`

const InnerWrapper = styled("div")`
  height: 3px;
  width: 400px;
  background-color: #a6a8aa;
  //border-radius: 50px;
  margin: 50px;
`
type PercentageLineProps = {
    completed: number
}

const PercentageLine = styled("div")<PercentageLineProps>`
  height: 100%;
  width: ${props => String(props.completed) + '%'};
  background-color: #056162;
  border-radius: inherit;
  text-align: right;
  //transition: width 1s ease-in-out;
  animation: progressBar 1.5s ease-in-out;
  animation-fill-mode: both;

  @keyframes progressBar {
    0% { width: 0; }
    100% { width: 100%; }
  }
`

export default ProgressBar
