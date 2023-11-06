interface Model {
  modules: [],
  views: {},
  actions: {},
  objects: {}
}
interface GeneratorProps {
  data: Model;
}

export function Generator({ data = [] }: GeneratorProps) {

  return (
    <div></div>
  );
}
