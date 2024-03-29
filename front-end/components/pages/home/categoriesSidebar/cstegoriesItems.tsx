import { MenuProps } from "antd"
import Image from "next/image"
import { ProductCategories } from "../../../../helpers/constants/categories"

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[] | any,
  type?: 'group',
  itemStyle = {height: '45px'}
): any {
  return {
    key,
    icon,
    children,
    label,
    type,
    style: itemStyle
  }
}

function sliceIntoChunks(arr, chunkSize) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
    }
    return res;
}

export const itemsSingleLine = [
    getItem('Аккумуляторы', ProductCategories.CarBatteries,
        <span className='img-comtainer'>
            <Image
            src={ '/images/previews/main-menu/battery.jpg' }
            alt="Img"
            layout="fixed"
            width={'40px'}
            height={'45px'}
            />
        </span>
    ),
    getItem('Пусковой кабель', ProductCategories.StartCable,
        <span className='img-comtainer'>
            <Image
            src={ '/images/previews/main-menu/battery-acc.jpg' }
            alt="Img"
            layout="fixed"
            width={'40px'}
            height={'45px'}
            />
        </span>
    ),
    getItem('Пускозарядные устройства', ProductCategories.StarterChargers,
        <span className='img-comtainer'>
            <Image
            src={ '/images/previews/main-menu/battery-charge.jpg' }
            alt="Img"
            layout="fixed"
            width={'40px'}
            height={'45px'}
            />
        </span>
    ),
    getItem('Смазка для контактов', ProductCategories.ContactGrease,
        <span className='img-comtainer'>
            <Image
            src={ '/images/previews/main-menu/electro-lubricant.jpg' }
            alt="Img"
            layout="fixed"
            width={'40px'}
            height={'45px'}
            />
        </span>
    ),
    getItem('Дистиллированная вода', ProductCategories.DistilledWater,
        <span className='img-comtainer'>
            <Image
            src={ '/images/previews/main-menu/voda-distillirovannaya.jpg' }
            alt="Img"
            layout="fixed"
            width={'40px'}
            height={'45px'}
            />
        </span>
    ),
    getItem('Клеммы аккумулятора', ProductCategories.BatteryTerminals,
        <span className='img-comtainer'>
            <Image
            src={ '/images/previews/main-menu/klemmi.jpg' }
            alt="Img"
            layout="fixed"
            width={'40px'}
            height={'45px'}
            />
        </span>
    ),
    getItem('Тестеры для АКБ', ProductCategories.BatteryTesters,
        <span className='img-comtainer'>
            <Image
            src={ '/images/previews/main-menu/nagruzochnye-vilki.jpg' }
            alt="Img"
            layout="fixed"
            width={'40px'}
            height={'45px'}
            />
        </span>
    )
]
export const [items1, items2, items3] = sliceIntoChunks(itemsSingleLine, 3)