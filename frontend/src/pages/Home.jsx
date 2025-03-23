import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    loadPopularMovies();
  }, []);

  const loadPopularMovies = async (pageNumber = 1) => {
    try {
      setLoading(true);
      const popularMovies = await getPopularMovies(pageNumber);
      setMovies((prevMovies) => [...prevMovies, ...popularMovies]); 
      setHasMore(popularMovies.length > 0);
    } catch (err) {
      console.log(err);
      setError("Falha ao carregar filmes...");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setIsSearching(true);
    setPage(1); 

    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      setError(searchResults.length === 0 ? "Nenhum filme encontrado." : null);
      setHasMore(false); 
    } catch (err) {
      console.log(err);
      setError("Falha ao buscar filmes...");
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (isSearching) return; 
    const nextPage = page + 1;
    setPage(nextPage);
    loadPopularMovies(nextPage);
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Busque por filmes..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            if (e.target.value === "") {
              setIsSearching(false);
              setMovies([]);
              loadPopularMovies(1);
            }
          }}
        />
        <button type="submit" className="search-button">
          Pesquisar
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>

      {!isSearching && hasMore && !loading && (
        <button onClick={handleLoadMore} className="load-more">
          Carregar mais
        </button>
      )}

      {loading && <div className="loading">Carregando...</div>}
    </div>
  );
}

export default Home;
