"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { useGSAP } from "@gsap/react";
import { tedxsjecAssetsPrefix } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
gsap.registerPlugin(ScrollTrigger);

interface PerformerSection {
  images: string[];
  name: string;
  profession: string;
  description: string;
}

const performerSections: PerformerSection[] = [
  {
    name: "Yukthi Udupa",
    profession: "Bharatanatyam artist",
    description:
      "Yukthi Udupa, a passionate Bharatanatyam artist, began her journey at 12 under Guru Vid Smt. Pravitha Ashok at Nritya Vasantha Natyalaya® Kundapura. She completed her exams with distinction and earned the Karnataka State Music and Dance Scholarship. Yukthi has won numerous awards, including  and the excelling in international, national, and state-level competitions. Her Bharatanatyam Arangetram was a celebrated display of her technical skill and expressive artistry. Yukthi is also a 'B' grade Doordarshan artist, inspiring young dancers and honoring Bharatanatyam's legacy.",
    images: [
      `${tedxsjecAssetsPrefix}/performers/Yukthi1.avif`,
      `${tedxsjecAssetsPrefix}/performers/Yukthi 3.avif`,
    ],
  },
  {
    name: "Agasthyam Kalaripayattu",
    profession: "Martial Arts Institution",
    description:
      'Agasthyam Kalaripayattu, a premier martial arts institution, preserves and teaches the ancient art of Kalaripayattu from Kerala, India. Founded and led by Gurukkal S Mahesh, Agasthyam carries forward a legacy over 129 years old, deeply rooted in traditional combat techniques, self-defense, weaponry, and spiritual growth. The renowned school offers rigorous training that builds agility, strength, and resilience, blending physical discipline with profound cultural heritage. Among its notable achievements is the "Shakthi" program, which has empowered nearly 12,000 women and continues to inspire and nurture many more.',
    images: [
      `${tedxsjecAssetsPrefix}/performers/Agasthyam1.avif`,
      `${tedxsjecAssetsPrefix}/performers/Agasthyam2.avif`,
      `${tedxsjecAssetsPrefix}/performers/Agasthyam3.avif`,
    ],
  },
  //   ,
  //   {
  //     name: "Munita Veigas Rao",
  //     profession: "Singer | Songwriter | Performer | Vocal Trainer",
  //     description:
  //       'Munita Veigas Rao, fondly known as the "Nightingale of Mangalore," is an award-winning singer, songwriter, and vocal trainer celebrated for her dynamic performances across Konkani, regional, and Western music. Having been recently awarded the Dakshina Kannada District Rajyotsava Award in November 2024, Munita has a career spanning over two decades with more than 500 stage performances worldwide. As the founder of her music school, "Musically by Munita," she dedicates her time to nurturing new talent. Her exceptional vocal skills and commitment to music have made her a cherished figure in the community.',
  //     images: [
  //       `${tedxsjecAssetsPrefix}/performers/Munita1.avif`,
  //       `${tedxsjecAssetsPrefix}/performers/Munita2.avif`,
  //     ],
  //   },
];

