import { Link } from "react-router-dom";
import {
  MdSportsSoccer,
  MdSportsTennis,
  MdSportsBasketball,
  MdSportsBaseball,
  MdSportsCricket,
  MdSportsRugby,
  MdSportsHockey,
  MdSportsVolleyball,
  MdSportsGolf,
  MdPool,
  MdDirectionsRun,
} from "react-icons/md";

const sports = [
  { id: 1, name: "Football", icon: <MdSportsSoccer size={48} /> },
  { id: 2, name: "Tennis", icon: <MdSportsTennis size={48} /> },
  { id: 3, name: "Basketball", icon: <MdSportsBasketball size={48} /> },
  { id: 4, name: "Baseball", icon: <MdSportsBaseball size={48} /> },
  { id: 5, name: "Cricket", icon: <MdSportsCricket size={48} /> },
  { id: 6, name: "Rugby", icon: <MdSportsRugby size={48} /> },
  { id: 7, name: "Hockey", icon: <MdSportsHockey size={48} /> },
  { id: 8, name: "Volleyball", icon: <MdSportsVolleyball size={48} /> },
  { id: 9, name: "Golf", icon: <MdSportsGolf size={48} /> },
  { id: 10, name: "Swimming", icon: <MdPool size={48} /> },
  { id: 11, name: "Athletics", icon: <MdDirectionsRun size={48} /> },
];

const Sports = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 px-8 bg-[#171717] min-h-screen">
      {sports.map((sport) => (
        <div className="isolate relative rounded-xl shadow-md flex flex-col items-center justify-center text-white text-xl font-semibold aspect-square bg-gradient-to-br from-[#1E1E1E] to-[#2A2A2A] hover:from-[#222222] hover:to-[#333333] transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:ring-4 hover:ring-[#8BC34A] p-8">
          <Link to={`/sports/${sport.id}`} key={sport.id}>
            <span className="absolute inset-0 z-10"></span>
            <div className="flex flex-col items-center justify-center h-full">
              <div className="text-[#8BC34A]">{sport.icon}</div>
              <h2 className="uppercase tracking-wide text-center mt-2">
                {sport.name}
              </h2>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Sports;
