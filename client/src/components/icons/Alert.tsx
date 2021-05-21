import React from "react";
import styled from "@emotion/styled";

function SvgAlert(props: any) {
    return (
        <span data-testid="alert" data-icon="alert" className="">
            <SvgWrapper width="1em" height="1em" viewBox="0 0 16 16" fill="none">
                <path d="M8 16A8 8 0 118 0a8 8 0 010 16zM7 3v6h2V3H7zm0 8v2h2v-2H7z" fill="currentColor"/>
            </SvgWrapper>
        </span>
    )
}

const SvgWrapper = styled("svg")`
  position: absolute;
  color: #de535e;
  font-size: 15px;
  right: 8px;
  bottom: 8px;
`

export default SvgAlert
