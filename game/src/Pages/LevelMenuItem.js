import React from 'react';
import Cookies from 'js-cookie';

class LevelMenuItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <button onClick={this.props.levelSelected}>Lvel {this.props.id}: {this.props.lName} ({this.props.difficulty})</button>
            </div>
        )
    }
}

export default LevelMenuItem;