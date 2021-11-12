import React, { useEffect, useState } from "react";

function NumberText(props) {
    const [num, setNum] = useState("")

    useEffect(() => {
            var numb = props.num
            setNum(numb < 10 ? "0" + numb : "" + numb)
    })
    return <div className={"classCreator "+props.cla} onWheel={props.wheelHandler}>{num}</div>
}

export default NumberText