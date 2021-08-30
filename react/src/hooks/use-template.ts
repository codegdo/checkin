import { templateGeneral } from '../assets/layout';

export const useTemplate = (page?: string, program?: string): { template: string } => {
  let template = `<Content {...props} />`;

  template = templateGeneral;

  return { template }
}