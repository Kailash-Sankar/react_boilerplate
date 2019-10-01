import React, { PureComponent } from 'react';
import Banner from '../../components/Banner';

//import mainStyles from '../../styles/main.less';

function Welcome () {
    return <h1 className="header">Hello World from React Boilerplate</h1>;
}

class Main extends PureComponent {
    render () {
        return (
            <div>
                <Welcome />
                <div style={{ marginTop: 20, textAlign: "center" }}>
                    <Banner text="development in progress" />
                </div>
            </div>
        );
    }
}

export default Main;
