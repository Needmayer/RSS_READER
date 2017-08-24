import React from 'react';
import { Link, browserHistory } from 'react-router';
import Menu from '../sidebar.js';
import CategoryInput from '../../common/CategoryInput.js';


class RssDialog extends React.Component {

    constructor() {
        super();
        this.state = {
            categoryTitles: ['']
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeCategoryTitle = this.changeCategoryTitle.bind(this);
    }


    handleSubmit() {

    }

    changeCategoryTitle(event) {
        let id = event.target.name;
        let newTitle = event.target.value;
        let titles = this.state.categoryTitles;

        titles[id] = newTitle;

        if (id == (titles.length - 1)) {
            titles.push("");
        }
        
        this.setState({
            categoryTitles: titles
        });
    }

    render() {

        let titles = this.state.categoryTitles;

        return (
            <div>
                <Menu />
                <div className="modal-dialog">
                    <div className="loginmodal-container">
                        <h1>Manage your Rss</h1><br />
                        <form onSubmit={this.handleSubmit}>
                            {
                                titles.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <input type="text" placeholder="Category title" name={index} onChange={this.changeCategoryTitle} />
                                            <CategoryInput />
                                        </div>
                                    );
                                })
                            }
                            <input type="submit" value="Save" className="login loginmodal-submit" />

                        </form>
                        <div className="login-help">
                            <Link to="/" onClick={this.redirectToHomePage}>Back to Home page</Link>
                        </div>

                    </div>
                </div>
            </div>
        );
    }

}



export default RssDialog;