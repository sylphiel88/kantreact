import React from 'react';
import DropdownItem from './DropdownItem';
import { IoIosAddCircleOutline, IoMdPizza } from "react-icons/io"

export default class Dropdown extends React.Component {
    constructor(props) {
        super(props)
        this.wrapperRef = React.createRef()
        this.state = {open:true}
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    changeOpen = () => {
        if(this.state.open==this.props.stateo) {
            this.setState({ open: !this.state.open })
            this.props.handler()
        }
    }

    handleClickOutside(event) {
        if (this.wrapperRef){
            if(!this.wrapperRef.current.contains(event.target) && !(event.clientY<60) || (event.clientX<1650)) {
                this.changeOpen()
            }
        }
    }
    render() {
        if(this.state.open==true) {
            return(
                <div ref={this.wrapperRef} className="dropdown">
                    <DropdownItem leftIcon={<IoIosAddCircleOutline/>}><a href="/register">Registrieren</a></DropdownItem>
                    <DropdownItem leftIcon={<IoMdPizza/>}><a href="/speiseplan">Speiseplan</a></DropdownItem>
                </div>
            )
        } else {
            return null
        }
    }
}