import { Descendant } from "slate";
import { CustomText } from "../leaf.render";

class TextHelper {
  serialize(nodes: Descendant[]): string {
    const serializeNode = (node: Descendant): string => {
      if ('type' in node && 'children' in node) {
        if (node.type === 'paragraph') {
          const paragraphContent = this.serializeParagraph(node.children);
          return `<p>${paragraphContent}</p>`;
        }
        // Handle other block-level nodes if needed
        // For example, list items, headings, etc.
        return '';
      }
      // Handle other node types like inline elements, etc.
      return '';
    };

    return nodes.map(serializeNode).join('');
  }

  private serializeParagraph(children: Descendant[]): string {
    return children
      .map((child) => {
        if ('text' in child) {
          return this.serializeText(child as CustomText);
        }
        // Handle other text-based node types if needed
        // For example, code blocks, headings, etc.
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
