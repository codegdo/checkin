import { Link } from "react-router-dom";

import { Loader } from "@/components";
import { useApi } from "@/hooks";
import { GetAllForms, FormApiAction } from "./api";

function FormList() {
  const { status, data, controller } = useApi<GetAllForms>(FormApiAction.GET_ALL_FORMS);

  if (!data) {
    return <Loader status={status} controller={controller} />
  }

  return <div>
    {
      data?.map((item) => {
        return <div key={item.id}><Link to={`./${item.id}`}>{item.title}</Link></div>
      })
    }
  </div>

  //return <DragDrop data={formData?.data} />;
}

export default FormList;


//import { useFormContextApi } from "./api";
// Example API response
// const data = [
//   {
//     id: 1,
//     name: 'block',
//     type: 'div',
//     dataType: 'block',
//     data: [],
//     parentId: null,
//     position: 0
//   },
//   {
//     id: 2,
//     name: 'field',
//     type: 'text',
//     dataType: 'field',
//     data: null,
//     parentId: 1,
//     position: 1,
//   },
//   {
//     id: 3,
//     name: 'field',
//     type: 'text',
//     dataType: 'field',
//     data: null,
//     parentId: null,
//     position: 2
//   },
//   {
//     id: 4,
//     name: 'block',
//     type: 'div',
//     dataType: 'block',
//     data: [],
//     parentId: null,
//     position: 3
//   },
//   {
//     id: 5,
//     name: 'field',
//     type: 'text',
//     dataType: 'field',
//     data: null,
//     parentId: 4,
//     position: 4,
//   },
// ];

// const dragFields = [
//   {
//     id: '',
//     name: 'section',
//     type: 'section',
//     dataType: 'section',
//     data: []
//   },
//   {
//     id: '',
//     name: 'block',
//     type: 'div',
//     dataType: 'block',
//     data: []
//   },
//   //
//   {
//     id: 5,
//     name: 'field',
//     type: 'text',
//     dataType: 'field',
//     data: []
//   },
//   {
//     id: 7,
//     name: 'field',
//     type: 'text',
//     dataType: 'field',
//     data: []
//   },

// ];