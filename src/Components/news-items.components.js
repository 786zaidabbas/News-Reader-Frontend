import React, { Component } from 'react';
import Accordians from "./Accordians.components";
import axios from 'axios';

export default class NewsItems extends Component {

  
  // Defining Component state and properties
  constructor(props) {
    super(props);
    this.state = {
      NewsItems: [],
      search_filter: '',
      page_filter: 1,
      has_next: false,
      has_previous: false,
      current_page: 0,
      total_pages: 0,
      stateBustingKey: 0
    };
    this.updateInput = this.updateInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);    
  }


  // Simply updating search bar input
  updateInput(event) {
    this.setState({ search_filter: event.target.value, page_filter: 1 });
  }


  // Renders child component in parent 
  newsItems(currentPage, total_pages, stateBustingKey) {

    return this.state.NewsItems.map(function (currentNewsItem, i) {
      return <Accordians key={stateBustingKey} newsitem={currentNewsItem} currentPage={currentPage} totalPages={total_pages} ></Accordians>;
    });
  }


  // Handler for backend communication through searchbar
  handleSubmit() {
    console.log('Your input value is: ' + this.state.search_filter)
    axios.post('http://localhost:4000/NewsItems/searchNews', {
      search_filter: this.state.search_filter,
      page_filter: this.state.page_filter
    })
      .then(response => {
        this.setState({
          NewsItems: response.data.news_items, search_filter: this.state.search_filter,
          page_filter: this.state.page_filter, has_next: response.data.has_next, has_previous: response.data.has_previous,
          current_page: response.data.current_page, total_pages: response.data.total_pages, stateBustingKey: this.state.stateBustingKey + 1
        });
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  

  // Rendering NewsItemComponent view and referencing to child component view i.e. Accordians 
  render() {
    console.log("render() method");
    return (
      <div className='Content'>
        <br />
        <input className='searchBar' placeholder='       Search by stock, sector..'
          onChange={this.updateInput}></input>
          &nbsp;&nbsp;
        <button className='buttonClass' onClick={this.handleSubmit}>Search</button>
        <hr />

        { this.newsItems(this.state.current_page, this.state.total_pages, this.stateBustingKey)}

      </div>
    )
  }

}
