interface GameBannerProps {
  bannerUrl: string;
  title: string;
  adsCount: number;
}

const GameBanner = ({ bannerUrl, title, adsCount }: GameBannerProps) => {
  return (
    <a
      href=""
      className="relative rounded-lg overflow-hidden"
      onClick={(e) => e.preventDefault()}
    >
      <img src={bannerUrl} />

      <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0">
        <strong className="font-bold text-white block">{title}</strong>
        <span className="text-zinc-300 text-sm block">{adsCount} anúncios</span>
      </div>
    </a>
  );
};

export default GameBanner;
