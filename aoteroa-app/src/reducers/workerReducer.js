import { handleActions } from 'redux-actions'

  const workerInit = [
    {
      "id": 1,
      "name": "Worker One",
      "phone": "11111111",
      "photo": "http://via.placeholder.com/150x150/DE8142",
      "boatIds": [
        1
      ]
    },
    {
      "id": 2,
      "name": "Worker Two",
      "phone": "22222222",
      "photo": "http://via.placeholder.com/150x150/B66AA3",
      "boatIds": [
        1,
        2
      ]
    }
  ];
  const worker =(state,action)=>{
    switch (action.action_type) {
      case 'ASSIGN_WORKER':
      return {
        id: action.id,
        name: action.name,
        phone: action.phone,
        photo: action.photo,
        boatIds: action.boatIds
      }
    }
  }

  export const boatList = handleActions({
     'ASSIGN_WORKER'(state,action){
       return[
         ...state.filter(t => t.id !== action.payload.id),
         worker(undefined, action.payload)//add the object to the exist list
       ]
     }
  },workerInit)
