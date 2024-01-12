import { styles } from "./styles";

export const RejectedByHod = () => {
    return (
      <>
        <div className="w-full py-6">
          <div className="flex">
            <div className="w-1/3">
              <div className="relative mb-2">
                <div className="w-10 h-10 mx-auto bg-indigo-700 rounded-full text-lg text-white flex items-center">
                  <span className="text-center text-white w-full">
                    <svg
                      className="w-full fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 96 960 960"
                      width="24"
                      height="24"
                    >
                      <path d="M114.5 850.522V301.478q0-18.152 15.293-27.848 15.294-9.695 32.446-2.978l650.087 273.522q20.631 8.956 20.631 31.826t-20.631 31.826L162.239 881.109q-17.152 6.956-32.446-2.739-15.293-9.696-15.293-27.848ZM180 800.37 717.304 576 180 348.63v162.74L424.63 576 180 638.63v161.74ZM180 576V348.63v451.74V576Z" />
                    </svg>
                  </span>
                </div>
              </div>
  
              <div className="text-s font-semibold text-center md:text-base">
                Request Sent
              </div>
            </div>
  
            <div className="w-1/3">
              <div className="relative mb-2">
                <div
                  className="absolute flex align-center items-center align-middle content-center"
                  style={styles}
                >
                  <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                    <div className=" bg-indigo-700 py-1 rounded w-full"></div>
                  </div>
                </div>
  
                <div className="w-10 h-10 mx-auto bg-red-600 rounded-full text-lg text-white flex items-center">
                  <span className="text-center text-white w-full">
                    <svg
                      className="w-full fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 96 960 960"
                      width="24"
                    >
                      <path d="M480 623.739 272.87 830.87q-10.196 10.195-23.87 10.195-13.674 0-23.87-10.195-10.195-10.196-10.195-23.87 0-13.674 10.195-23.87L432.261 576 225.13 368.87q-10.195-10.196-10.195-23.87 0-13.674 10.195-23.87 10.196-10.195 23.87-10.195 13.674 0 23.87 10.195L480 528.261 687.13 321.13q10.196-10.195 23.87-10.195 13.674 0 23.87 10.195 10.195 10.196 10.195 23.87 0 13.674-10.195 23.87L527.739 576 734.87 783.13q10.195 10.196 10.195 23.87 0 13.674-10.195 23.87-10.196 10.195-23.87 10.195-13.674 0-23.87-10.195L480 623.739Z" />
                    </svg>
                  </span>
                </div>
              </div>
  
              <div className="text-s font-semibold text-center md:text-base">
                Rejected By HOD
              </div>
            </div>
  
            <div className="w-1/3">
              <div className="relative mb-2">
                <div
                  className="absolute flex align-center items-center align-middle content-center"
                  style={styles}
                >
                  <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                    <div className="w-0 bg-indigo-700 py-1 rounded"></div>
                  </div>
                </div>
  
                <div className="w-10 h-10 mx-auto bg-white border-2 border-gray-200 rounded-full text-lg text-white flex items-center">
                  <span className="text-center text-gray-600 w-full">
                    <svg
                      className="w-full fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path
                        className="heroicon-ui"
                        d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-2.3-8.7l1.3 1.29 3.3-3.3a1 1 0 0 1 1.4 1.42l-4 4a1 1 0 0 1-1.4 0l-2-2a1 1 0 0 1 1.4-1.42z"
                      />
                    </svg>
                  </span>
                </div>
              </div>
              <div className="text-s font-semibold text-center md:text-base">
                Approved By Admin
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };