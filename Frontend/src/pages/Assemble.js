import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Assemble = () => {
  const handleAssemble = async (bikeType) => {
    try {
      const response = await fetch("http://localhost:3001/api/bikes/assemble", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ bikeType }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while assembling the bike.");
    }
  };

  return (
    <div className="flex justify-center items-center gap-8 py-8">
      <ToastContainer position="bottom-right" 
        autoClose={2500} 
        hideProgressBar={false} 
        closeOnClick 
        pauseOnHover 
        draggable 
        pauseOnFocusLoss />
      <div className="flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-4">Honda</h2>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Honda_Logo.svg/2552px-Honda_Logo.svg.png"
          alt="Honda"
          className="w-40 h-40 object-contain mb-4"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleAssemble("Honda")}
        >
          Assemble
        </button>
      </div>

      <div className="flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-4">Yamaha</h2>
        <img
          src="https://static.vecteezy.com/system/resources/previews/020/975/588/original/yamaha-logo-yamaha-icon-transparent-free-png.png"
          alt="Yamaha"
          className="w-40 h-40 object-contain mb-4"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleAssemble("Yamaha")}
        >
          Assemble
        </button>
      </div>

      <div className="flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-4">Enfield</h2>
        <img
          src="https://seeklogo.com/images/R/royal-enfield-logo-A0F681DDB8-seeklogo.com.png"
          alt="Enfield"
          className="w-40 h-40 object-contain mb-4"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleAssemble("Enfield")}
        >
          Assemble
        </button>
      </div>
    </div>
  );
};

export default Assemble;
