import React from 'react';
import Cookies from 'js-cookie';

class Register extends React.Component {


    constructor(props) {
        super(props);
        this.state={
            errorText:""
        };
    }

    submitRegistrationForm = (event) => {
        event.preventDefault();
        const target = event.target;
        const formdata = new FormData(target);
        const data = {
            csrfmiddlewaretoken: formdata.get('csrfmiddlewaretoken'),
            username: formdata.get('username'),
            password: formdata.get('password'),
            password2: formdata.get('password2'),
            email: formdata.get('email')
        }

var status = 0;
        fetch("http://localhost:8000/register", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken')
              },
            body: JSON.stringify(data),
            credentials: 'include'
        }).then(response =>  {
            status = response.status;
            return response.json();
        }).then(data => {
           if (status == 200) {
               // Registration successful
               Cookies.set('session-id', data.token);
           } else {
               // Login unsuccessful
               if (typeof(data.error) == "string") {
                   this.setState({errorText: data.error});
               } else {
                   this.setState({errorText: "Unable to register"});
               }
           }
        }).catch(err => {
            console.log(err);
        })
    }

    doLogin = (e) => {
        this.props.doLogin();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.submitRegistrationForm}>
                    <input type="hidden" name="csrfmiddlewaretoken" value={Cookies.get("csrftoken")} />
                    <label htmlFor="username">Username: </label>
                    <input id="username" name="username" type="text" />

                    <label htmlFor="password">Password: </label>
                    <input id="password" name="password" type="password" />

                    <label htmlFor="password2">Confirm Password: </label>
                    <input id="password2" name="password2" type="password" />

                    <label htmlFor="email">Email: </label>
                    <input id="text" name="email" type="text" />

                    {this.state.errorText}
                    <input type="submit" value="submit" />
                </form>
                <button onClick={this.doLogin}>Log into existing account</button>
            </div>
        );
    }

}

export default Register;

