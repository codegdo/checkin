import handlebars from 'handlebars';

export type TemplateData = {
  template: string;
  fallback: string;
}

export const stringTemplate = (template = ''): TemplateData => {

  const components = {
    content: '<Content {...props} />',
    navMain: '<NavMain {...props}/>',
    navProfile: '<NavProfile {...props} />',
    navSub: '<NavSub {...props} />'
  }

  const placeholders = {
    content: '<div class="loader">...</div>',
    navMain: '<div class="loader">...</div>',
    navProfile: '<div class="loader">...</div>',
    navSub: '<div class="loader">...</div>'
  }

  return {
    template: handlebars.compile(template)(components),
    fallback: handlebars.compile(template)(placeholders)
  };
}