import { useNavigate } from "react-router-dom";
import { Container } from "../components";
import moment from "moment";
import useUserProfile from "../hooks/useUserProfile";
import { Reservation } from "../utils/types";


const Reservation = () => {
  const navigate = useNavigate();
  const { data: user } = useUserProfile();


  return (
    <Container>
      <h1 className="mt-12 sm:text-3xl text-2xl font-semibold">
        Your Reservations
      </h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4 mb-16">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 border rounded-lg">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 h-14 border-b">
            <tr>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Transaction ID
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Booking Name
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Adventure
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Person(s)
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Date
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Price
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Booking Time
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {user?.reservations?.map((reservation: Reservation) => {
              return (
                <tr
                  key={reservation?._id}
                  className=" odd:bg-white even:bg-slate-200 border-b"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {reservation?._id}
                  </th>
                  <td className="px-6 py-4">{reservation?.name}</td>
                  <td className="px-6 py-4">{reservation?.adventureName}</td>
                  <td className="px-6 py-4">{reservation?.person}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {moment(reservation?.date).format("DD MMM, YYYY")}
                  </td>
                  <td className="px-6 py-4">${reservation?.price}</td>
                  <td className="px-6 py-4">
                    {moment(reservation?.createdAt).format(
                      "ddd MMM DD YYYY HH:mm:ss"
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() =>
                        navigate(`/adventure/detail/${reservation?.adventureId}`)
                      }
                      className="bg-yellow-600 text-white whitespace-nowrap h-10 px-4 rounded-lg cursor-pointer hover:bg-yellow-700 transition duration-300 outline-0 bottom-0"
                    >
                      Visit Adventure
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default Reservation;
