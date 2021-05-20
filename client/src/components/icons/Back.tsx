import React from "react";

function SvgBack(props: any) {
    return (
        <span data-testid="back" data-icon="back" className="">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" {...props}>
                <path fill="currentColor" d="M12 4l1.4 1.4L7.8 11H20v2H7.8l5.6 5.6L12 20l-8-8 8-8z"></path>
            </svg>
        </span>
    )
}

export default SvgBack
