import React, { Component } from "react";
import Display from "./Display";

type ApiState = {
    search: string,
    startDate: string,
    endDate: string,
    pageNumber: number,
    results: []
}


export default class ApiFetch extends Component<{}, ApiState> {
    constructor(props: ApiState) {
        super(props)
        this.state = {
            search: "test",
            startDate: "",
            endDate: "",
            pageNumber: 1,
            results: []
        }
    }

    fetchResults = () => {
        const baseURL: string = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        const key: string = "aC8lkKDK4tBU1EztFCzqeZxp3eQ5kASQ";  

        let url = `${baseURL}?api-key=${key}&page=${this.state.pageNumber}&q=${this.state.search}`;
        url = this.state.startDate ? url + `&begin_date=${this.state.startDate}` : url;
        url = this.state.endDate ? url + `&end_date=${this.state.endDate}` : url;
        console.log(url);
        fetch(url)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    results: data.response.docs
                })
                console.log(this.state);
            })
            .catch(err => console.log(err));
    };

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {   
        this.setState({ pageNumber: 1 });
        e.preventDefault();
        this.fetchResults();
    };


    changePageNumber = (e: React.MouseEvent<HTMLButtonElement>, direction: string) => {
        e.preventDefault()
        if (direction === "down") {
            if (this.state.pageNumber > 1) {
                this.setState({
                    pageNumber: this.state.pageNumber - 1
                }, this.fetchResults)
            }
        }
        if (direction === "up") {
            this.setState({
                pageNumber: this.state.pageNumber + 1
            }, this.fetchResults)
        }
    }

    render() {
        return(
            <div>
                <h1>NYT App</h1>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <span>Enter a single search term (required): </span>
                    <input type="text" name="search" onChange={
                        (e) => this.setState({ 
                            search: (e.target.value)
                        })
                    } required />
                    <br />
                    <span>Enter a start date: </span>
                    <input type="date" name="startDate" pattern="[0-9]{8}" onChange={
                        (e) => this.setState({
                            startDate: (e.target.value)
                        })
                    } />
                    <br />
                    <span>Enter an end date: </span>
                    <input type="date" name="endDate" pattern="[0-9]{8}" onChange={
                        (e) => this.setState({
                            endDate: (e.target.value)
                        })
                    }/>
                    <br />
                    <button className="submit">Submit search</button>
                </form>
                {
                    this.state.results.length > 0 ? <Display results={this.state.results} changePage={this.changePageNumber} page={this.state.pageNumber}/> : null
                }
            </div>
        )
    }
}
