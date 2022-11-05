import { Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import style from './categoryCheckbox.module.scss'

const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };

  interface IProps{
    categoryName:string
  }

function CategoryCheckbox(props:IProps){
    return(
        <Checkbox className={style.categoryCheckbox} onChange={onChange}>{props.categoryName}</Checkbox>

    )
}

export default CategoryCheckbox