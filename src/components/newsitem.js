import React from "react";


const newsitem = (props) => {


  let { title, description, imageUrl, newsUrl, author, date, source } = props;
  return (
    <div className="mt-4 center-cards-xs">
      <>
        <div className="card" style={{ width: "18rem" }}>
          <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{ zIndex: '1', left: '90%' }}>
            {source}
          </span>
          <img src={!imageUrl ? "https://media.cnn.com/api/v1/images/stellar/prod/shutterstock-editorial-14680209k.jpg?c=16x9&q=w_800,c_fill" : imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
              {description}
            </p>
            <p className="card-text"><small className="text-muted">By {author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">
              Read More
            </a>
          </div>
        </div>
      </>
    </div>
  );

}

export default newsitem;
