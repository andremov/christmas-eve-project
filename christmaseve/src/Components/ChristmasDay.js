import React, {Component} from 'react';

export class ChristmasDay extends Component {

    state = {
        rows : [],
        diff : 0
    };

    componentDidMount() {

        let current = new Date(2019, 11, 27);
        let nextChristmas =new Date (current.getFullYear(),11,25);
        let diff = this.daysBetween(current, nextChristmas);
        if (diff < 0) {
            nextChristmas =new Date (current.getFullYear()+1,11,25);
            diff = this.daysBetween(current, nextChristmas);
        }

        let rows = [];
        if (diff !== 0) {

            let rowWords = 4;
            let row = 0;
            let w = diff-1;
            while (w > 0) {
                rows[row] = [];
                rows[row].key = row;
                rows[row].words = [];
                rows[row].size = (15-(3*row))+'em';
                for (let word = 0; word < rowWords; word++) {
                    rows[row].words[word] = [];
                    rows[row].words[word].name = 'Eve';
                    rows[row].words[word].key = word;
                }
                w -= rowWords;
                row ++;
                rowWords ++;
                if (rowWords > 8) {
                    rowWords = 14;
                }
            }
        }
        this.setState({
            rows,
            diff
        })
    }

    daysBetween = function( dt1, dt2 ) {
        let one_day=1000*60*60*24;

        let nd2 = Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate());
        let nd1 = Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate());

        let difference = nd2 - nd1;

        return Math.ceil(difference/one_day);
    };

    render() {
        const rows = this.state.rows;
        const diff = this.state.diff;

        return(
            <div className='center color-blue p-5 d-block w-80 text-center flex'>
                <span className='font-size-huge'>Today is</span>
                <span className='font-size-large'>{diff === 0 ? ' Christmas Day!' : ' Christmas Eve '}</span>
                {rows.map(row => {
                    return (
                    <span style={{fontSize: row.size}} key = {row.key}>
                        {row.words.map(word => {
                            return(
                            <span key={word.key}>
                                {word.name + ' '}
                            </span>
                            )
                        })}
                    </span>
                    )
                })}
            </div>
        );
    }
}