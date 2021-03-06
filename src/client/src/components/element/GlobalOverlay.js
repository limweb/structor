import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

class GlobalOverlay extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this._mountNode = document.createElement('div');
        this._mountNode.style['z-index'] = '9999';
        document.body.appendChild(this._mountNode);
        ReactDOM.render(this._overlay, this._mountNode);
    }

    componentWillUnmount() {
        ReactDOM.unmountComponentAtNode(this._mountNode);
        this._mountNode = null;
    }

    componentDidUpdate() {
        if (this._mountNode) {
            ReactDOM.render(this._overlay, this._mountNode);
        }
    }


    render() {
        const { activeRequestsCount } = this.props;
        if (activeRequestsCount > 0) {
            const style = {
                position: 'absolute',
                top: '40%',
                left: '50%',
                width: '4em',
                height: '4em',
                margin: '-2em 0 0 -2em',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                color: '#ffffff',
                borderRadius: '.3em',
                verticalAlign: 'middle',
                textAlign: 'center',
                padding: '0.7em'
            };
            this._overlay = (
                <div style={{position: 'fixed', top: '0', left: '0', right: '0', bottom: '0', zIndex: '9999'}}>
                    <div style={{position: 'relative', width: '100%', height: '100%'}}>
                        <div style={style}>
                            <span style={{fontSize: '30px'}} className='fa fa-cog fa-spin'></span>
                        </div>
                    </div>
                </div>
            );
        } else {
            this._overlay = (
                <span></span>
            );
        }
        return (
            <span></span>
        );
    }

}

function mapStateToProps(state) {
    const { server } = state;
    return {
        activeRequestsCount: server.request.activeCount
    };
}

export default connect(mapStateToProps)(GlobalOverlay);
