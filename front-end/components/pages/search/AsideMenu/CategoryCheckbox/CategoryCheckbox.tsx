import { Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };

  interface IProps{
    categoryName:string
  }

function CategoryCheckbox(props:IProps){
    return(
        <Checkbox onChange={onChange}>{props.categoryName}</Checkbox>

    )
}

export default CategoryCheckbox