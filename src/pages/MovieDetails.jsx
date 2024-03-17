import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { get } from "../data/httpClient"; //Para enlazar a nuestra API
import { getMovieImg } from "../utils/getMovieImg";  
import "../pages/MovieDetails.css";


export function MovieDetails() {
  const { movieId } = useParams();
  const [ movie, setMovie] = useState([]);
  const [ generos, setGeneros] = useState([]); 

  useEffect(() => {
    get("/movie/" + movieId).then((data) => {
      setMovie(data);
      console.log(data)
      setGeneros(data.genres[0]);
      
    });
  },[movieId]);
  
  const imageUrl = getMovieImg(movie.poster_path, 500);

  return (
    <div className="detailsContainer">
        <img src={imageUrl} alt={movie.title} className="col movieImage"/>
        <div className="col movieDetails">
            <p className="title">
                <strong>Title: </strong>
                {movie.title}
            </p>
            <p>
                <strong>Genero: </strong>
                {generos.name}  
            </p>
            <p className="description">
                <strong>Descripcion: </strong>
                {movie.overview}
            </p>
            <p>
                <strong>Disponible: </strong>
                <a href={movie.homepage} className="link"> Ver Ahora </a>
            </p>
        </div>
    </div>
  )
}
