import React from 'react';
import logo from './logo.png'
import bg from './bg.png'
import './Login.css';
class Login extends React.Component{
    state={
        email:'',
        pwd:''
    }

    handleChange = (e) =>{
        const {name,value} = e.target
        this.setState({[name]:value})
    }

    handleSubmit = (e) =>{
        e.preventDefault()
        this.props.isLogin(true)
    }
    render(){
        return(
            <div className='div-login-pg'>
                <div className = 'div-login-bg'>
                    <img src={bg} alt="bg"/>
                </div>
                <div className='div-login'>
                    <div className='div-login-logo'>
                        <img src={logo} alt="logo"/>
                    </div>
                    <div>
                        <form onSubmit = {this.handleSubmit}>
                            <input type='email' name='email' placeholder='Email' required onChange={this.handleChange}/>
                            <input type='password' name='pwd' placeholder='Password' required onChange={this.handleChange}/>
                            <button onSubmit={this.handleSubmit}>Log In</button>
                            <div><button2>Don't have an account? Click here to register.</button2></div>
                        </form>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default Login;