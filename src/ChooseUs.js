import React from "react";

function ChooseUs(props) {
    return (
        <div class="card border-0 mb-3 text-center" style={{ maxWidth: "14rem" }}>
            <div class="card-header">{props.icon}</div>
            <div class="card-body">
                <h5 class="card-title">Secondary card title</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
        </div>
    )
}

export default ChooseUs;