import React from 'react';

export function BeersList(props) {
    return (
        <div className="App-list">
            {
                props.beers.map(beer => (
                    <div key={beer.id} className="App-list-item">
                        <figure className="App-list-item-img">
                            <img src={beer.image_url} />
                        </figure>
                        <div className="List-item-info">
                            <p>{beer.name}</p>
                            <ul>
                                <li><small>ABV: {beer.abv}</small></li>
                                <li><small>Volume: {beer.volume.unit} {beer.volume.unit}</small></li>
                            </ul>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
