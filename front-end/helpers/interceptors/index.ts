import { notification} from 'antd'
import { openNotificationWithIcon } from '../notifications'

export function handleRequestError(e) {
    console.log(e)
    openNotificationWithIcon('error', 'Error', 'Something went wrong!')
    throw e
}