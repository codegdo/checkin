import { PropsWithChildren } from "react";
import { RenderElementProps } from "slate-react";

export type ElementRenderProps = PropsWithChildren<RenderElementProps>;

export function ElementRender({ attributes, children, element }: ElementRenderProps) {
  switch (element.type) {
    case 'quote':
      return <blockquote {...attributes}>{children}</blockquote>
    case 'code':
      return (
        <pre>
          <code {...attributes}>{children}</code>
        </pre>
      )
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>
    case 'heading-three':
      return <h3 {...attributes}>{children}</h3>
    case 'heading-four':
      return <h4 {...attributes}>{children}</h4>
    case 'heading-five':
      return <h5 {...attributes}>{children}</h5>
    case 'heading-six':
      return <h6 {...attributes}>{children}</h6>
    case 'list-item':
      return <li {...attributes}>{children}</li>
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>
    // case 'link':
    //   return (
    //     <a href={element.url} {...attributes}>
    //       {children}
    //     </a>
    //   )
    // case 'image':
    //   return <ImageElement {...props} />
    default:
      return <p {...attributes}>{children}</p>
  }
}