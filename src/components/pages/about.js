import React from "react";
import profilePicture from "../../assets/images/bio/flowers.jpg";

export default function() {
  return (
    <div className="content-page-wrapper">
      <div 
        className="left-column"
        style={{
          background: "url(" + profilePicture + ") no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />
      <div className="right-column">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
       Cumque, alias dolorum. Modi illo nihil nisi ipsum! Voluptate laudantium ducimus esse dolorum alias molestias?
        Sapiente quas deleniti, at reprehenderit animi, repudiandae, 
        quos blanditiis provident ipsam ad quidem ipsa voluptate saepe labore doloribus! Excepturi ea eligendi, cupiditate at soluta sint neque in!
      </div>
    </div>
  );
}
