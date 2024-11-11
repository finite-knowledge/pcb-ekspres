import React from "react";
import PCBDesignForm from "./PCBDesignForm";

const HeroSection = () => {
  const [showForm, setShowForm] = React.useState(false);

  return (
    <div className="relative h-[500px] overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source
          src="https://videos.pexels.com/video-files/3866849/3866849-sd_640_360_25fps.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      {/* Content */}
      <div className="relative container mx-auto h-full flex items-center px-4 sm:px-8">
        <div className="text-white max-w-2xl">
          <h1 className="text-5xl font-extrabold mb-4">
            Професионална изработка на PCB
          </h1>
          <p className="text-xl font-bold mb-10">
            Брз прототајпинг на печатени електронски плочки со достава до вашиот
            дом или канцеларија
          </p>
          <p className="text-xl font-bold mb-10">
            Пристап до секакви компоненти под вашата тастатура
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-100 transition duration-300"
          >
            Прикачи Дизајн
          </button>
        </div>
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 z-10"
            >
              ✕
            </button>
            <PCBDesignForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSection;
