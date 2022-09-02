import React, { useEffect, useState } from 'react';
import { DragDrop } from '../../components/dragdrop/dragdrop.component';

const Index: React.FC = (): JSX.Element => {

  const [form, setForm] = useState<FormData>();

  // load form
  useEffect(() => {
    void (async () => {
      const json: any = (await import('../auth/login/login.form.json')).default;
      setForm(json);
    })();
  }, []);


  useEffect(() => {
    console.log(form);
  }, [form]);

  if (!form) {
    return <div>loading...</div>
  }

  return <div>
    <DragDrop data={form} />
  </div>;
};

export default Index;