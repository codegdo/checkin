import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { AccessType } from '@/store/types';
import { AppState } from '@/store/reducers';

function Index() {
  const { accessType } = useSelector((state: AppState) => state.session);

  const getDashboardRoute = (type: string) => {
    switch (type) {
      case AccessType.SYSTEM:
        return '/console';
      case AccessType.INTERNAL:
        return '/overview';
      case AccessType.EXTERNAL:
        return '/welcome';
      default:
        return '/notfound';
    }
  };

  const redirectToDashboard = (type: string) => {
    const route = getDashboardRoute(type);
    return <Navigate to={route} />;
  };

  return redirectToDashboard(accessType);
}

export default Index;



// import { DragDrop } from "@/components";

// // Example API response
// const data = [
//   {
//     id: '1',
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
//     id: '4',
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
//     id: 6,
//     name: 'field',
//     type: 'text',
//     dataType: 'field',
//     data: []
//   },

// ];

// Map the API response to use enum values
// const json: Field[] = apiResponse.map(item => ({
//   ...item,
//   type: ElementType[item.type.toUpperCase() as keyof typeof ElementType],
//   dataType: DataType[item.dataType.toUpperCase() as keyof typeof DataType],
//   data: item.data.map(dataItem => ({
//     ...dataItem,
//     type: FieldType[dataItem.type.toUpperCase() as keyof typeof FieldType],
//   })),
// }));