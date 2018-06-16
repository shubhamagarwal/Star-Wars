const initialState = {
	isLoading: true,
	isError: false
};

export default function login(state = initialState, action) {
    switch(action.type){ 
    	 case 'GET_USER_DATA': {
			return {
				...state, userData:action.response.data, isError:false, isLoading:true
			}
			break;
        }
         case 'GET_PLANETS_DETAIL': {
			return {
				...state, planetData:action.response.data, isError:false, isLoading:true
			}
			break;
        }
        case 'NO_USER_USER_DATA':{	
			return {
				...state, errorResponse:'No user found.', isError:true, isLoading:false
			}
			break;
        }
        case 'PASSWORD_WRONG':{	
			return {
				...state, errorResponse:'Username or Password is worng.', isError:true, isLoading:false
			}
			break;
        }
        case 'FETCH_USERS_REJECTED':{	
			return {
				...state, errorResponse:action.response, isError:true, isLoading:false
			}
			break;
        }
        default:  {
            return state;
        }
    }


}