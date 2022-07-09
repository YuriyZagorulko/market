import { IUserState } from './../redux/reducers/auth.reducer'
import axios from "axios"
import { notification } from 'antd'
import { store } from '../redux/store'
import { debug } from 'console'

const mainAxios = axios.create()


mainAxios.interceptors.request.use((config) => {
  const userState = store.getState().auth
  if (userState){
    config.headers.Authorization =  `Token ${userState.token}`
  }
  return config
})
mainAxios.interceptors.response.use((response) => {
    return response
  }, (error) => {
    switch (error.message){
      case 'Network Error':
        notification.error({
          message: error.message,
          description: 'Пожалуйста проверьте свое соединение с интернетом',
        })
        break
    }
    return error
  })

export { mainAxios }