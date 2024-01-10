import { Loader } from "@/components";
import { useGetAllForms } from "./api/use-form.api";
import { Link } from "react-router-dom";
import { useApi } from "@/hooks";


function FormList() {
  const { status, data, controller } = useApi<ReturnType<typeof useGetAllForms>>('useGetAllForms'); //useGetAllForms();

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