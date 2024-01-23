import { DragDrop } from "@/components_v1/dragdrop/dragdrop.component";
import { Form, FormResult } from "@/components_v1/form";
import { useFetchProduct, useSaveProduct } from "./api";
import { FetchStatus } from "@/hooks";
import { Loader } from "@/components";
import { useCallback, useEffect } from "react";

const data = [
  {
    id: 1,
    name: 'email',
    title: 'Email',
    type: 'email',
    data: [],
    value: null,
    parentId: null,
    position: 1,
    required: true,
  },
  {
    id: 2,
    name: 'name',
    title: 'Name',
    type: 'group',
    data: [
      {
        id: 3,
        name: 'firstName',
        title: 'First Name',
        type: 'text',
        data: null,
        value: null,
        parentId: 2,
        position: 3,
        required: true,
      },
      {
        id: 4,
        name: 'lastName',
        title: 'Last Name',
        type: 'text',
        data: null,
        value: null,
        parentId: 2,
        position: 4,
        required: true,
      },
    ],
    value: null,
    parentId: null,
    position: 2
  },
  {
    id: 5,
    name: 'role',
    title: 'Role',
    type: 'grid',
    data: [
      {
        id: 6,
        name: 'roleId',
        title: 'Role Id',
        type: 'text',
        data: null,
        value: null,
        parentId: null,
        position: 0,
        required: true,
        readonly: true,
      },
      {
        id: 7,
        name: 'roleName',
        title: 'Role Name',
        type: 'text',
        data: null,
        value: null,
        parentId: null,
        position: 0,
        required: true,
        readonly: false,
      },
    ],
    value: [
      { id: 6, value: '123', rowIndex: 0 },
      { id: 7, value: 'Admin', rowIndex: 0 },
      { id: 6, value: '124', rowIndex: 1 },
      { id: 7, value: 'User', rowIndex: 1 },
    ],
    parentId: null,
    position: 5,
    readonly: false,
  },
];

function Overview() {
  const { status: fetchLoading, data: formData, progress, controller: fetchController, query } = useFetchProduct();
  const { status: saveLoading, controller: saveController, mutation } = useSaveProduct();

  const handleClick = useCallback(async (result: FormResult) => {
    console.log(result);

    if (result.type === 'add') {
      return query();
    } else if (result.type === 'save') {
      mutation();
    }
  }, []);

  useEffect(() => {
    console.log('progress', progress);
  }, [progress]);

  return <div>
    Overview

    <Loader status={fetchLoading} controller={fetchController} />

    <Form onSubmit={handleClick} data={data} />

    <DragDrop data={data} />
  </div>
}

export default Overview;