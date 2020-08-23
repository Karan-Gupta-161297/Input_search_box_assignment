import React from 'react';
import './autocomplete.css';

const initialState = {
    activeIndex: 0,
    filteredSet: [],
    showSet: false,
    userInput: "Search User by Id,Address,Name or Pincode",

}


const FilteredList = (props) => {

    return (

        <ul class="suggestions">
            {props.filteredSet.length > 0 ? (props.filteredSet.map((suggestion, index) => {
                if (index === props.index) {
                    return (
                        <li class="suggestion-active" key={suggestion}>
                            {suggestion.id},
                            {suggestion.name},
                            {suggestion.address},
                            {suggestion.pincode},
                            {suggestion.items}
                        </li>
                    );
                }
                else {
                    return (
                        <li key={suggestion}>
                            {suggestion.id},
                            {suggestion.name}
                            {suggestion.address},
                            {suggestion.pincode},
                            {suggestion.items}
                        </li>
                    );
                }
            })) : (
                    <li>No Results Found</li>
                )
            }
        </ul>
    );
}

const AutoComplete = (props) => {

    const [search, setSearch] = React.useState(initialState);
    let options = props.options;

    const onChange = (e) => {
        console.log(search);
        const userInput = e.currentTarget.value;
        const filteredResult = options.filter(option => {
            return Object.keys(option).some(function (key) {
                return option[key].includes(userInput);
            });
        });

        setSearch({
            ...search,
            filteredSet: filteredResult,
            userInput,
            showSet: true,
        });
    }

    const onKeyPress = (e) => {
        console.log("Key is pressed");
        if (e.keyCode === 13) {
            setSearch({
                ...search,
                activeIndex: 0,
                showSet: false,
                userInput: search.filteredSet[search.activeIndex],
            })
        }
        else if (e.keyCode === 38) {
            if (search.activeIndex === 0) {
                return;
            }

            setSearch({
                ...search,
                activeIndex: search.activeIndex - 1,
            })

        }

        else if (e.keyCode === 40) {
            if (search.activeIndex === search.filteredSet.length - 1) {
                return;
            }
            setSearch({
                ...search,
                activeIndex: search.activeIndex + 1,
            })
        }
    };

    const onClick = (e) => {
        setSearch({
            ...search,
            activeIndex: 0,
            showSet: false,
            filteredSet: [],
            userInput: e.currentTarget.innerText,
        })
    }

    return (
            <div class="card">
                <input type="text" onChange={onChange} onClick={onClick} onKeyDown={onKeyPress} class="search-box" value={search.userInput} />
                {search.showSet && (<FilteredList filteredSet={search.filteredSet} index={search.activeIndex} />)}
            </div>
    );
}

export default AutoComplete;

