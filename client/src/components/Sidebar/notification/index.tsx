import React from "react";
import styled from "@emotion/styled";

const Notification: React.FC = () => {
    return (
        <NotificationWrapper>
            <ResizeWrapper>
                <IconWrapper>
                     <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
                            <path fill="currentColor" d="M24.154 2C11.919 2 2 11.924 2 24.165S11.919 46.33 24.154 46.33s22.154-9.924 22.154-22.165S36.389 2 24.154 2zm-.744 15.428v-.618c0-.706.618-1.324 1.324-1.324s1.323.618 1.323 1.324v.618c2.559.618 4.412 2.823 4.412 5.559v3.176l-8.294-8.294a5.056 5.056 0 0 1 1.235-.441zm1.323 15.706a1.77 1.77 0 0 1-1.765-1.765h3.529a1.768 1.768 0 0 1-1.764 1.765zm7.236-.883l-1.765-1.765H17.233v-.882l1.765-1.765v-4.853a5.56 5.56 0 0 1 .794-2.912l-2.559-2.559 1.147-1.147 14.735 14.736-1.146 1.147z"></path>
                        </svg>
                    </span>
                </IconWrapper>
                <TextWrapper>
                    <Title>Get notified of new messages</Title>
                    <Info>
                        <span>
                            Turn on desktop notifications
                        </span>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 12" width="8" height="12">
                                <path fill="currentColor" d="M2.173 1l4.584 4.725-4.615 4.615-1.103-1.103 3.512-3.512L1 2.173 2.173 1z"></path>
                            </svg>
                        </span>
                    </Info>
                </TextWrapper>
            </ResizeWrapper>
        </NotificationWrapper>
    )
}

const NotificationWrapper = styled("div")`
    height: 89px;
    background-color: #085373;
    cursor: pointer;
`

const ResizeWrapper = styled("div")`
  display: flex;
  align-items: center;
  min-height: 62px;
  padding:  13px 12px 14px 13px;
`

const IconWrapper = styled("div")`
  margin-right: 15px;
  color: #8eb2be;
`

const TextWrapper = styled("div")`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
`

const Title = styled("div")`
  font-size: 16px;
  line-height: 21px;
  color: #f1f1f2f5;
`

const Info = styled("div")`
  margin-top: 2px;
  font-size: 14px;
  line-height: 19px;
  color: #f1f1f2bf;

  &:hover {
    text-decoration: underline;
  }

  svg {
    display: inline-flex;
    margin-left: 3px;
    margin-top: 5px;
    vertical-align: top;
  }
`


export default Notification
