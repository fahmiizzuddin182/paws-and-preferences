import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, useRef } from "react";
import { XMarkIcon, HeartIcon } from "@heroicons/react/24/solid";
import "./App.css";
import CardStack from "./components/CardStack";
import Summary from "./components/Summary";
import Navbar from "./components/NavBar";
import LoadingScreen from "./components/LoadingScreen";
import Footer from "./components/Footer";

function App() {
  const [cats, setCats] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedCats, setLikedCats] = useState([]);
  const fetchedRef = useRef(false);

  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // Scroll to top whenever this component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    // Fetch 10 cat images with metadata from cataas.com
    const fetchCats = async () => {
      const catsData = [];

      for (let i = 0; i < 10; i++) {
        const metaRes = await fetch(
          "https://cataas.com/cat?width=400&height=600&json=true",
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        const meta = await metaRes.json();

        const imageRes = await fetch(meta.url);
        const blob = await imageRes.blob();

        const objectUrl = URL.createObjectURL(blob);

        catsData.push({
          id: meta.id,
          tags: meta.tags || [],
          url: objectUrl,
          originalUrl: meta.url,
          createdAt: meta.created_at,
          mimeType: meta.mimetype,
        });

        // For every cat fetched, increase the loading bar percentage
        setProgress((prev) => prev + 1);
      }

      setCats(catsData);
      setIsLoading(false);
    };

    fetchCats();
  }, []);

  console.log(cats);

  const handleSwipe = (direction) => {
    if (direction === "right") {
      setLikedCats((prev) => [...prev, cats[currentIndex]]);
    }

    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <main className="flex flex-col overflow-x-hidden items-center min-w-screen">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" progress={progress} />
        ) : currentIndex >= cats.length ? (
          <>
            <Navbar />
            <Summary likedCats={likedCats} />
          </>
        ) : (
          <>
            <Navbar />
            <motion.div
              key="cards"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{
                opacity: 0,
                y: 40,
                transition: { duration: 0.3 },
              }}
              className="flex flex-col items-center gap-2 pt-2 pb-8"
            >
              <CardStack
                cats={cats}
                currentIndex={currentIndex}
                onSwipe={handleSwipe}
              />
              {/* Buttons */}
              <div className="flex justify-center gap-2 w-full">
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  className="p-2 rounded-full shadow-xl"
                  onClick={() => handleSwipe("left")}
                >
                  <XMarkIcon className="h-14 w-14" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  className="p-2 rounded-full shadow-xl"
                  onClick={() => handleSwipe("right")}
                >
                  <HeartIcon className="h-14 w-14" />
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <Footer />
    </main>
  );
}

export default App;
