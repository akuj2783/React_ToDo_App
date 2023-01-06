import React from "react";

export default function Footer({length})
{
    return(
        <footer>
            <div className="footer">{length} {length===1?"item":"items"} present in List
            <p >Build By AKUJ</p></div>
            
        </footer>
        
    )
}