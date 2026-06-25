import "./FestivalLanding.css";
import hero from "./hero-image.png";

function FestivalLanding() {
  return (
    <div>

      <header className="navbar">

        <h2>NightFest</h2>

        <nav>

          <a href="#">Home</a>
          <a href="#">Artists</a>
          <a href="#">Tickets</a>
          <a href="#">Gallery</a>
          <a href="#">Contact</a>

        </nav>

      </header>

      <section className="hero">

        <div className="hero-text">

          <h1>
            Experience the Biggest Nightlife Music Festival of the Year
          </h1>

          <p>
            Book tickets for unforgettable live performances, amazing artists,
            dazzling lights, and an electrifying atmosphere.
          </p>

          <button>Book Tickets</button>

        </div>

        <img src={hero} alt="Music Festival" />

      </section>

      <section className="lineup">

        <h2>Featured Artists</h2>

        <div className="cards">

          <div className="card">
            <h3>DJ Nova</h3>
            <p>EDM</p>
          </div>

          <div className="card">
            <h3>RockStorm</h3>
            <p>Rock Band</p>
          </div>

          <div className="card">
            <h3>Aria</h3>
            <p>Pop Artist</p>
          </div>

        </div>

      </section>

      <section className="tickets">

        <h2>Ticket Pricing</h2>

        <div className="cards">

          <div className="card">

            <h3>General</h3>

            <h1>₹999</h1>

            <button>Buy</button>

          </div>

          <div className="card">

            <h3>VIP</h3>

            <h1>₹2499</h1>

            <button>Buy</button>

          </div>

        </div>

      </section>

      <footer>

        ©2026 NightFest

      </footer>

    </div>
  );
}

export default FestivalLanding;