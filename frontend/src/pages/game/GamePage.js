import React from "react";
import Site from "../../components/site/Site";
import ScoreLog from "../../components/socrelog/ScoreLog";
import ServerList from "../../service/utils";
import ReadyIcon from "../../components/ready_icon/ReadyIcon";
import TeamIcon from "../../components/team_icon/TeamIcon";
import teamInfo from "../../assets/teaminfo.json";
import field from "../../assets/field.png";
import {LoadingOutlined} from "@ant-design/icons";

import team1 from "../../assets/team1.png";
import team2 from "../../assets/team2.png";
import team3 from "../../assets/team3.png";
import team4 from "../../assets/team4.png";

import './game.css'

class GamePage extends React.Component<> {
    ws = new WebSocket(ServerList['view']);

    constructor(props) {
        super(props);
        this.imgSet = [team1, team2, team3, team4];
        this.state = {
            site:
                [
                    {
                        "Black": 0,
                        "White": 0
                    },
                    {
                        "Black": 0,
                        "White": 0
                    },
                    {
                        "Black": 0,
                        "White": 0
                    },
                    {
                        "Black": 0,
                        "White": 0
                    },
                    {
                        "Black": 0,
                        "White": 0
                    }
                ],
            scoreLog: [],
            state: 'None',  // None, Prepare, Game, Start, Settle
            ready: 'None',  // Black, White, None, Both
            whiteID: -1,
            blackID: -1
        }
        this.ws.onmessage = (m) => {
            if(m.data === "TESTING")
                return
            if (m.data.split('^')[1] === "Score") {
                this.setState({
                    scoreLog: JSON.parse(m.data.split('^')[2])
                })
            } else if (m.data.split('^')[1] === "State") {
                let temp = JSON.parse(m.data.split('^')[2])
                console.log(temp)
                this.setState({
                    state: temp['State'],
                    ready: !(temp['Ready']['Black'] || temp['Ready']['White']) ? 'None' : (temp['Ready']['Black'] && temp['Ready']['White'] ? 'Both' : (temp['Ready']['White'] ? 'White' : 'Black')),
                    whiteID: temp['Team']['White']-1,
                    blackID: temp['Team']['Black']-1
                })
            } else if (m.data.split('^')[1] === "Site") {
                this.setState({
                    site: JSON.parse(m.data.split('^')[2])
                })
            }
        }
    }

