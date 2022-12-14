import React from "react";
import "./Site.css";

class Site extends React.Component<> {
    constructor(props) {
        super(props);
        console.log("div:", this.props.fontSizeDivider)
        if (this.props.fontSizeDivider === undefined) {
            console.log("div undefined ....")
            this.state = {
                whiteScore: this.props.whiteScore,
                blackScore: this.props.blackScore,
                isChanged: false,
                fontSizeDivider: 1,
            }
        } else {
            this.state = {
                whiteScore: this.props.whiteScore,
                blackScore: this.props.blackScore,
                isChanged: false,
                fontSizeDivider: this.props.fontSizeDivider,
            }
        }

    }

    componentDidUpdate(prevProps) {
        if (prevProps.whiteScore !== this.props.whiteScore)
            this.setState({ whiteScore: this.props.whiteScore, isChanged: true })
        if (prevProps.blackScore !== this.props.blackScore)
            this.setState({ blackScore: this.props.blackScore, isChanged: true })
    }

    render() {

        return (
            <div>
                <div className="site-score" style={{
                    backgroundColor: this.state.whiteScore === this.state.blackScore ? "#828282" : this.state.whiteScore > this.state.blackScore ? "#7DB9DE" : "#005CAF",
                    height: this.props.size,
                    aspectRatio: 1
                }}>
                    <div className="d-flex flex-row justify-content-center align-items-center w-100 h-100">
                        <div className="site-black-score" style={{
                            fontSize: this.state.whiteScore < this.state.blackScore ? 70 / this.state.fontSizeDivider : 45 / this.state.fontSizeDivider,
                            color: "black", fontWeight: "bold"
                        }}>{this.state.blackScore}</div>
                        <div className="site-delimiter" style={{
                            fontSize: 80 / this.state.fontSizeDivider,
                            color: this.state.whiteScore > this.state.blackScore ? "white" : this.state.whiteScore < this.state.blackScore ? "black" : "#91989F"
                        }}>/
                        </div>
                        <div className="site-white-score" style={{
                            fontSize: this.state.whiteScore > this.state.blackScore ? 70 / this.state.fontSizeDivider : 45 / this.state.fontSizeDivider,
                            color: "white",fontWeight: "bold"
                        }}>{this.state.whiteScore}</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Site