import React from "react";

function Card({ item }) {
    return (
        <article className="card">
            <img className="card-image" src={item.imgSrc} alt={item.title} />
            <p className="card-title">{item.title}</p>
        </article>
    );
}

export default Card;