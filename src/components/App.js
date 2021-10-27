import React from "react"
import MyHeader from "./MyHeader"
import MyFooter from "./MyFooter"
import Content from "./Content"

function App() {
    return (<div>
        <div id="header"><MyHeader /></div>
        <div id="app" class="app">
            <div id="content"><Content /></div>
        </div>
        <div id="footer" class="footer1"><MyFooter /></div>
    </div>
    )
}

export default App