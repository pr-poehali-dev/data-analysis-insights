import { useState, useRef, useEffect } from "react";
import { Music2, Mic2, Headphones, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface GenreCard {
  name: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
  mood: string;
  featured?: boolean;
}

const genres: GenreCard[] = [
  {
    name: "Rap",
    description:
      "Острые тексты, сильный флоу и честность — это основа. Каждый трек — это послание, рассказ из реальной жизни.",
    icon: <Mic2 className="w-6 h-6" />,
    tags: ["Freestyle", "Storytelling", "Bars"],
    mood: "Уличная энергия",
  },
  {
    name: "Hip-Hop",
    description:
      "Тяжёлые биты, атмосферные сэмплы и культурный контекст. Музыка, которая двигает и вдохновляет.",
    icon: <Music2 className="w-6 h-6" />,
    tags: ["Beats", "Culture", "Vibe"],
    mood: "Глубокий грув",
    featured: true,
  },
  {
    name: "J-Pop",
    description:
      "Яркие мелодии, эмоциональные крючки и японская эстетика. Красота в каждой ноте.",
    icon: <Headphones className="w-6 h-6" />,
    tags: ["Melody", "Aesthetic", "Pop"],
    mood: "Лёгкость и эмоции",
  },
  {
    name: "Other",
    description:
      "Не ограничиваю себя рамками. Экспериментирую с жанрами, ищу новые звуки и создаю уникальное звучание.",
    icon: <Radio className="w-6 h-6" />,
    tags: ["Fusion", "Experiment", "Unique"],
    mood: "Без границ",
  },
];

const LicenseSection = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="tracks" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900/20 to-black"></div>

      <div className="container mx-auto px-4 relative">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">Моя музыка</h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Создаю треки на стыке жанров — от уличного рэпа до японской поп-культуры
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {genres.map((genre, index) => (
            <div
              key={genre.name}
              className={`transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Card
                className={`relative h-full bg-black border-white/10 ${
                  hoveredCard === index ? "scale-105" : "scale-100"
                } transition-all duration-300`}
              >
                <div className="absolute inset-0 rounded-lg p-[1px] bg-gradient-to-br from-white/20 to-white/0">
                  <div className="absolute inset-0 rounded-lg bg-black"></div>
                </div>

                {genre.featured && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-white text-black px-4 py-1 rounded-full text-sm font-semibold animate-pulse">
                      Главный жанр
                    </span>
                  </div>
                )}

                <CardContent className="relative p-6 rounded-lg h-full flex flex-col">
                  <div className="text-center mb-6">
                    <div className="inline-flex p-3 rounded-full bg-zinc-900 border border-white/10 mb-4">
                      {genre.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-white">{genre.name}</h3>
                    <p className="text-sm text-zinc-500 italic">{genre.mood}</p>
                  </div>

                  <div className="flex-grow">
                    <p className="text-sm text-zinc-300 mb-4 leading-relaxed">{genre.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {genre.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-400"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Button
                    className="w-full mt-6 bg-white text-black hover:bg-zinc-200 transition-colors"
                    asChild
                  >
                    <a href="#contact">Связаться</a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LicenseSection;
