import React from "react";

function ChooseUs(props) {
    return (
        <div class="card border-0 mb-3 text-center" style={{ maxWidth: "14rem" }}>
            <div class="card-header">{props.icon}</div>
            <div class="card-body">
                <h5 class="card-title">{props.title}</h5>
                <p class="card-text">{props.description}</p>
            </div>
        </div>
    )
}

export default ChooseUs;