import React, { useEffect, useState } from 'react';
import { DragDrop, Draggable } from '../../components/dragdrop';
import { useAction } from '../../hooks';

const Index: React.FC = (): JSX.Element => {


  const { updateLayout } = useAction();
  const [form, setForm] = useState<FormData>();

  // load form
  useEffect(() => {
    void (async () => {
      const json: any = (await import('../auth/login/login.form.json')).default;
      setForm(json);
    })();
    updateLayout({ internal: '' })
  }, []);

  useEffect(() => {
    console.log(form);
  }, [form]);

  if (!form) {
    return <div>loading...</div>
  }

  return <div>
    <DragDrop data={form}>
      <Draggable />
    </DragDrop>
  </div>;
};

export default Index;