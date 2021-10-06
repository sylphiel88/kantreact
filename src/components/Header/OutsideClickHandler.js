import React, { Component } from "react"
import Dropdown from "./Dropdown";
import PropTypes from 'prop-types';

export default class OutsideClickHandler extends React.Component {
    constructor(props) {
        super(props);
        this.state= {open:true}
        this.wrapperRef = React.createRef();
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        console.log(this.wrapperRef);
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClick = () => {
        this.state= {open:!this.state.open}
    };
    handleClickOutside(event) {
        console.log(this.wrapperRef)
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            console.log(this.wrapperRef.current)
            this.wrapperRef.current.firstChild.changeOpen()
        }
    }
    render() {
        return (
            <div ref={this.wrapperRef}>
                {this.props.children}
            </div>
            );
        }
    }