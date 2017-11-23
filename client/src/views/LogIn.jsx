import React from 'react'
import clientAuth from '../clientAuth'

class LogIn extends React.Component {
	state = {
		fields:{
			email:'',
			password:''
		}
	}
	onInputChange(evt){
		this.setState({
			fields:{
				...this.state.fields,
				[evt.target.name]: evt.target.value}
			})
	}

	onFormSubmit(evt){
		//don't refresh
		evt.preventDefault()
		//check the authenticity of the user
		clientAuth.logIn(this.state.fields).then(user =>{
			//reset the state
			this.setState({fields: {email:'', password: ''} })
			//if there's a user
			if (user){
				//do the thing with login success from the app
				this.props.onLoginSuccess()
				//redirect
				this.props.history.push('/')
			}
			//otherwise
			this.props.history.push('/login')
		})
		
	}
	
	render() {
		const { email, password} = this.state.fields
		return (
			<div className='LogIn' onSubmit={this.onFormSubmit.bind(this)}>
				<h1>Log In</h1>
				<form onChange={this.onInputChange.bind(this)}>
					<input type="text" placeholder="Email" name="email" value={email}/>
					<input type="password" placeholder="Password" name='password' value={password}/>
					<button>Log In</button>
				</form>
			</div>
		)
	}
}

export default LogIn