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
        const data = new FormData(event.target);
        var status = 0;
        fetch("http://localhost:8000/login", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrfToken')
              },
            body: data
        }).then(response =>  {
            status = response.status;
            return response.json();
        }).then(data => {
           if (status == 200) {
               // Login successful
               Cookies.set('session-id', data.token);
           } else {
               // Login unsuccessful
               if (typeof(data.non_field_errors) == "object") {
                   this.setState({errorText: data.non_field_errors[0]});
               } else {
                   this.setState({errorText: "Unable to log in"});
               }
           }
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.submitLoginForm}>
                    <input type="hidden" name="csrfmiddlewaretoken" value={Cookies.get("csrfToken")} />
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