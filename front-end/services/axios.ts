import axios from "axios"
import { notification } from 'antd'
const mainAxios = axios.create()

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