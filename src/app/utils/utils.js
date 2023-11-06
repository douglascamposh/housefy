
export const baseQueryValidateToken = (baseQuery) => {
  return async (args, api, extraOptions) => {
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
        localStorage.removeItem('token');
      }
    }
    return result;
  }
};

export const addTokenInterceptor = (headers) => {
    const token = localStorage.getItem('token');
    if(token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers;
};
