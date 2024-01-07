import { PropsWithChildren } from "react";
import { RenderElementProps } from "slate-react";

export type ElementRenderProps = PropsWithChildren<RenderElementProps>;

export function ElementRender({ attributes, children, element }: ElementRenderProps) {
  const alignStyles: Record<string, React.CSSProperties> = {
    left: { textAlign: 'left' },
    center: { textAlign: 'center' },
    right: { textAlign: 'right' },
    justify: { textAlign: 'justify' },
  };

  const style = element.align ? alignStyles[element.align] : {};

  switch (element.type) {
    case 'quote':
      return <blockquote style={style} {...attributes}>{children}</blockquote>
    case 'code':
      return (
        <pre>
          <code {...attributes}>{children}</code>
        </pre>
      )
    case 'bulleted-list':
      return <ul style={style} {...attributes}>{children}</ul>
    case 'heading-one':
      return <h1 style={style} {...attributes}>{children}</h1>
    case 'heading-two':
      return <h2 style={style} {...attributes}>{children}</h2>
    case 'heading-three':
      return <h3 style={style} {...attributes}>{children}</h3>
    case 'heading-four':
      return <h4 style={style} {...attributes}>{children}</h4>
    case 'heading-five':
      return <h5 style={style} {...attributes}>{children}</h5>
    case 'heading-six':
      return <h6 style={style} {...attributes}>{children}</h6>
    case 'list-item':
      return <li style={style} {...attributes}>{children}</li>
    case 'numbered-list':
      return <ol style={style} {...attributes}>{children}</ol>
    // case 'link':
    //   return (
    //     <a href={element.url} {...attributes}>
    //       {children}
    //     </a>
    //   )
    // case 'image':
    //   return <ImageElement {...props} />
    default:
      return <p style={style} {...attributes}>{children}</p>
  }
}