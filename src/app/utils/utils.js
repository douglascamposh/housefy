
export const baseQueryInterceptor = (baseQuery, path, headers) => {
  const baseQueryValidateToken = async (args, api, extraOptions) => {
    console.log('Entra aqui validate token');
    let result = await baseQuery(args, api, extraOptions)
    if (result.error && result.error.status === 401) {
      // try to get a new token
      const refreshResult = await baseQuery('/refreshToken', api, extraOptions)
      if (refreshResult.data) {
        // store the new token
        localStorage.setItem('token', dataSignUp.token);
        // retry the initial query
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(loggedOut()); // crear el logout o ver como llamar
      }
    }
    return result
  }
};

export const addTokenInterceptor = (headers) => {
    const token = localStorage.getItem('token');
    console.log("llega", token);
    // if(token) {
    //   headers.set('authorization', `Bearer ${token}`)
    // }
    return headers;
};
