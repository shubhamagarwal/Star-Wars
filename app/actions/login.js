import axios from "axios";

export function getPlates(){
    return function(dispatch){
        axios.get('https://swapi.co/api/planets/?page=1')
            .then((response) => {
            	dispatch({type:'GET_PLANETS_DETAIL', response});
            })
    }
}

export function searchByName(username, password, props){
    return function(dispatch){
        axios.get('https://swapi.co/api/people/?search='+username)
            .then((response) => {
                let users = response.data.results, userFound = false;
                if (users.length === 0) {
                dispatch({type:'NO_USER_USER_DATA', response});
                } else {
                    users.forEach((user, index) => {
                        if (user.name === username &&  user.birth_year === password) {
                            dispatch({type:'GET_USER_DATA', response});
                            props.history.push('/abc');
                            userFound = true;
                        }
                    });
                    if (!userFound) {
                        dispatch({type:'PASSWORD_WRONG', response});
                    }
                }
            })
            .catch((err) => {
                dispatch({type:'FETCH_USERS_REJECTED', err});
            })
    }
}
