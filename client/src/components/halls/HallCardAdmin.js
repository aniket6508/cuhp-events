import React from 'react'

const HallCardAdmin = ({hall,handleBookingClick,userData,handleEditClick,handleDeleteModal}) => {
  return (
    <div key={hall._id} className="my-2 ">
      <div className="flex w-full items-center justify-center">
        <div className="w-full rounded-xl p-12 shadow-2xl shadow-blue-200 md:w-8/12 lg:w-8/12 bg-white">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="col-span-1 lg:col-span-9">
              <div className="text-center lg:text-left">
                <h2 className="text-2xl font-bold text-zinc-700">
                  {hall.name}
                </h2>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                <div>
                  <p className="font-bold text-zinc-700">Location</p>
                </div>

                <div>
                  <p className="text-m font-semibold text-zinc-700">
                    {hall.location}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                <div>
                  <p className="font-bold text-zinc-700">Capacity</p>
                </div>

                <div>
                  <p className="text-m font-semibold text-zinc-700">
                    {hall.capacity}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                <div>
                  <p className="font-bold text-zinc-700">Amenities</p>
                </div>

                <div>
                  <p className="text-m font-semibold text-zinc-700">
                    {hall.amenities}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-6 text-center lg:text-left">
                <div>
                  <p className="font-bold text-zinc-700">Description</p>
                </div>

                <div>
                  <p className="text-m font-semibold text-zinc-700">
                    {hall.description}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-4">
                <button
                  className="w-full rounded-xl border-2 border-blue-500 bg-white px-3 py-2 font-semibold text-blue-500 hover:bg-blue-500 hover:text-white"
                  onClick={() => handleBookingClick(hall._id, hall.name)}
                >
                  Book Now
                </button>
                {userData.email === process.env.REACT_APP_MASTER_ADMIN_EMAIL ||
                userData.email === hall.hallCreater ? (
                  <>
                    <button
                      className="w-full rounded-xl border-2 border-blue-500 bg-white px-3 py-2 font-semibold text-blue-500 hover:bg-blue-500 hover:text-white"
                      onClick={() => handleEditClick(hall._id, hall.name)}
                    >
                      Edit Hall
                    </button>

                    <button
                      className="w-full rounded-xl border-2 border-red-500 bg-white px-3 py-2 font-semibold text-red-500 hover:bg-red-500 hover:text-white"
                      onClick={() => handleDeleteModal(hall._id, hall.name)}
                    >
                      Delete Hall
                    </button>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HallCardAdmin