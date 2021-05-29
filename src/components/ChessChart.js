import React, {Component} from "react";
import "./DoughnutChart.css";
import axios from 'axios';
import {CircularProgress} from '@material-ui/core';
import Slider from "./Template/Slider";
import chessIcon from "./img/Chess/chess-icon.png";
import cfIcon from "./img/Chess/cf-icon.png"


export default class ChessChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            rapidRating: 0,
            cfRating: 0,
            dotaSpendTime: 0,
        };
        this.rapidRating = 0;
        this.min = 0;
        this.max = 2500;
        this.finished = 0;

    }


    startTick() {
        let rating = this.rapidRating;
        let powerTen = Math.pow(10, (3 - this.finished));
        let randomInt = Math.floor(Math.random() * powerTen);
        let result = Math.floor(rating / powerTen) * powerTen + randomInt;
        this.setState({rapidRating: result});
    }

    loadedTick() {
        this.finished++;
        if (this.finished === 4) {
            clearInterval(this.interval);
            clearInterval(this.interval2);
        }
    }


    componentDidMount() {
        this.interval = setInterval(() => this.startTick(), 150);
        const optionsChess = {
            method: "GET",
            url: "https://api.chess.com/pub/player/murakle/stats",
            // url: "https://cv-sails.herokuapp.com/cv/git-stats-ready",
        }
        const optionsCodeforces = {
            method: "GET",
            url: "https://codeforces.com/api/user.info?handles=dmd161100",
        }
        const optionsDota = {
            method: "GET",
            url: "http://api.steampowered.com/IPlayerService/GetOwnedGames/v1?key=60415F4B4DC7A17102AF1DE7ECD6FB3A&steamid=76561198142273481&format=json&include_appinfo=true&include_played_free_games=true",
        }
        axios.request(optionsChess)
            .then(res => res.data)
            .then(
                (result) => {
                    this.finished = 0;
                    this.setState({isLoaded: true, rapidRating: result.chess_rapid.last.rating});
                    this.rapidRating = result.chess_rapid.last.rating;
                    this.interval2 = setInterval(() => this.loadedTick(), 450);
                },
                (error) => {
                    console.log(error);
                    this.setState({isLoaded: true});
                    this.setState({error: error});
                }
            )
        axios.request(optionsCodeforces)
            .then(res => res.data.result[0])
            .then(
                (result) => {
                    this.setState({cfRating: result.rating})
                }
            )
        // let app_id = 570
        // axios.request(optionsDota)
        //     .then(res => console.log(res.data))
        //     .then(res => res.data.response.games)
        //     .then((result) => {
        //         result.foreach(game => {
        //             if (game.appid === app_id) {
        //                 this.setState({dotaSpendTime: Math.floor(game.playtime_forever / 60)});
        //             }
        //         })
        //         this.setState({cfRating: result.rating})
        //     })

    }


    render() {
        const data = [
            {
                header: "Chess Rating",
                rating: this.state.rapidRating,
                text: (
                    <span>My rating in rapid chess games, according to
                        <a href={"https://www.chess.com/member/murakle"}
                           target="_blank" rel="noopener noreferrer">chess.com</a>
                                <br/>
                        (Rapid game - game where every player has 10 minutes)
                    </span>
                ),
                image: chessIcon
            },
            {
                header: "Codeforces Rating",
                rating: this.state.cfRating,
                text: (
                    <span>Codeforces is a website that hosts competitive programming contests
                        <br/>
                        Even though I haven't participated in a long time ...
                        <a href={"https://codeforces.com/profile/dmd161100"}
                           target="_blank" rel="noopener noreferrer">codeforces.com</a>

                    </span>
                ),
                image: cfIcon
            },
            {
                header: "Dota 2",
                rating: this.state.dotaSpendTime + "h",
                text: (
                    <span>Codeforces is a website that hosts competitive programming contests
                        <br/>
                        Even though I haven't participated in a long time ...
                        <a href={"https://codeforces.com/profile/dmd161100"}
                           target="_blank" rel="noopener noreferrer">codeforces.com</a>

                    </span>
                )
            },

        ];
        const message = this.state.error ? <h3>Error: {this.state.error.message}</h3> : (
            !this.state.isLoaded ? <h3>Загрузка...<CircularProgress/></h3> : <h3>Chess Stats</h3>);
        return (
            <div>
                {message}
                <Slider
                    data={data}
                    rating={this.state.cfRating}
                    header={"Chess Rating"}
                    text={
                        <span> My rating in rapid chess games, according to <a
                            href={"https://www.chess.com/member/murakle"}
                            target="_blank" rel="noopener noreferrer">chess.com</a>
                                <br/>
                                (Rapid game - game where every player has 10 minutes)
                            </span>
                    }
                    amount={3}
                />
            </div>
        );

    }
}
