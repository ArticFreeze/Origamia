import React from 'react';
import Cookies from 'js-cookie';

import LevelMenuItem from './LevelMenuItem';

class LevelMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            levels: []
        }
    }

    componentDidMount() {
        fetch("http://localhost:8000/levels/levelMenu", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
              //  'X-CSRFToken': Cookies.get('csrftoken'),
                'authorization': 'token '+Cookies.get('session-id')
            }
        }).then(res => {
            return res.json();
        }).then(data => {
            console.log(data);
            this.setState({
                levels: data.map(level => {
                    return {
                        id: level.id,
                        name: level.name,
                        difficulty: level.difficulty
                    }
                })
            })
        });
    }

    levelSelectionHandler = (id) => (e) => {
        console.log(this.state.levels);
        this.props.didSelectLevel(id);
    }

    render() {
        return (
            <div>
                {this.state.levels.map(level => {
                    return (
                        <LevelMenuItem levelID={level.id} levelSelected={this.levelSelectionHandler(level.id)} lName={level.name} difficulty={level.difficulty} />
                        );
                    }
                    )
                }
            </div>
        )
    }

}

export default LevelMenu;