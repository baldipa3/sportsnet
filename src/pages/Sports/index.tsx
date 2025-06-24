import { Link } from "react-router-dom";
import SportsNavbar from "../../components/SportsNavbar";
import { type SportsListQuery } from "./__generated__/SportsListQuery.graphql";
import { graphql, useLazyLoadQuery } from "react-relay";
import { getSportIcon } from "../../utils/sportIcons";
const Sports = () => {
  const data = useLazyLoadQuery<SportsListQuery>(
    graphql`
      query SportsListQuery {
        allSports {
          id
          name
          code
        }
      }
    `,
    {}
  );

  const sports = data?.allSports;

  return (
    <>
      <SportsNavbar />
      <div className="bg-[#171717] min-h-screen pt-8">
        <div className="text-center px-8 mb-6">
          <h1 className="text-3xl font-bold text-white mb-3">
            Choose Your Sport
          </h1>
          <p className="text-gray-400 text-base max-w-md mx-auto">
            Select your favorite sport to get personalized content
          </p>
        </div>

        {/* Sports Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-12 px-8">
          {/* Fix type */}
          {sports.map((sport) => {
            const IconComponent = getSportIcon(sport?.code);

            return (
              <div
                key={sport.id}
                className="isolate relative rounded-xl shadow-md flex flex-col items-center justify-center text-white text-xl font-semibold aspect-square bg-gradient-to-br from-[#1E1E1E] to-[#2A2A2A] hover:from-[#222222] hover:to-[#333333] transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:ring-4 hover:ring-[#8BC34A] p-8"
              >
                <Link to={`/sports/${sport.code}`}>
                  <span className="absolute inset-0 z-10"></span>
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="text-[#8BC34A]">
                      <IconComponent size={48} />
                    </div>
                    <h2 className="uppercase tracking-wide text-center mt-2">
                      {sport.name}
                    </h2>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Sports;
