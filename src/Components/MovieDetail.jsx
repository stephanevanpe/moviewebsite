/* Components/MovieDetail.jsx
This component corresponds to the "modal" of each movie.
*/

import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ReactPlayer from 'react-player'


const API_KEY = "81cccefa5d8106ac2032d82235c675bc";

class MovieDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
        trailers: [],
        isKeyFetched: false
    }

    this.changeApproval = this.changeApproval.bind(this); 
  };

  // It is the function responsible for inserting a still image in the "modal" when the API does not have an image for a particular  movie.*/
  hasBackDropImage = () => {
    if (this.props.backdrop_path === null || this.props.backdrop_path === "") {
      return (
        <img
          src={
            "https://mhaia.org/wp-content/uploads/2016/06/MHAIA-no-image-available-bg.png"
          }
          alt=""
        />
      );
    } else {
      return (
        <img
          src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${
            this.props.backdrop_path
          }`}
          alt=""
        />
      );
    }
  };





  /*onClickTrailer() {
    this.fetchTrailer(this.state.movieId);
  }*/
  
  changeApproval(){
    this.fetchTrailer()
    this.fetchValidTrailer()
  }

    fetchValidTrailer(){
      if(this.state.trailers.length < 1) {
        this.setState({
          isKeyFetched : false
        })  
        }
      }


    fetchTrailer() {
     const test = `http://api.themoviedb.org/3/movie/${this.props.id}/videos?api_key=${API_KEY}`;
     fetch(test)
      .then(response => response.json())
      .then(trailerData => {
          this.setState({
            trailers: trailerData.results,
            isKeyFetched: true
          });
        })
      }




  
  render() {
    return (
      <div>
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className={this.props.className}>
      <button type="button" class="close" aria-label="Close" style={{margin: '15px'}}><span aria-hidden="true" onClick={this.props.toggle}>×</span></button>
         <ModalHeader>{this.props.title}</ModalHeader>
         <p>Release date: {this.props.release_date}</p>
         <ModalBody>
         {this.hasBackDropImage()}
         <h3>Movie ID:{this.props.id}</h3>
         <div>
         <Button onClick={this.changeApproval}>See Trailer</Button>
         {this.state.isKeyFetched
         ? <ReactPlayer url={`https://www.youtube.com/watch?v=${this.state.trailers[0].key}`} controls playing />
         :  null       
        }
         </div>
         <h3>Overview:</h3>
         <p>{this.props.overview}</p>
         <p>Average score: {this.props.vote_average}</p>
         <p>Votes: {this.props.vote_count}</p>
         </ModalBody>
         <ModalFooter>
           <Button color="primary" onClick={this.props.toggle} >Close</Button>
         </ModalFooter>
       </Modal>
     </div>
    );
  }
}


export default MovieDetail;
