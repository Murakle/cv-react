import React, {Component} from "react";


export default class Slide extends Component {
    constructor(props) {
        super(props);
        this.state = {};

    }


    componentDidMount() {

    }

    render() {
        let resClass = "slider-content ";
        if (!(this.props.active === this.props.index && !this.props.noActive)) {
            if (this.props.noActive) {
                if (this.props.index === this.props.oldActive) {
                    resClass += ((this.props.oldActive + 1) % this.props.amount) === this.props.active ? " slide-hidden-left" : " slide-hidden-right";
                } else {
                    resClass += ((this.props.oldActive + 1) % this.props.amount) === this.props.index ? " slide-hidden-right" : " slide-hidden-left";
                }
            } else {
                resClass += ((this.props.active + 1) % this.props.amount) === this.props.index ? " slide-hidden-right" : " slide-hidden-left";
            }
        }
        return (
            <div className={resClass}>
                <div className={"slider-image-container"}>
                    <img
                        className={"slider-image" + (this.props.hideImage ? " slider-image-hidden" : "")}
                        src={this.props.image} alt={"Slider"}/>
                </div>
                <h3>{this.props.header}</h3>
                <p className={"slider-rating"}>{this.props.rating}</p>
                <p className={"slider-description"}>{this.props.text}</p>
            </div>
        )
    }
}

