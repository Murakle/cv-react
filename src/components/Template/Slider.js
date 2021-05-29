import React, {Component} from "react";
import SliderMenu from "./SliderMenu";
import Slide from "./Slide"
import "./Slider.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";


export default class Slider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: 0,
            noActive: false,
            oldActive: 0,
            hideImage: false
        };

    }


    prevSlide() {
        this.setState({hideImage: true});
        setTimeout(() => {
            let newActive = (this.state.active - 1 + this.props.amount) % this.props.amount;
            this.setState({noActive: true});
            this.setState({active: newActive});
            setTimeout(() => {
                this.setState({oldActive: newActive, noActive: false});
                setTimeout(() => {
                    this.setState({hideImage: false});
                }, 400);
            }, 400);
        }, 400)


    }

    // setTimeout(
    //     () => {
    //         this.setState({
    //             active: newActive
    //         })
    //     }, 800
    // )


    nextSlide() {
        this.setState({hideImage: true});
        setTimeout(() => {
            let newActive = (this.state.active + 1) % this.props.amount;
            this.setState({noActive: true});
            this.setState({active: newActive});
            setTimeout(() => {
                this.setState({oldActive: newActive, noActive: false});
                setTimeout(() => {
                    this.setState({hideImage: false});
                }, 400);
            }, 400);
        }, 400);
        // setTimeout(
        //     () => {
        //         this.setState({
        //             active: newActive
        //         })
        //     }, 800
        // )
    }

    componentDidMount() {

    }

    render() {
        // console.log(no)
        return (
            <div className={"slider-container"}>
                <SliderMenu amount={this.props.data.length} active={this.state.active}/>
                <div className={"slider-image-bg"}/>
                <div className={"slider-main-container"}>
                    <div className={"slider-arrow-container"} onClick={() => this.prevSlide()}>
                        <FontAwesomeIcon className={"slider-icon"} icon={faAngleLeft}/>
                    </div>
                    {this.props.data.map(
                        (slide, i) => (
                            <Slide key={"slide-" + i} amount={this.props.data.length} rating={slide.rating} text={slide.text} header={slide.header}
                                   active={this.state.active} index={i} noActive={this.state.noActive}
                                   oldActive={this.state.oldActive} hideImage={this.state.hideImage}
                                   image={slide.image}
                            />
                        )
                    )}


                    {/*<Slide amount={this.props.amount} rating={this.props.rating} text={this.props.text}*/}
                    {/*       active={this.state.active} index={0} noActive={this.state.noActive}*/}
                    {/*       oldActive={this.state.oldActive} hideImage={this.state.hideImage}/>*/}
                    {/*<Slide amount={this.props.amount} rating={this.props.rating} text={this.props.text}*/}
                    {/*       active={this.state.active} index={1} noActive={this.state.noActive}*/}
                    {/*       oldActive={this.state.oldActive} hideImage={this.state.hideImage}/>*/}
                    {/*<Slide amount={this.props.amount} rating={this.props.rating} text={this.props.text}*/}
                    {/*       active={this.state.active} index={2} noActive={this.state.noActive}*/}
                    {/*       oldActive={this.state.oldActive} hideImage={this.state.hideImage}/>*/}
                    <div className={"slider-arrow-container"} onClick={() => this.nextSlide()}>
                        <FontAwesomeIcon className={"slider-icon"} icon={faAngleRight}/>
                    </div>
                </div>
            </div>
        )
    }
}
