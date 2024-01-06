import Starfield from './StartField';

function Starfeild() {
  return (
    <>
      <Starfield
        starCount={10000}
        starColor={[255, 255, 255]}
        speedFactor={0.05}
        backgroundColor="black"
      />
      {/* Other components */}
    </>
  );
}

const StartFieldBg = ({ children }) => {
    return (
     <>
        < Starfield/>
        {children}
      </>
    );
  };

  export default StartFieldBg