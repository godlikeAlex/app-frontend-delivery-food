import React, {useState} from 'react';
import {Dropdown} from 'semantic-ui-react';
import {searchRestaurant} from '../core/API';
import {withRouter} from 'react-router-dom';

const Search = ({style = {}, history}) => {
    const [search, setSearch] = useState('');
    const [result, setResult] = useState([]);

    const handleSearch = e => {
        setSearch(e.target.value);

        searchRestaurant(search).then(data => {
            if(data.err) {
                console.log(data.err);
            } else {
                let results = [];
               
                data.forEach(item => results.push({key: item._id, value: item._id, text: item.name}))
                setResult(results);
            }
        })
    }

    const onSelect = (e, {value}) => {
        history.push(`/restaurant/${value}`);
    };

    return (
        <Dropdown
            placeholder='Поиск рестаранов'
            noResultsMessage='Рестораны не найдены. 🙁'
            fluid
            className='search-restaurant-input'
            search
            selection
            onLabelClick={onSelect}
            onSearchChange={handleSearch}
            value={search}
            onChange={onSelect}
            icon='search'
            style={style}
            options={result}
        />
    )
}

export default withRouter(Search);