import { Descendant } from "slate";
import { CustomText } from "../render.leaf";

class TextHelper {

  serialize(nodes: Descendant[]) {
    return nodes.map(node => {
      if ('type' in node && 'children' in node) {
        // Handle paragraph nodes
        if (node.type === 'paragraph') {
          return node.children.map((child) => {
            if ('text' in child) {
              const { text, ...customProps } = child as CustomText;
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

              return `<p>${serializedText}</p>`;
            }

            // Handle other text-based node types if needed
            // For example, code blocks, headings, etc.

            return '';
          }).join('');
        }

        // Handle other block-level nodes if needed
        // For example, list items, headings, etc.

        return '';
      }

      // Handle other node types like inline elements, etc.

      return '';
    }).join('');
  }
}

const textHelper = new TextHelper();

export { textHelper };