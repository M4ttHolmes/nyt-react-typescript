import React from "react";

type ApiState = {
    page: number
    results: Result[]
    changePage(e: React.MouseEvent<HTMLButtonElement>, direction: string): void
}



type Result = {
    _id: string

    headline: {
        main: string,
    }
    
    multimedia: [{
        url: string
    }]

    snippet: string

    keywords: [{
        value: string
    }]

    web_url: string

}

const Display = (props: ApiState) => {
    const {changePage} = props;

    return (
        <div>
            <hr />
            <div>
                <button onClick={(e) => changePage(e, "down")}>Previous 10</button>
                <button onClick={(e) => changePage(e, "up")}>Next 10</button>
                <h4>Page: {props.page}</h4>
            </div>

            <hr />

            {props.results.map((result) => {
                return (
                    <div key={result._id} style={{textAlign: "left", margin: "50px"}}>
                        <a href={result.web_url}><h3>{result.headline.main}</h3></a>

                        {result.multimedia.length > 0 ? (
                            <img alt="article" src={`http://www.nytimes.com/${result.multimedia[0].url}`} />
                            ) : ( ""
                        )}
            
                        <p>
                            {result.snippet}
                            <br />
                            {result.keywords.length > 0 ? " Keywords: " : ""}
                        </p>

                        <ul>
                            {result.keywords.map((keyword) => (<li key={keyword.value}>{keyword.value}</li>
                            ))}   
                        </ul>   
                        <hr />
                    </div>
                );
            })}
        </div>
    )
}



export default Display