    render() {
        if (this.state.state === 'None')
            return (
                <div>
                    PLEASE RESET THE GAME FIRST
                </div>
            )
        else if (this.state.state === 'Prepare')
            return (
                <div className={"prepare-main d-flex flex-column justify-content-between align-content-between h-100 w-100 ready-state-" + this.state.ready}>
                    <div className="prepare-main d-flex flex-column justify-content-between align-content-between">
                        <h1 className='text-center' style={{marginTop: 30}}>Preparation Stage</h1>
                        <h3 className='text-center' style={{marginTop: 50}}><LoadingOutlined style={{marginRight: 30}} />Waiting for the command ...</h3>
                    </div>
                    <div className='d-flex flex-row justify-content-between m-4'>
                        <div>
                            <ReadyIcon teamName={teamInfo[this.state.blackID].name} teamImage={this.imgSet[this.state.blackID]} isReady={this.state.ready==='Black' || this.state.ready==='Both'} side={'Black'}/>
                        </div>
                        <div>
                            <img alt={"field"} src={field} className={'game-prepare-field' + (this.state.ready==='Both' ? ' game-prepare-ready' : ' game-prepare-not')}/>
                        </div>
                        <div>
                            <ReadyIcon teamName={teamInfo[this.state.whiteID].name} teamImage={this.imgSet[this.state.whiteID]} isReady={this.state.ready==='White' || this.state.ready==='Both'} side={'White'}/>
                        </div>
                    </div>
                </div>
            )
        else if (this.state.state === 'Settle')
            return (
                <div className="game-main d-flex flex-column align-content-center" style={{width: '100%', height: '100%'}}>
                    <h1 className='text-center m-5'>Game Settlement</h1>
                    <div className="game-site-log d-flex flex-row justify-content-around">
                        <div className="game-log d-flex">
                            <ScoreLog width={500} height={800} side={"Black"} data={this.state.scoreLog.filter(x=>x["Side"]==="Black")} />
                        </div>
                        <div className="game-sites" style={{height: 600, width: 600}}>
                            <div className="d-flex align-content-center flex-row w-100 h-100">
                                <div className="d-flex flex-column justify-content-between w-100 h-100">
                                    <Site size={180} whiteScore={this.state.site[1]["White"]} blackScore={this.state.site[1]["Black"]}/>
                                    <Site size={180} whiteScore={this.state.site[2]["White"]} blackScore={this.state.site[2]["Black"]}/>
                                </div>
                                <div className="d-flex flex-column justify-content-center w-100 h-100">
                                    <Site size={210} whiteScore={this.state.site[0]["White"]} blackScore={this.state.site[0]["Black"]}/>
                                </div>
                                <div className="d-flex flex-column justify-content-between w-100 h-100">
                                    <Site size={180} whiteScore={this.state.site[3]["White"]} blackScore={this.state.site[3]["Black"]}/>
                                    <Site size={180} whiteScore={this.state.site[4]["White"]} blackScore={this.state.site[4]["Black"]}/>
                                </div>
                            </div>
                        </div>
                        <div className="game-log d-flex">
                            <ScoreLog width={500} height={800} side={"White"} data={this.state.scoreLog.filter(x=>x["Side"]==="White")} />
                        </div>
                    </div>
                </div>
            )
        else
            return (
                <div className="game-main" style={{width: '100%', height: '100%'}}>
                    <div className='d-flex flex-column game-body'>
                        <div className='d-flex flex-row game-bar justify-content-around m-4'>
                            <TeamIcon side={'Black'} teamName={teamInfo[this.state.blackID].name} teamImage={this.imgSet[this.state.blackID]} />
                            <TeamIcon side={'White'} teamName={teamInfo[this.state.whiteID].name} teamImage={this.imgSet[this.state.whiteID]} />
                        </div>
                        <div className="game-site-log d-flex flex-row justify-content-around">
                            <div className="game-log d-flex">
                                <ScoreLog width={500} height={800} side={"Black"} data={this.state.scoreLog.filter(x=>x["Side"]==="Black")} />
                            </div>
                            <div className="game-sites" style={{height: 600, width: 600}}>
                                <div className="d-flex align-content-center flex-row w-100 h-100">
                                    <div className="d-flex flex-column justify-content-between w-100 h-100">
                                        <Site size={180} whiteScore={this.state.site[1]["White"]} blackScore={this.state.site[1]["Black"]}/>
                                        <Site size={180} whiteScore={this.state.site[2]["White"]} blackScore={this.state.site[2]["Black"]}/>
                                    </div>
                                    <div className="d-flex flex-column justify-content-center w-100 h-100">
                                        <Site size={210} whiteScore={this.state.site[0]["White"]} blackScore={this.state.site[0]["Black"]}/>
                                    </div>
                                    <div className="d-flex flex-column justify-content-between w-100 h-100">
                                        <Site size={180} whiteScore={this.state.site[3]["White"]} blackScore={this.state.site[3]["Black"]}/>
                                        <Site size={180} whiteScore={this.state.site[4]["White"]} blackScore={this.state.site[4]["Black"]}/>
                                    </div>
                                </div>
                            </div>
                            <div className="game-log d-flex">
                                <ScoreLog width={500} height={800} side={"White"} data={this.state.scoreLog.filter(x=>x["Side"]==="White")} />
                            </div>
                        </div>
                    </div>
                </div>
            )
    }
}

export default GamePage