import React, {Component} from "react";
import "./SliderMenu.css"


export default class SliderMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {};

    }


    render() {
        return (
            <div className="slider-menu">
                {
                    [...Array(this.props.amount).keys()].map(
                        (item) => (
                            <div key={"slider-menu-item" + item}
                                 className={"slider-menu-item" + (this.props.active === item ? " slider-menu-item-active" : "")}
                            />
                        ))
                }
            </div>
        )
    }

}
