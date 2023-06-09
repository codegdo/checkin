import React from 'react';

import { FormProvider } from './form.provider';
import FormRender from './form.render';

function Form() {

  return (
    <FormProvider value=''>
      <FormRender data={[]} />
    </FormProvider>
  )
}

export default Form;