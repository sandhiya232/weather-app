import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  // Background image URL (you can replace with any Unsplash image)
  const backgroundImageUrl =
    'https://v.w-x.co/1669634933664_112822_NATIONAL.jpg';

  return (
    <div
      className="flex items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <button
        onClick={() => navigate('/weather')}
        className="bg-white bg-opacity-80 text-blue-700 px-8 py-4 rounded-xl text-2xl font-semibold shadow-lg hover:bg-opacity-100 transition"
      >
        Get Weather
      </button>
    </div>
  );
}
