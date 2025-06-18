import React, { useEffect, useState, useCallback } from "react";
import NewsItem from "./newsitem";
import Spinner from "./spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = ({
  country = "us",
  pageSize = 10,
  category = "general",
  apiKey = "6a021ca8118743608878cc2a5b31427d",
  setProgress
}) => {
  const [articles, setArticles] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(category)} - NewsMonkey`;
  }, [category]);

  const fetchNews = useCallback(async () => {
    if (setProgress) setProgress(0);
    // setLoading(true);
    let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=1&pageSize=${pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(parsedData.articles || []);
    setTotalResults(parsedData.totalResults);
    // setLoading(false);
    if (setProgress) setProgress(100);
  }, [country, category, apiKey, pageSize, setProgress]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const fetchMoreData = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
    let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${nextPage}&pageSize=${pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles((prevArticles) => prevArticles.concat(parsedData.articles || []));
    setTotalResults(parsedData.totalResults);
  };

  return (
    <div className="container my-3">
      <h1 className="headline mt-5 text-center">
        NewsMonkey - Top Headlines on {capitalizeFirstLetter(category)}
      </h1>

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<Spinner />}
        className="container"
      >
        <div className="row mt-5">
          {articles.map((element) => (
            <div className="col-md-4" key={element.url}>
              <NewsItem
                title={element.title ? element.title.slice(0, 45) : ""}
                description={
                  element.description ? element.description.slice(0, 88) : ""
                }
                imageUrl={element.urlToImage}
                newsUrl={element.url}
                author={element.author ? element.author : "unknown"}
                date={element.publishedAt}
                source={element.source.name}
              />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apiKey: PropTypes.string,
  setProgress: PropTypes.func
};
News.defaultProps = {
  country: "us",
  pageSize: 10,
  category: "general"
};



export default News;



// import React, { Component } from "react";
// import NewsItem from "./newsitem";
// import Spinner from './spinner';
// import PropTypes from 'prop-types'
// import InfiniteScroll from "react-infinite-scroll-component";



// export class News extends Component {
//   static defaultProps = {
//     country: 'us',
//     pageSize: 10,
//     category: "general",
//     apiKey : "6a021ca8118743608878cc2a5b31427d"

//   }
//   static propTypes = {
//     country: PropTypes.string,
//     pageSize: PropTypes.number,
//     category: PropTypes.string
//   }
//   capitilizeFirstLetter = (string) => {
//     return string.charAt(0).toUpperCase() + string.slice(1);
//   }
//   constructor(props) {
//     super(props);
//     this.state = {
//       articles: [],
//       loading: false,
//       page: 1,
//       totalResults : 0
//     };
//     document.title = `${this.capitilizeFirstLetter(this.props.category)} - NewsMonkey`;
//   }
//   async updateNews() {
//     window.addEventListener('keydown', this.handleArrowClick);
//     this.props.setProgress(0);
//     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;

//     this.setState({ loading: true })
//     let data = await fetch(url);
//     let parseData = await data.json();
//     this.setState({
//       articles: parseData.articles ? parseData.articles : [],
//       totalResults: parseData.totalResults,
//       loading: false
//     });
//     this.props.setProgress(100);

//   }
//   async componentDidMount() {
//     this.updateNews();
//   }
//   // handlePrevClick = async () => {

//   //   this.setState({ page: this.state.page - 1 });
//   //   this.updateNews();
//   // };
//   // handleNextClick = async () => {

//   //   this.setState({ page: this.state.page + 1 });
//   //   this.updateNews();


//   // };
//   // handleArrowClick = async (event) => {
//   //   if (event.key === 'ArrowRight') {
//   //     this.handleNextClick();
//   //   }
//   //   if (event.key === 'ArrowLeft') {
//   //     this.handlePrevClick();
//   //   }
//   // };

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleArrowClick);
//   }

//   fetchMoreData = async () => {
//     this.setState({
//       page: this.state.page + 1
//     });
  
//     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6a021ca8118743608878cc2a5b31427d&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    
//     this.setState({ loading: true });
  
//     let data = await fetch(url);
//     let parseData = await data.json();
  
//     this.setState({
//       articles: this.state.articles.concat(parseData.articles || []),
//       totalResults: parseData.totalResults,
//       loading: false
//     });
//   };
  

//   render() {
//     // const { news } = this.state;

//     // if (!news) {
//     //   return <Spinner/>; // Or show nothing/spinner
//     // }
//     return (
//       <div className="container my-3">
//         <h1 className="mt-5 text-center">NewsMonkey - Top Headlines on {this.capitilizeFirstLetter(this.props.category)}</h1>
//         {/* {this.state.loading && <Spinner/>} */}

//         <InfiniteScroll
//           dataLength={this.state.articles.length}
//           next={this.fetchMoreData}
//           hasMore={true}
//           loader={<Spinner/>}
//           className="container"
//         > 
//         <div className="row mt-5">
//           {this.state.articles.map((element) => {
//             return (
//               <div className="col-md-4" key={element.url}>
//                 <NewsItem
//                   title={element.title ? element.title.slice(0, 45) : ""}
//                   description={
//                     element.description ? element.description.slice(0, 88) : ""
//                   }
//                   imageUrl={element.urlToImage}
//                   newsUrl={element.url}
//                   author={element.author ? element.author : "unknown"}
//                   date={element.publishedAt}
//                   source={element.source.name}
//                 />
//               </div>
//             );
//           })}
//         </div>
//         </InfiniteScroll>
//         {/* <div className="container mt-3 d-flex justify-content-between">
//           <button
//             disabled={this.state.page <= 1}
//             type="button"
//             className="btn btn-dark"
//             onClick={this.handlePrevClick}
//           >
//             &larr; Previous
//           </button>
//           <button
//             disabled={this.state.page > Math.ceil(this.state.totalResults / this.props.pageSize)}
//             type="button"
//             className="btn btn-dark"
//             onClick={this.handleNextClick}


//           >
//             Next &rarr;
//           </button>
//         </div>  */}
//       </div>
//     );
//   }
// }

// export default News;
