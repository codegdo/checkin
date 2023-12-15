import React from "react"

export const Editor = React.forwardRef((props, ref) => {
  return <div>
    <div ref={ref}>Editor</div>
    <div>Content</div>
  </div>
})