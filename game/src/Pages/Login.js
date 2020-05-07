// Cite: https://medium.com/@everdimension/how-to-handle-forms-with-just-react-ac066c48bd4f
import React from 'react';
import Cookies from 'js-cookie';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            errorText:""
        };
    }

    componentDidMount = () => {
        fetch("http://localhost:8000/csrf").then(response => {
            return response.json();
        }).then(data => {
            Cookies.set("csrfToken", data.csrfToken);
        });
    }



    /**
     * Event handler used to handle the login event
     * @param event The login event
     */
    submitLoginForm = (event) => {
        event.preventDefault();
        const target = event.target;
        const formdata = new FormData(target);
        const data = {
            csrfmiddlewaretoken: formdata.get('csrfmiddlewaretoken'),
            username: formdata.get('username'),
            password: formdata.get('password')
        }
        const uname = data.username;

        var status = 0;
        fetch("http://localhost:8000/login", {
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
               // Login successful
               Cookies.set('session-id', data.token);
                localStorage.setItem('token', data.token);
             this.props.didLogIn(uname);
           } else {
               // Login unsuccessful
               if (typeof(data.error) == "string") {
                   this.setState({errorText: data.error});
               } else {
                   this.setState({errorText: "Unable to log in"});
               }
           }
        }).catch(err => {
            console.log(err);
        })
    }

    doRegister = (e) => {
        this.props.doRegister();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.submitLoginForm}>
                    <input type="hidden" name="csrfmiddlewaretoken" value={Cookies.get("csrftoken")} />
                    <label htmlFor="username">Username: </label>
                    <input id="username" name="username" type="text" />

                    <label htmlFor="password">Password: </label>
                    <input id="password" name="password" type="password" />

                    {this.state.errorText}
                    <input type="submit" value="submit" />
                </form>
                <button onClick={this.doRegister}>Create Account</button>
            </div>
        );
    }

}

export default Login;