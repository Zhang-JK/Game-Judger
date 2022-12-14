import React from "react";

/**
 * Creates a gif that only shows a certain amount of time and disappears
 */
class GifEffect extends React.Component {
    /**
     * 
     * @param {object} props 
     * @param {boolean} props.animate if set from false to true (rising edge), the gif will show once. a falling edge can interupt an on-going gif animation
     * @param {gif} props.gif specify the gif source (as you "import gifSource from <path>")
     */
    constructor(props) {
        super(props);

        this.state = {
            lastInputAnimateCount: 0,
            curInputAnimateCount: 0,
            animateDone: true,
            maxAnimateCount: 20,
            curAnimateCount: 0,
        };
    }

    componentDidMount() {
        this.setState({ curInputAnimateCount: this.props.animate, lastInputAnimateCount: this.props.animate });
        this.myInterval = setInterval(() => {

            this.setState({ curInputAnimateCount: this.props.animate });

            if (this.state.curInputAnimateCount !== this.state.lastInputAnimateCount) {
                console.log("start animation")
                this.setState({ lastInputAnimateCount: this.state.curInputAnimateCount, animateDone: false, curAnimateCount: 0 }) // start animation
            }

            const { maxAnimateCount, curAnimateCount } = this.state;

            if (!this.state.animateDone) {
                this.setState({ curAnimateCount: curAnimateCount + 1 })

                if (curAnimateCount + 1 >= this.state.maxAnimateCount) {
                    this.setState({ animateDone: true });
                }
            }


        }, 50)
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

    render() {
        if (!this.state.animateDone) {
            return (<img style={{ width: 300, height: 300 }} src={this.props.gif} alt="Gif" />);
        } else { return (<div></div>); }
    }
}

export default GifEffect;