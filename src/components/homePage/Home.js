import Map from '../Map/Map';
import "./Home.css";

function Home() {
  return (
    <div className="Home">
      <i class="fa-solid fa-heart"></i>
      <div className="map">
        <Map />
      </div>
    </div>
  );
  
}

export default Home;