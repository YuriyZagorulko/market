import React from "react";
import styles from "../exitDialogWindow/exitDialogWindow.module.scss";
import Modal from "antd/lib/modal/Modal";
import { connect } from "react-redux";
import { store } from "../../../redux/store";
import { IControlsState } from "../../../redux/reducers/controls.reducer";
import { controlsConstants } from "../../../helpers/constants/controls";
import Button from "antd/lib/button";
import { Unsubscribe } from "redux-saga";
import { logout } from "../../../redux/actions/user";
import { withTranslation } from "next-i18next";

type IProps = {
  dispatch: any;
  t: any;
};
type exitDialogState = {
  isVisible: boolean;
  unsubs: Unsubscribe[];
};
enum subsriptions {
  store = "STORE",
}

class exitDialogWindow extends React.Component<IProps, exitDialogState> {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      unsubs: [],
    };
    this.state.unsubs[subsriptions.store] = store.subscribe(() => {
      const state = store.getState();
      const controls: IControlsState = state.controls;
      if (controls) {
        this.setState({
          isVisible: controls.isExitDialogOpened,
        });
      }
    });
  }
  componentWillUnmount() {
    for (const unsub of this.state.unsubs) {
      unsub();
    }
  }
  handleOk = () => {
    this.props.dispatch({ type: controlsConstants.CLOSE_EXIT_DIALOG });
    // this.setState({isVisible: false})
  };
  handleCancel = () => {
    this.props.dispatch({ type: controlsConstants.CLOSE_EXIT_DIALOG });
  };

  logoutClick = (dispatch) => () => {
    dispatch(logout());
    this.props.dispatch({ type: controlsConstants.CLOSE_EXIT_DIALOG });
  };
  render() {
    return (
      <div className={styles.container}>
        <Modal
          className={"cart-modal"}
          title={this.props.t('exitDialog.header')}
          open={this.state.isVisible}
          destroyOnClose
          onCancel={this.handleCancel}
          width={"600px"}
          bodyStyle={{ display: "flex", justifyContent: "space-between" }}
          footer={null}
        >
          <>
            <Button
              key="submit"
              type="primary"
              className={"cart-btn"}
              style={{ width: "100px" }}
              onClick={this.logoutClick(this.props.dispatch)}
            >
              {this.props.t("exitDialog.yes")}
            </Button>
            <Button
              key="backToShop"
              type="primary"
              className={"cart-btn"}
              style={{ width: "100px" }}
              onClick={this.handleOk}
            >
              {this.props.t("exitDialog.no")}
            </Button>
          </>
        </Modal>
      </div>
    );
  }
}

const connectedExitDialogWindow = connect((state) => state)(
  exitDialogWindow as any
);
export default withTranslation("sharedUI")(connectedExitDialogWindow);
