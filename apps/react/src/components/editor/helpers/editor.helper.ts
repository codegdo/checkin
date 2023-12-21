class EditorHelper {
  getEditor() {
    return [
      {
        id: 1,
        title: "Content",
        data: []
      },
      {
        id: 2,
        title: "Design",
        data: []
      },
      {
        id: 3,
        title: "Setting",
        data: []
      }
    ];
  }
}

export const editorHelper = new EditorHelper();