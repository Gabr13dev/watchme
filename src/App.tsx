import React, { useEffect, useState } from "react";

import { Button } from "./components/Button";
import { MovieCard } from "./components/MovieCard";
import { ActorLink } from "./components/ActorLink";

import { SkipBack } from "react-feather";

// import { SideBar } from './components/SideBar';
// import { Content } from './components/Content';

import { api } from "./services/api";

import "./styles/global.scss";

import "./styles/sidebar.scss";
import "./styles/content.scss";

import "./styles/detailMovie.scss";

interface GenreResponseProps {
  id: number;
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  title: string;
}

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
  Director: string;
  Plot: string;
  Actors: string;
}

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps
  );

  const [isDetail, setIsDetail] = useState(false);
  const [currentMovie, setCurrentMovie] = useState<MovieProps>();

  useEffect(() => {
    api.get<GenreResponseProps[]>("genres").then((response) => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api
      .get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`)
      .then((response) => {
        setMovies(response.data);
      });

    api
      .get<GenreResponseProps>(`genres/${selectedGenreId}`)
      .then((response) => {
        setSelectedGenre(response.data);
      });
  }, [selectedGenreId]);

  function moreDetails(id: string) {
    setIsDetail(true);
    const currentMovie = movies.find((movie) => movie.imdbID == id);
    setCurrentMovie(currentMovie);
  }

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
    backList();
  }

  function backList() {
    setIsDetail(false);
  }

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <nav className="sidebar">
        <span>
          Watch<p>Me</p>
        </span>

        <div className="buttons-container">
          {genres.map((genre) => (
            <Button
              key={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => handleClickButton(genre.id)}
              selected={selectedGenreId === genre.id}
            />
          ))}
        </div>
      </nav>
      {isDetail ? (
        <div className="detail-movie">
          <nav>
            <div>{currentMovie?.Title}</div>
            <div className="controller">
              <SkipBack onClick={backList} /> Voltar
            </div>
          </nav>
          <div className="content-detail">
          <div>
            <img src={currentMovie?.Poster} />
          </div>
          <div>
            <p>Diretor: {currentMovie?.Director}</p>
            <p>Atores: {(currentMovie?.Actors)?.split(",").map((actor) => (
              <ActorLink name={actor} />
            ))}</p>
          </div>
          </div>
        </div>
      ) : (
        <div className="container">
          <header>
            <span className="category">
              Categoria:<span> {selectedGenre.title}</span>
            </span>
          </header>

          <main>
            <div className="movies-list">
              {movies.map((movie) => (
                <span onClick={() => moreDetails(movie.imdbID)}>
                  <MovieCard
                    key={movie.imdbID}
                    title={movie.Title}
                    poster={movie.Poster}
                    runtime={movie.Runtime}
                    rating={movie.Ratings[0].Value}
                  />
                </span>
              ))}
            </div>
          </main>
        </div>
      )}
      <a className="bt-whatsapp-site w-inline-block">
        <div className="icone-whatsapp-rodape fa"> + </div>
        <div className="tx-whats"> Adicionar</div>
      </a>
    </div>
  );
}
