import styles from '../../styles/pages/Auth.module.scss'
import React from 'react'
import { connect } from 'react-redux'
import { userActions } from '../redux/actions/user'
import { State } from '../redux/store'

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
    public static async getInitialProps({
        store,
        pathname,
        query,
        req
      }: NextPageContext<State>) {
        console.log("2. Page.getInitialProps uses the store to dispatch things", {
          pathname,
          query
        })
        if (req) {
          // All async actions must be await'ed
          await store.dispatch({ type: "PAGE", payload: "server" })
          // Some custom thing for this particular page
          return { pageProp: "server" }
        }
        // await is not needed if action is synchronous
        store.dispatch({ type: "PAGE", payload: "client" })
        // Some custom thing for this particular page
        return { pageProp: "client" }
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
        if (username && password) {
            this.props.dispatch(login(username, password))
        }
    }

    render() {
        return (
            <div className="">
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
export default connectedLoginPage