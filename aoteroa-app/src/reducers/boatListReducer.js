import { handleActions } from 'redux-actions'
   //initialize the state
  const boatInit =[
    {
     "id": 1,
     "name": "Boat One",
     "type": "Sail",
     "photo": "http://via.placeholder.com/350x150/51A143",
     "length": 7.6,
     "work_description": "Needs a new anchor",
     "arrival_date": "2017-04-23T10:00:00Z",
     "delivery_date": "2017-04-27T10:00:00Z",
     "status": "under repair"
    },
    {
     "id": 2,
     "name": "Boat Two",
     "type": "Motor",
     "photo": "http://via.placeholder.com/350x150/269AB3",
     "length": 8.3,
     "work_description": "Needs a new engine",
     "arrival_date": "2017-05-02T11:00:00Z",
     "delivery_date": "2017-05-07T11:00:00Z",
     "status": "under repair"
    }
  ];
  
   // async function test(){
   //     var response = await axios.get(`http://localhost:3000/boats`);
   //     if(response.code == 'success'){
   //       boatInit = response.data;
   //       console.log(boatInit);
   //     }
   // };

   const boat = (state,action) =>{
     switch (action.action_type) {
       case 'ADD_BOAT':
       return {
         id: action.id,
         name: action.name,
         type: action.type,
         photo: action.photo,
         length: action.length,
         work_description: action.work_description,
         arrival_date: action.arrival_date,
         delivery_date: action.delivery_date,
         status: action.status
       }
       case "EDIT_BOAT":
        //check is the state id is same as the action id or not if same then do nothing
        if(state.id !== action.id){
          console.log(state);
          return state
        }
       case 'DELETE_BOAT':
       return {
         id: action.id,
       }
       case 'ASSIGN_WORKER':
       return {

       }
       default:
         return state
      }
    }

    export const boatList = handleActions({
       'ADD_BOAT'(state,action){
         return[
           ...state,
           boat(undefined, action.payload)//add the object to the exist list
         ]
       },
       'EDIT_BOAT'(state,action){
         return[
           ...state.filter(t => t.id !== action.payload.id),
           Object.assign({}, action.payload)//add the object to the exist list
         ]
       },
       'DELETE_BOAT'(state,action){
        return state.filter(t=>t.id !== action.payload.id)//filter out the delete id and update the state
      }
    },boatInit)
