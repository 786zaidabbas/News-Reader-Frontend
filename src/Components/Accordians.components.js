import React from 'react';
import axios from 'axios';
import { Accordion, Card } from "react-bootstrap";
import Pagination from '@material-ui/lab/Pagination';



function Accordians(newsitem) {

  // Defined state properties for newsItems and Page number change
  const [page, setPage] = React.useState(1);
  const [newsItem, setNewsItem] = React.useState(newsitem);



  // Function to update page number and load respective page content
  const ChangePage = (event, value) => {
    console.log('came here');
    setPage(value);
    handleSubmit(value);
  };


  // Handler for backend communication through pagination
  function handleSubmit(pageNumber) {
    console.log('Your input value is: ' + pageNumber)
    axios.post('http://localhost:4000/NewsItems/searchNews', {
      search_filter: 'Maruti Suzuki',
      page_filter: pageNumber
    })
      .then(response => {
        setNewsItem({ newsitem: response.data.news_items[0], currentPage: response.data.current_page });
        console.log('Modified state', newsItem);
      })
      .catch(function (error) {
        console.log(error);
      })
  }


  // Modifying Date and time format
  var finalDateTime = setdateTime(newsItem.newsitem.date_time);

  function setdateTime(dateString) {
    var year = dateString.substring(0, 4);
    var day = dateString.substring(8, 10);
    var time = dateString.substring(10, 16);
    var months = ["Jan", "Feb", "Mar", "Aprl", "May", "Jun",
      "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    var month = months[parseInt(dateString.substring(5, 7)) - 1];
    return (month + ' ' + day + ' ' + year + ' ' + time);
  }


  // Rendering view for Accordians(news items) and pagination
  return (
    <div>
      <Accordion>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0" className='HeaderCursor'>

            <div className='container'>
              <div style={{ maxWidth: '100px', paddingTop: '10px' }}>
                <b>{newsItem.newsitem.category}</b>
              </div>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <div className='insideContainer'>
                <div>
                  <b>{newsItem.newsitem.stocks[0]}</b>
                </div>
                <div>
                  {newsItem.newsitem.title}
                </div>
              </div>
            </div>
            <span style={{ paddingTop: '10px', float: 'right' }}>
              <b>{finalDateTime}</b>
            </span>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>

              <div className='container'>
                <div style={{ maxWidth: '100px', paddingTop: '10px' }}>
                  <b>{newsItem.newsitem.category}</b>
                </div>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <div className='insideContainer'>
                  <div>
                    <b>{newsItem.newsitem.stocks[0]}</b>
                  </div>
                  <div>
                    {newsItem.newsitem.title}
                  </div>
                </div>
              </div>
              <span style={{ paddingTop: '10px', float: 'right' }}>
                <b>{finalDateTime}</b>
              </span>

              <div style={{ marginLeft: '15px', marginTop: '100px' }}>
                <span className='stockStyle'>
                  {newsItem.newsitem.stocks[0]}
                </span>
                <div className='titleStyle'>
                  <b>{newsItem.newsitem.title}</b>
                </div>
                <div className='bodyStyle'>
                  <b>
                    <div dangerouslySetInnerHTML={{ __html: newsItem.newsitem.body }} />
                  </b>
                </div>
                <br /><br /><br />
                <span className='categoryStyle'>
                  # {newsItem.newsitem.category}
                </span>
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>

      <br />
      <Pagination count={newsitem.totalPages} color="primary" page={newsItem.currentPage == 1 ? 1 : page} onChange={ChangePage} className='paginationClass' />

    </div>
  );
}

export default Accordians;