import { Col, Form, FormInstance, Input, Row, notification } from "antd";
import { i18n, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { userService } from "../../../services/user.service";
import React, { useState } from "react";
import { FC } from "react";
import style from "./forget-password.module.scss";
import CustomBtn from "../../../components/shared/customBtn/customBtn";
import { useRouter } from "next/router";
import { Route } from "react-router-dom";
import { authConstants } from "../../../redux/constants";
import { useDispatch } from "react-redux";

interface IProps {}

const ForgetPassword: FC<IProps> = (props) => {
  const { t: trans } = useTranslation("auth")
  const dispatch = useDispatch()
  const router = useRouter()
  const formRef = React.createRef<FormInstance>()

  const onEnterSuccesData = (value: { token: string }) => {
    dispatch({ type: authConstants.GET_RESTORE_PASSWORD_TOKEN_SUCCES, value })
    router.push(`${router.route}/restore`)
  };
  const onFinish = () => {
    let data = formRef.current.getFieldValue("email")
    userService.getRestorePasswordToken(data).then((val) => {
      console.log(val?.non_field_errors)
      if (val.error === "Invalid Creds") {
        notification.error({
          message: i18n.t("error", { ns: "auth" }),
          description: i18n.t("err.incorrectEmail", { ns: "auth" }),
        });
      } else {
        if (val.token) {
          onEnterSuccesData(val)
        } else {
          console.log(val)
        }
      }
    })
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo)
  }
  

  return (
    <div className={"wrapper " + style.forgetPass}>
      <div className={style.textWrapper}>
        <div className={"text-title-xl " + style.header}>
          {trans("forgetPasswordHeader")}?
        </div>
        <div className={style.textWrapper}>
          {trans("forgetPasswordDescription")}
        </div>
      </div>
      <Row>
        <Col className={"centered-block"} span={24}>
          <Form
            labelAlign={"left"}
            onFinishFailed={onFinishFailed}
            ref={formRef}
          >
            <Form.Item
              label={trans("email")}
              labelCol={{ span: 6 }}
              name="username"
              wrapperCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: trans("warn.enterEmail"),
                  pattern: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <CustomBtn
              type="primary"
              className={"centered-block"}
              htmlType="submit"
              onClick={onFinish}
            >
              {trans("change")}
            </CustomBtn>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export async function getServerSideProps({ locale }) {
  return {
    props: await serverSideTranslations(locale, ["auth", "layout", "sharedUI"]),
  };
}

export default ForgetPassword;
