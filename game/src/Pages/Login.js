// Cite: https://medium.com/@everdimension/how-to-handle-forms-with-just-react-ac066c48bd4f
import React from 'react';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            errorText:"khkjkkbkbJHIKL"
        };
    }

    submitLoginForm = (that) => async (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        //var that = this;

        //const resp = await fetch('http://127.0.0.1:8000/login');
        //const resp = await res.json();
        // TODO: implement CSRF here
        const resp = await fetch('http://localhost:8000/login', {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
//        .then((response) => {
//            const resp = response;
//            console.log(response);
//        })
        console.log(resp);
        console.log(data);
        if(resp.status == 200){
            that.setState({
            errorText: "Login Successful!"})
        } else {
           that.setState({
               errorText: resp.nonFieldErrors})
            }
    }

    loginSuccess(){

    }

//TODO: implement error text
    render() {
        return (
            <div>
                <form onSubmit={this.submitLoginForm(this)}>
                    <label htmlFor="username">Username: </label>
                    <input id="username" name="username" type="text" />

                    <label htmlFor="password">Password: </label>
                    <input id="password" name="password" type="password" />

                    {this.state.errorText}
                    <button>Login</button>
                </form>
            </div>
        );
    }

}

export default Login;