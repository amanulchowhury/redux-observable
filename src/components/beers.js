import React from 'react';
import {connect} from 'react-redux';
import {search, cancel} from '../reducers/beersActions'
import { BeersList } from './beersList';
import { setConfig } from '../reducers/configActions';

export function Beers({data, messages, status, search, cancel, config, setConfig}) {
    return (
        <div>
            <div className="App-inputs">
                <select
                    name='per-page'
                    defaultValue={config.perPage}
                    onChange={(e) => setConfig({
                        perPage: Number(e.target.value)
                    })}>
                    {[1,2,3,4,5,6,7,8,9,10].map(value => {
                        return <option key={value} value={value}>{value} results</option>
                    })}
                </select>
                <input placeholder="search beers" 
                onChange={evt => search(evt.target.value)}/>
                {status === 'pending' && (
                    <>
                        <button type="button" onClick={cancel}>
                            Cancel
                        </button>
                        <span className="App-spinner">
                            Loading...
                        </span>
                    </>
                )}
            </div>
            {status === 'success' && (
                <BeersList beers={data}/>
            )}
            {status === 'failure' && (
                <div>
                    {messages[0].text}
                </div>
            )}
        </div>
    )
}

function mapState(state) {
    return { 
        ...state.beers,
        config: state.config
    }
}

export default connect(mapState, {search, cancel, setConfig})(Beers);