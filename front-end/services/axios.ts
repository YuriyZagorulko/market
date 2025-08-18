import axios from "axios"
import { notification } from 'antd'
import { store } from '../redux/store'
import { controlsConstants } from "../helpers/constants/controls";

const mainAxios = axios.create()
let numberOfAjaxCAllPending = 0;

mainAxios.interceptors.request.use((config) => { // auth token interceptor
  const userState = store.getState().auth
  if (userState){
    config.headers.Authorization =  `Token ${userState.token}`
  }
  return config
})

mainAxios.interceptors.response.use((response) => {  // network error interceptor
    return response
  }, (error) => {
    switch (error.message){
      case 'Network Error':
        notification.error({
          message: error.message,
          description: 'Будь ласка, перевірте своє підключення до Інтернету',
        })
        break
    }
    return error
  })

//interceptor to show loader
mainAxios.interceptors.request.use((response) => {
  numberOfAjaxCAllPending++;
  store.dispatch({type: controlsConstants.SHOW_LOADER})
  return response
})

//interceptor to hide loader
mainAxios.interceptors.response.use((response) => {  // network error interceptor
  numberOfAjaxCAllPending--;
  if (numberOfAjaxCAllPending <= 0){
    store.dispatch({type: controlsConstants.HIDE_LOADER})
  }
  return response
}, (error) => {
  numberOfAjaxCAllPending--;
  if (numberOfAjaxCAllPending <= 0){
    store.dispatch({type: controlsConstants.HIDE_LOADER})
  }
  return error
})

export { mainAxios }