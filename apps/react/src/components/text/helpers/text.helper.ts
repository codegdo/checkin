import { Descendant, Element as SlateElement } from "slate";
import { CustomText } from "../leaf.render";
import { LIST_TYPES, TEXT_BLOCK_TYPES } from "../types";

class TextHelper {
  serialize(nodes: Descendant[]): string {
    const serializeNode = (node: Descendant): string => {
      if ('type' in node && 'children' in node) {

        if(TEXT_BLOCK_TYPES.includes(node.type )) {
          const content = this.serializeContent(node.children);

          switch(node.type) {
            case 'paragraph':
              return `<p>${content}</p>`;
            case'heading-one':
            return `<h1>${content}</h1>`;
            case'heading-two':
            return `<h2>${content}</h2>`;
            case'heading-three':
            return `<h3>${content}</h3>`;
            case'heading-four':
            return `<h4>${content}</h4>`;
            case'heading-five':
            return `<h5>${content}</h5>`;
            case'heading-six':
            return `<h6>${content}</h6>`;
            case'quote':
            return `<blockquote>${content}</blockquote>`;
          }
          return content;
        }

        if(LIST_TYPES.includes(node.type)) {
          const content = this.serializeList(node);
          return content;
        }

        return '';
      }
      // Handle other node types like inline elements, etc.
      return '';
    };

    return nodes.map(serializeNode).join('');
  }

  private serializeList(node: SlateElement): string {
    const tag = node.type === 'numbered-list' ? 'ol' : 'ul';
    const listItems = node.children
      .map((listItem) => {
        if (SlateElement.isElement(listItem)) {
          return `<li>${this.serializeContent(listItem.children)}</li>`;
        }
        return '';
      })
      .join('');

    return `<${tag}>${listItems}</${tag}>`;
  }

  private serializeContent(children: Descendant[]): string {
    return children
      .map((child) => {
        if ('text' in child) {
          return this.serializeText(child as CustomText);
        }
        return '';
      })
      .filter((text) => text !== '')
      .join('');
  }

  private serializeText({ text, ...customProps }: CustomText): string {
    let serializedText = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    if (customProps.bold) {
      serializedText = `<strong>${serializedText}</strong>`;
    }

    if (customProps.code) {
      serializedText = `<code>${serializedText}</code>`;
    }

    if (customProps.italic) {
      serializedText = `<em>${serializedText}</em>`;
    }

    if (customProps.underline) {
      serializedText = `<u>${serializedText}</u>`;
    }

    return serializedText;
  }
}

const textHelper = new TextHelper();

export { textHelper };