export default function Component() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentImageIndices, setCurrentImageIndices] = useState<number[]>(
    performerSections.map(() => 0)
  );
  const intervalRefs = useRef<(NodeJS.Timeout | null)[]>([]);
  const [selectedSection, setSelectedSection] =
    useState<PerformerSection | null>(null);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useGSAP(() => {
    const lenis = new Lenis({ lerp: 0.07 });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.utils
      .toArray<HTMLDivElement>(".img-container")
      .forEach((container) => {
        const images = container.querySelectorAll("img");

        if (images.length) {
          images.forEach((img) => {
            gsap.fromTo(
              img,
              { yPercent: -10 },
              {
                yPercent: 10,
                ease: "none",
                scrollTrigger: {
                  trigger: container,
                  scrub: true,
                  start: "top bottom",
                  end: "bottom top",
                  onUpdate: (self) => {
                    images.forEach((image) => {
                      const isVisible = image.classList.contains("opacity-100");
                      if (isVisible) {
                        gsap.set(image, { yPercent: self.progress * 20 - 10 });
                      }
                    });
                  },
                },
              }
            );
          });
        }
      });

    // Set up hover animations for description on desktop
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1200px)", () => {
      setIsLargeScreen(true);
      gsap.utils
        .toArray<HTMLDivElement>(".performer-section")
        .forEach((section) => {
          const description = section.querySelector(".description");
          const tl = gsap.timeline({ paused: true });
          mm.add("(min-width: 1200px)", () => {
            setIsLargeScreen(true);
            gsap.utils
              .toArray<HTMLDivElement>(".performer-section")
              .forEach((section) => {
                const description = section.querySelector(".description");
                const tl = gsap.timeline({ paused: true });

                tl.fromTo(
                  description,
                  { yPercent: 100, opacity: 0 },
                  { yPercent: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
                );

                section.addEventListener("mouseenter", () => tl.play());
                section.addEventListener("mouseleave", () => tl.reverse());
              });
          });
          section.addEventListener("mouseenter", () => tl.play());
          section.addEventListener("mouseleave", () => tl.reverse());
        });
    });

    mm.add("(max-width: 1200px)", () => {
      setIsLargeScreen(false);
    });
    mm.add("(max-width: 1200px)", () => {
      setIsLargeScreen(false);
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      mm.revert();
    };
  }, []);

  useEffect(() => {
    performerSections.forEach((_, index) => {
      intervalRefs.current[index] = setInterval(() => {
        setCurrentImageIndices((prevIndices) => {
          const newIndices = [...prevIndices];
          newIndices[index] =
            (newIndices[index] + 1) % performerSections[index].images.length;
          return newIndices;
        });
      }, 2500 + index * 1000);
    });

    return () => {
      intervalRefs.current.forEach((interval) => {
        if (interval) clearInterval(interval);
      });
    };
  }, []);

  const handleSectionClick = (section: PerformerSection) => {
    if (!isLargeScreen) {
      setSelectedSection(section);
    }
  };

  // Effect to disable body scroll when dialog is open
  useEffect(() => {
    if (selectedSection) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => document.body.classList.remove("no-scroll");
  }, [selectedSection]);

  return (
    <Dialog
      open={!!selectedSection}
      onOpenChange={(open) => !open && setSelectedSection(null)}
    >
      <div ref={containerRef} className="overflow-hidden ">
        {performerSections.map((section, sectionIndex) => (
          <section
            key={sectionIndex}
            className="flex md:max-w-[1200px] items-center justify-center relative mx-auto px-4 my-12 first:mt-0 last:mb-0"
            aria-labelledby={`section-title-${sectionIndex}`}
          >
            <div
              className={`relative w-full aspect-[16/9] overflow-hidden img-container performer-section ${
                !isLargeScreen ? "cursor-pointer" : ""
              }`}
              onClick={() => handleSectionClick(section)}
            >
              {section.images.map((image, imageIndex) => (
                <Image
                  key={imageIndex}
                  src={image}
                  width={1200}
                  height={675}
                  alt={`Performer section ${sectionIndex + 1}, slide ${
                    imageIndex + 1
                  } of ${section.images.length}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-8000 ${
                    imageIndex === currentImageIndices[sectionIndex]
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                  aria-hidden={imageIndex !== currentImageIndices[sectionIndex]}
                />
              ))}
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-4 lg:p-8">
                <h2
                  id={`section-title-${sectionIndex}`}
                  className="text-xl md:text-5xl lg:text-6xl font-bold text-white "
                >
                  {section.name}
                </h2>
                <p className="text-md md:text-3xl text-white italic">
                  {section.profession}
                </p>
              </div>
              <div className="description absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center p-8 opacity-0 pointer-events-none lg:pointer-events-auto">
                <p className="text-white text-lg md:text-xl lg:text-2xl text-center">
                  {section.description}
                </p>
              </div>
            </div>
          </section>
        ))}
      </div>
      {!isLargeScreen && selectedSection && (
        <DialogContent className="rounded-md  sm:max-w-[calc(95vw-15px)] max-w-[calc(100vw-15px)] max-h-[calc(100vh-15px)] overflow-hidden flex z-[999] items-center justify-center p-2">
          <div className="flex flex-col md:flex-col gap-6 max-h-full overflow-y-auto p-2">
            <div className="">
              <Image
                width={600}
                height={600}
                src={selectedSection.images[0]}
                alt={`${selectedSection.name} - ${selectedSection.profession}`}
                className="w-full h-auto object-cover rounded-lg"
                priority={true}
                loading="eager"
              />
            </div>
            <div className="">
              <h2 className="text-2xl font-bold mb-2">
                {selectedSection.name}
              </h2>
              <p className="text-xl italic mb-4">
                {selectedSection.profession}
              </p>
              <p className=" text-sm">{selectedSection.description}</p>
            </div>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
