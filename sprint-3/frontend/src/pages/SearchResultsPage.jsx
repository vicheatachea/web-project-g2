import React from 'react'
import CardList from "../components/CardList.jsx";

function SearchResultsPage() {
    const searches = [
        { id: 1, title: 'Result One', imgSrc: 'https://via.placeholder.com/150' },
        { id: 2, title: 'Result Two', imgSrc: 'https://via.placeholder.com/150' },
        { id: 3, title: 'Result Three', imgSrc: 'https://via.placeholder.com/150' },
        { id: 4, title: 'Result Four', imgSrc: 'https://via.placeholder.com/150' },
        { id: 5, title: 'Result Five', imgSrc: 'https://via.placeholder.com/150' },
        { id: 6, title: 'Result Six', imgSrc: 'https://via.placeholder.com/150' },
        { id: 7, title: 'Result Seven', imgSrc: 'https://via.placeholder.com/150' },
    ];

    return (
        <>
            <CardList title="Search Results" items={searches}/>
        </>
    )
}

export default SearchResultsPage
