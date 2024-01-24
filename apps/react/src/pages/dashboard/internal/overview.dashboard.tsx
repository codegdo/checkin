import { DragDrop } from "@/components_v1/dragdrop/dragdrop.component";
import { Form, FormResult } from "@/components_v1/form";
import { useFetchProducts, useSaveProducts } from "./api";
import { Loader } from "@/components";
import { useCallback, useEffect } from "react";
import { useApi } from "@/hooks";

const data = [
  {
    id: 1,
    name: 'email',
    title: 'Email',
    type: 'email',
    data: null,
    value: null,
    parentId: null,
    parentKey: null,
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
        parentKey: null,
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
        parentKey: null,
        position: 4,
        required: true,
      },
    ],
    value: null,
    parentId: null,
    parentKey: null,
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
        parentKey: null,
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
        parentKey: null,
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
    parentKey: null,
    position: 5,
    readonly: false,
  },
];

function Overview() {
  const { status: fetchStatus, query } = useFetchProducts();
  //const { status: saveLoading, controller: saveController, mutation } = useSaveProducts();
  const loading = (fetchStatus === 'Loading');

  //const apiActions = useApi();

  const handleClick = useCallback(async (result: FormResult) => {
    console.log(result);

    if (result.type === 'add') {
      return query();
    } else if (result.type === 'save') {
      //mutation();
    }
  }, []);

  return <div>
    Overview
    <Form onSubmit={handleClick} data={data} loading={loading} />
    <DragDrop data={data} />
  </div>
}

export default Overview;