import authStyles from '../../styles/shared/Auth.module.scss'
import style from '../../styles/pages/Login.module.scss'
import React from 'react'
import { connect } from 'react-redux'
import { userActions } from '../../redux/actions/user'

interface IProps {
    login: any
    dispatch: any
}
interface IState {
    username: string,
    password: string,
    submitted: boolean
}
class LoginPage extends React.Component<IProps, IState> {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            submitted: false
        }
    }
    handleChange = (e) => {
        const { name, value } = e.target
        switch (name) {
            case 'username':
                this.setState({username: value})
                break
            case 'password':
                this.setState({password: value})
                break
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()

        this.setState({ submitted: true })
        const { username, password } = this.state
        const { dispatch } = this.props
        if (username && password) {
            dispatch(userActions.login(username, password))
        }
    }

    render() {
        return (
            <div className={style.login}>
                <h2>Login</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" onChange={this.handleChange} />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Login</button>
                    </div>
                </form>
            </div>
        )
    }
}
const connectedLoginPage = connect(state => state)(LoginPage)
export  default connectedLoginPage