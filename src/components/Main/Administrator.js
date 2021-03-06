import React, { useState, useEffect } from "react"
import SpeiseplanPanel from "./MealCenter/SpeiseplanPanel"
import UserC from "./UserCenter/UserC"
import DocentEditor from "./DocentEditor/DocentEditor"
import ClassDepCenter from "./ClassDepCenter/ClassDepCenter"
import MealReport from "./MealReportCenter/MealReport"
import ReportMeal from "./ReportMealCenter/ReportMeal"

function Administrator({ props }) {
    
    const [curPage, setCurPage] = useState(0)
    const [closingState, setClosingState] = useState(false)

    useEffect(()=>{
        if(curPage>0){
            setClosingState(true)
            var id = "s" + curPage;
            document.getElementById(id).classList.add("flex-center-div");
            setTimeout(()=>{var spalte = "spalte"+curPage;var spaltebig = "spalte_big"+curPage; var img="bigImg";var id = "s" + curPage;document.getElementById(id).classList.replace(spalte,spaltebig);document.getElementById(id).classList.add(img);document.getElementById(id).classList.remove("flex-center-div");setClosingState(false)},1000)
        }
    },[curPage])

    const closeHandler = async () => {
        var id = "s" + curPage;
        var anim = "spalte_anim" + curPage;
        document.getElementById(id).classList.replace("spalte_anim",anim);
        if(curPage===1){
            document.getElementById("us").classList.replace("userSend","userSend2");
        }
        setClosingState(true)
        setTimeout(() => {setCurPage(0);setClosingState(false)}, 1001);
    }

    return (
        <div>
            <div className="zeile" style={{ marginTop: "5vh" }}>
                <div id="s1" className={curPage === 1 ? "spalte1 spalte_anim" : "spalte1"} onClick={() => setCurPage(1)}><div className="spalte1Img"></div>{curPage===1?<UserC close={closingState}/>:"User-Kontrollzentrum"}</div>
                <div id="s2" className={curPage === 2 ? "spalte2 spalte_anim" : "spalte2"} onClick={() => setCurPage(2)}>{curPage===2?<SpeiseplanPanel close={closingState}/>:"Speiseplan"}<div className="spalte2Img"></div></div>
                <div id="s3" className={curPage === 3 ? "spalte3 spalte_anim" : "spalte3"} onClick={() => setCurPage(3)}>{curPage===3?<DocentEditor close={closingState}/>:"Dozenten"}<div className="spalte3Img"></div></div>
            </div>
            <div className="zeile">
                <div id="s4" className={curPage === 4 ? "spalte4 spalte_anim" : "spalte4"} onClick={() => setCurPage(4)}>{curPage===4?<ClassDepCenter close={closingState}/>:"Klassen / Abteilungen"}<div className="spalte2Img"></div></div>
                <div id="s5" className={curPage === 5 ? "spalte5 spalte_anim" : "spalte5"} onClick={() => setCurPage(5)}>{curPage===5?<ReportMeal close={closingState}/>:"Essen Melden"}<div className="spalte2Img"></div></div>
                <div id="s6" className={curPage === 6 ? "spalte6 spalte_anim" : "spalte6"} onClick={() => setCurPage(6)}>{curPage===6?<MealReport close={closingState}/>:"Gemeldete Essen"}<div className="spalte2Img"></div></div>
            </div>
            {curPage != 0 && !closingState ? <div class="close" onClick={() => closeHandler()}>X</div> : ""}
        </div>
    )
}

export default Administrator