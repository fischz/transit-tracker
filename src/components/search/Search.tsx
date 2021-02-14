import React, { useState } from 'react';

import {SearchContainer, SearchResult, SearchResultContainer, SearchTextInput} from "./Search.styles";

interface Props {
    name: string;
    value: string;
    results: string[] | undefined;
    onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
    onResultClick: (result: string) => void;
}

const RouteSearch: React.FC<Props> = ({onChange, onResultClick, name, value, results}) => {

    const [inFocus, setInFocus] = useState<boolean>(false);


    return <SearchContainer onFocus={() => {setInFocus(true)}} onBlur={() => {setInFocus(false)}}>
        <SearchTextInput type='text' name={name} onChange={onChange} value={value} placeholder={"Search for a stop..."}/>
        <SearchResultContainer isEnabled={inFocus}>
            {results?.map((r, i) => <SearchResult onMouseDown={() => {onResultClick(r)}} key={i}>{r}</SearchResult>) || null}
        </SearchResultContainer>
    </SearchContainer>
}

export default RouteSearch;