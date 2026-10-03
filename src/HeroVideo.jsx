import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "@phosphor-icons/react";
import { Picture, useText } from "./components";

export default function HeroVideo() {
  const { t } = useText();
  const videoRef = useRef(null);
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [userPaused, setUserPaused] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(preference.matches);
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion || failed) return;
    let inView = true;
    const syncPlayback = () => {
      if (userPaused || !inView || document.hidden) {
        video.pause();
      } else {
        // Autoplay may be blocked by the browser; the play button remains available.
        video.play().catch(() => {});
      }
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        syncPlayback();
      },
      { threshold: 0.05 },
    );
    observer.observe(video);
    document.addEventListener("visibilitychange", syncPlayback);
    syncPlayback();
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
      video.pause();
    };
  }, [reducedMotion, userPaused, failed]);

  function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;
    if (!video.paused) {
      setUserPaused(true);
      video.pause();
    } else {
      setUserPaused(false);
      video.play().catch(() => {});
    }
  }

  return (
    <>
      <Picture
        name="swiftlet-hero-poster.webp"
        alt={t(
          "Illustration of a swiftlet resting in its nest",
          "Ilustrasi burung walet di sarangnya",
        )}
        className="hero-photo"
        eager
      />
      {!reducedMotion && !failed && (
        <>
          <video
            ref={videoRef}
            className="hero-photo hero-video"
            src="/assets/swiftlet-hero.mp4"
            poster="/assets/swiftlet-hero-poster.webp"
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            onPlaying={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onError={() => setFailed(true)}
          />
          <button
            className="hero-video-toggle"
            type="button"
            onClick={togglePlayback}
            aria-label={t(
              playing ? "Pause animation" : "Play animation",
              playing ? "Jeda animasi" : "Putar animasi",
            )}
          >
            {playing ? <Pause size={17} /> : <Play size={17} />}
            {t(
              playing ? "Pause animation" : "Play animation",
              playing ? "Jeda animasi" : "Putar animasi",
            )}
          </button>
        </>
      )}
    </>
  );
}
