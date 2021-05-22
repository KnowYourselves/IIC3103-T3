const Flights = ({ flights }) => (
  <div className="flex flex-col p-2 mb-4 border shadow round">
    <div className="mx-auto mb-2 text-2xl font-bold">
      <p>Flights Information</p>
    </div>
    <div
      className="flex flex-row space-x-5 overflow-x scrollbar-thin scrollbar-track-gray-700 "
      style={{ width: 750 }}
    >
      {
      flights.map((flight) => (
        <div
          key={flight.code}
          className="flex flex-col items-center p-5 space-y-2 border rounded shadow-sm round"
          style={{ minWidth: 300 }}
        >
          <div>
            <h2 className="mx-auto text-xl">General Info</h2>
          </div>
          <div className="grid grid-cols-4 text-center">
            <p className="font-bold">Code</p>
            <p className="font-bold">Airline</p>
            <p className="font-bold">Plane</p>
            <p className="font-bold">Seats</p>
            <p>{flight.code}</p>
            <p>{flight.airline}</p>
            <p>{flight.plane}</p>
            <p>{flight.seats}</p>
          </div>
          <div>
            <h2 className="text-xl">Passengers</h2>
          </div>
          <div className="grid grid-cols-2">
            <p className="font-bold text-center">Name</p>
            <p className="font-bold text-center">Age</p>
            {
              flight.passengers.map((passenger) => (
                <>
                  <p>{passenger.name}</p>
                  <p className="text-center">{passenger.age}</p>
                </>
              ))
            }

          </div>
        </div>
      ))
    }
    </div>
  </div>
);

export default Flights;
