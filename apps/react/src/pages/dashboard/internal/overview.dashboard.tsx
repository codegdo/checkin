import { DragDrop } from "@/components_v1/dragdrop/dragdrop.component";
import { Form, FormSubmit } from "@/components_v1/form";
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
    containerId: null,
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
        containerId: null,
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
        containerId: null,
        position: 4,
        required: true,
      },
    ],
    value: null,
    parentId: null,
    containerId: null,
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
        title: 'Id',
        type: 'text',
        data: null,
        value: null,
        parentId: null,
        containerId: null,
        position: 0,
        required: true,
        readonly: true,
      },
      {
        id: 7,
        name: 'roleName',
        title: 'Name',
        type: 'text',
        data: null,
        value: null,
        parentId: null,
        containerId: null,
        position: 0,
        required: true,
        readonly: false,
      },
      {
        id: 8,
        name: 'roleDescription',
        title: 'Description',
        type: 'text',
        data: null,
        value: null,
        parentId: null,
        containerId: null,
        position: 0,
        required: false,
        readonly: false,
      },
    ],
    value: [
      { id: 6, value: '123', rowIndex: 0 },
      { id: 7, value: 'Admin', rowIndex: 0 },
      { id: 8, value: '', rowIndex: 0 },
      { id: 6, value: '124', rowIndex: 1 },
      { id: 7, value: 'User', rowIndex: 1 },
      { id: 8, value: '', rowIndex: 1 },
    ],
    parentId: null,
    containerId: null,
    position: 5,
    required: false,
    readonly: false,
  },
  {
    id: 'buttonsubmit',
    name: 'SUBMIT',
    title: 'Submit',
    type: 'button',
    data: null,
    value: null,
    containerId: null,
    position: 6,
  },
];

function Overview() {
  //const { status, query } = useFetchProducts();
  //const { status: saveLoading, controller: saveController, mutation } = useSaveProducts();
  //const apiActions = useApi();

  const handleClick = useCallback((formSubmit: FormSubmit) => {
    const { type, requiredModal } = formSubmit;

    if (requiredModal) {
      return {
        type: 'GRIDVIEW',
        url: '/builder/forms/products',
        params: {}
      }
    }

    console.log('FORM_SUBMIT', formSubmit);
  }, []);

  return <div>
    Overview
    <Form onSubmit={handleClick} data={data} />
    <DragDrop data={data} />
  </div>
}

export default Overview;