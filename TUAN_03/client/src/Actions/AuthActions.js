import * as AuthAPI from '../Api/AuthRequest';

export const logIn = (formData, navigate) => async (dispatch) => {
    dispatch({ type: "AUTH_START" });
    try {
        const { data } = await AuthAPI.logIn(formData);
        dispatch({ type: "AUTH_SUCCESS", data: data });
        navigate("/home", { replace: true });

    } catch (error) {
        alert(error.response.data.message);
        dispatch({ type: "AUTH_FAIL", message : error.response.data.message })
    }
}

export const signIn = (formData, navigate)=> async(dispatch)=>{
    dispatch({type:"AUTH_START"});
    try {
        const {data} = await AuthAPI.reGister(formData);
        dispatch({ type: "AUTH_SUCCESS", data: data });
        navigate("../home", { replace: true });
    } catch (error) {
        console.log(error);
        dispatch({ type: "AUTH_FAIL" })
    }

}

export const logOut = ()=>async (dispatch)=>{
    dispatch({type:"LOG_OUT"})
}
