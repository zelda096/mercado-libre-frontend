import React from "react"
import { useHookstate } from "@hookstate/core"
import { useNavigate } from "react-router-dom"
import '../styles/searchBox.scss'
import mercadolibreLogo from '../icons/mercadolibre-logo.png'
const SearchBox: React.FC = () => {
  const navigate = useNavigate()
  const query = useHookstate("")

  const handleSearch = (): void => {
    if (query) {
      navigate(`/items?search=${query.get()}`)
    }
  }

  return (
    <>
      <form onSubmit={handleSearch}>
        <div className="search-container">
          <div className="search-wrapper">
            <a href="/">
              <img src={mercadolibreLogo} alt="mercadolibre-logo" className="mercadolibre-logo" />
            </a>
            <input
              className="search-input"
              type="text"
              value={query.get()}
              onChange={(e) => query.set(e.target.value)}
              placeholder="Search"
            />
            <button type="submit" className="search-button"><i className="fas fa-search"></i></button>
          </div>
        </div>
      </form>

    </>
  )
}

export default SearchBox