
import { FormProvider } from './form.provider';
import FormRender from './form.render';

function Form() {

  return (
    <form>
      <FormProvider value=''>
        <FormRender data={[]} />
      </FormProvider>
    </form>
  )
}

export default Form;