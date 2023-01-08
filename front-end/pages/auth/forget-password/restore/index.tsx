import { FC, useEffect, useRef } from "react";
import { Col, Form, FormInstance, Input, notification } from "antd";
import { userService } from "../../../../services/user.service";
import React, { useState } from "react";
import CustomBtn from "../../../../components/shared/customBtn/customBtn";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import style from "./restore.module.scss";
import { connect } from "react-redux";
import { IUserState } from "../../../../redux/reducers/auth.reducer";

interface IProps {
  auth: IUserState;
}

const RestorePassword: FC<IProps> = (props) => {
  const { t: trans } = useTranslation("auth");
  const restoreToken = props.auth.restorePasswordToken;
  const [isTokenSucces, setIsTokenSucces] = useState(false);
  const formRef = React.createRef<FormInstance>();

  const tokenValidator = ({ getFieldValue }) => ({
    validator(_) {
      if (getFieldValue("code") === restoreToken) {
        setIsTokenSucces(true);
        return Promise.resolve();
      } else {
        setIsTokenSucces(false);
        return Promise.reject(new Error(trans("err.incorrectResetCode")));
      }
    },
  });

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onFinish = () => {
    const { password } = formRef.current.getFieldsValue();
    userService.changePassword(password)
  };
  // console.log(props.auth.restorePasswordToken);

  return (
    <div className={"wrapper " + style.container}>
      <div className={style.textWrapper}>
        <div className={"text-title-xl "}>{trans("passwordResetHeader")}</div>
        <p className={style.description}>{trans("passwordResetDescription")}</p>
      </div>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinishFailed={onFinishFailed}
        ref={formRef}
      >
        <Form.Item
          label={trans("enterCode")}
          labelCol={{ span: 6 }}
          name="code"
          wrapperCol={{ span: 24 }}
          rules={[
            { required: true, message: trans("err.enterResetCode") },
            tokenValidator,
          ]}
        >
          <Input className={style.input} placeholder={trans("enterCode")} />
        </Form.Item>

        <Form.Item
          label={trans("password")}
          name="password"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 24 }}
          rules={[{ required: true, message: trans("warn.enterPassword") }]}
        >
          <Input
            type="password"
            placeholder={trans("password")}
            disabled={!isTokenSucces}
          />
        </Form.Item>

        <CustomBtn
          type="primary"
          className={"centered-block"}
          htmlType="submit"
          onClick={onFinish}
          disabled={!isTokenSucces}
        >
          {trans("change")}
        </CustomBtn>
      </Form>
    </div>
  );
};

export async function getServerSideProps({ locale }) {
  return {
    props: await serverSideTranslations(locale, ["auth", "layout", "sharedUI"]),
  };
}
const connectedRestorePassword = connect((state) => state)(RestorePassword);

export default connectedRestorePassword;
