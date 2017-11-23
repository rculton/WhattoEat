import React from 'react'
import { Switch, Route } from 'react-router-dom'
import clientAuth from './clientAuth'
import {Redirect} from 'react-router-dom'

import NavBar from './NavBar'
import LogIn from './views/LogIn'
import LogOut from './views/LogOut'
import SignUp from './views/SignUp'
import VIP from './views/VIP'
import Home from './views/Home'

class App extends React.Component {
	state = {currentUser: null}

	componentDidMount(){
		this.setState({currentUser: clientAuth.getCurrentUser()})
	}

	onLoginSuccess(user){
		this.setState({currentUser: clientAuth.getCurrentUser()})
	}
	
	logOut(){
		clientAuth.logOut()
		this.setState({currentUser: null})

	}

	render() {
		//1
		//conditionally render login/logout based on current user
		//2
		//Implement signup
		//3
		//Automatically log in after signup
		console.log(this.state)
		const{currentUser}=this.state
		return (
			<div className='App'>
				<NavBar />
				<Switch>
					<Route path="/login" render={(props) => {
						return <LogIn {...props} onLoginSuccess={this.onLoginSuccess.bind(this)}/>
					}} />
					<Route path="/logout" render={(props)=>{
						return <LogOut onLogOut={this.logOut.bind(this)}/> 
					}} />
					<Route path="/signup" component={SignUp} />
					<Route path="/vip" render={()=>{
						return currentUser
							? <VIP />
							: <Redirect to="/login" />
					}}/>
					<Route path="/" component={Home} />
				</Switch>
			</div>
		)
	}
}

export default App